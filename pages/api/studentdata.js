const GOOGLE_APPS_SCRIPT_URL_PATTERN = /^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec\/?(?:\?.*)?$/;
const REQUEST_TIMEOUT_MS = 15000;

const readGoogleSheetsResponse = async (response) => {
  const responseText = await response.text();

  try {
    return {
      data: responseText ? JSON.parse(responseText) : null,
      text: responseText,
    };
  } catch {
    return {
      data: null,
      text: responseText,
    };
  }
};

const getGoogleSheetsErrorMessage = (response, responseData, responseText) => {
  if (responseData?.error) {
    return responseData.error;
  }

  if (response.status === 401 || response.status === 403) {
    return 'Google Apps Script denied the request. Redeploy it as a Web App with access set to Anyone.';
  }

  if (response.status === 404) {
    return 'Google Apps Script endpoint was not found. Check that GOOGLE_SHEETS_STUDENTDATA_URL is the Web App URL ending in /exec.';
  }

  if (response.status === 405) {
    return 'Google Apps Script did not accept POST requests. Confirm your script has a doPost(e) function and redeploy the Web App.';
  }

  if (responseText?.includes('Authorization is required') || responseText?.includes('Sign in')) {
    return 'Google Apps Script requires authorization. Redeploy the Web App with access set to Anyone and authorize the script.';
  }

  return 'Google Sheets rejected the submission.';
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const googleSheetsUrl = process.env.GOOGLE_SHEETS_STUDENTDATA_URL?.trim();

  if (!googleSheetsUrl) {
    return res.status(500).json({
      success: false,
      error: 'Google Sheets endpoint is not configured.'
    });
  }

  if (!GOOGLE_APPS_SCRIPT_URL_PATTERN.test(googleSheetsUrl)) {
    return res.status(500).json({
      success: false,
      error: 'GOOGLE_SHEETS_STUDENTDATA_URL must be the Google Apps Script Web App URL ending in /exec.'
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const sheetsResponse = await fetch(googleSheetsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(req.body || {}),
      redirect: 'follow',
      signal: controller.signal,
    });

    const { data: sheetsResult, text: responseText } = await readGoogleSheetsResponse(sheetsResponse);
    const googleErrorMessage = getGoogleSheetsErrorMessage(sheetsResponse, sheetsResult, responseText);

    if (!sheetsResponse.ok || sheetsResult?.ok === false) {
      return res.status(502).json({
        success: false,
        error: googleErrorMessage,
        googleStatus: sheetsResponse.status,
        googleStatusText: sheetsResponse.statusText,
        sheets: sheetsResult,
      });
    }

    if (!sheetsResult) {
      return res.status(502).json({
        success: false,
        error: 'Google Apps Script did not return JSON. Confirm the script returns ContentService JSON from doPost(e), then redeploy it.',
        googleStatus: sheetsResponse.status,
      });
    }

    return res.status(200).json({
      success: true,
      sheets: sheetsResult
    });
  } catch (error) {
    console.error('Student data Google Sheets submission failed:', error);

    const isTimeout = error.name === 'AbortError';

    return res.status(500).json({
      success: false,
      error: isTimeout
        ? 'Google Apps Script took too long to respond. Please try again.'
        : 'Unable to submit student data right now.'
    });
  } finally {
    clearTimeout(timeout);
  }
}
