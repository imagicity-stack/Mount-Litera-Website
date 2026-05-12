export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const googleSheetsUrl = process.env.GOOGLE_SHEETS_STUDENTDATA_URL;

  if (!googleSheetsUrl) {
    return res.status(500).json({
      success: false,
      error: 'Google Sheets endpoint is not configured.'
    });
  }

  try {
    const sheetsResponse = await fetch(googleSheetsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body || {})
    });

    const responseText = await sheetsResponse.text();
    let sheetsResult = null;

    try {
      sheetsResult = responseText ? JSON.parse(responseText) : null;
    } catch (error) {
      sheetsResult = { raw: responseText };
    }

    if (!sheetsResponse.ok || sheetsResult?.ok === false) {
      return res.status(502).json({
        success: false,
        error: sheetsResult?.error || 'Google Sheets rejected the submission.',
        sheets: sheetsResult
      });
    }

    return res.status(200).json({
      success: true,
      sheets: sheetsResult
    });
  } catch (error) {
    console.error('Student data Google Sheets submission failed:', error);
    return res.status(500).json({
      success: false,
      error: 'Unable to submit student data right now.'
    });
  }
}
