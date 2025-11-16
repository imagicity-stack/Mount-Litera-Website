export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const {
    studentName,
    classApplyingFor,
    parentName,
    phoneNumber,
    city,
    email,
    address,
    previousSchool,
    reasonForAdmission
  } = req.body || {};

  console.log('New admissions interest received:', {
    studentName,
    classApplyingFor,
    parentName,
    phoneNumber,
    city,
    email,
    address,
    previousSchool,
    reasonForAdmission
  });

  return res.status(200).json({ success: true });
}
