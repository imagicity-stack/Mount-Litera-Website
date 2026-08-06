import { useMemo, useState } from 'react';
import Head from 'next/head';

const MONTH_OPTIONS = [
  { value: '', label: 'All months' },
  { value: '0', label: 'January' },
  { value: '1', label: 'February' },
  { value: '2', label: 'March' },
  { value: '3', label: 'April' },
  { value: '4', label: 'May' },
  { value: '5', label: 'June' },
  { value: '6', label: 'July' },
  { value: '7', label: 'August' },
  { value: '8', label: 'September' },
  { value: '9', label: 'October' },
  { value: '10', label: 'November' },
  { value: '11', label: 'December' },
];

const PAYMENT_HISTORY_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />

  <style>
    @page {
      size: A4;
      margin: 0;
    }

    body {
      margin: 0;
      font-family: "Inter", Arial, sans-serif;
      color: #222;
      font-size: 12px;
      background: #f7f7f7;
    }

    .page-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 2in;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #ddd;
    }

    .page-header h1 {
      margin: 0;
      font-family: "Georgia", serif;
      font-size: 30px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .page-footer {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1in;
      background: #8c191b;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 0.4in;
      text-align: center;
    }

    .page-footer p {
      margin: 0;
      font-size: 10px;
      line-height: 1.4;
      white-space: pre-line;
    }

    .page-content {
      padding-top: calc(2in + 0.5in);
      padding-left: 1.5in;
      padding-right: 1.5in;
      padding-bottom: calc(1in + 0.5in);
    }

    .report-title {
      font-size: 20px;
      font-weight: 600;
      border-bottom: 2px solid #8c191b;
      padding-bottom: 6px;
      margin-bottom: 18px;
    }

    .details-block {
      background: #ffffff;
      padding: 16px 20px;
      border-radius: 6px;
      box-shadow: 0px 0px 8px rgba(0,0,0,0.08);
      margin-bottom: 22px;
    }

    .details-block h3 {
      margin: 0 0 12px 0;
      font-size: 14px;
      font-weight: 600;
      color: #8c191b;
    }

    .details-row {
      display: flex;
      margin-bottom: 6px;
    }

    .details-label {
      width: 150px;
      font-weight: 600;
      color: #333;
    }

    .details-value {
      flex: 1;
      color: #444;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background: #ffffff;
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0px 0px 8px rgba(0,0,0,0.08);
      font-size: 11px;
    }

    thead th {
      padding: 10px 6px;
      background: #f1e5e6;
      color: #8c191b;
      font-weight: 700;
      border-bottom: 2px solid #8c191b;
      text-align: left;
    }

    tbody tr:nth-child(even) {
      background: #fafafa;
    }

    tbody td {
      padding: 10px 6px;
      border-bottom: 1px solid #eee;
      vertical-align: top;
      line-height: 1.4;
    }

    /* optional width tuning */
    th:nth-child(1), td:nth-child(1) { width: 9%; }
    th:nth-child(2), td:nth-child(2) { width: 9%; }
    th:nth-child(3), td:nth-child(3) { width: 9%; }
    th:nth-child(4), td:nth-child(4) { width: 12%; }
    th:nth-child(5), td:nth-child(5) { width: 12%; }
    th:nth-child(6), td:nth-child(6) { width: 17%; }
    th:nth-child(7), td:nth-child(7) { width: 32%; }

    .breakdown-item {
      margin-bottom: 4px;
      padding-left: 4px;
      border-left: 2px solid #8c191b;
    }

    .breakdown-label {
      font-weight: 600;
    }

    tr {
      page-break-inside: avoid;
    }
  </style>
</head>

<body>

  <div class="page-header">
    <h1>The Elden Heights SchooL</h1>
  </div>

  <div class="page-footer">
    <p>
The Elden Heights School | A unit of Bhagwati Educational And Charitable Trust
Opposite B.S.F Firing Range, Siwar, Hazaribagh 825317
Contact: +91 9431904333 | www.eldenheights.org
    </p>
  </div>

  <div class="page-content">

    <div class="report-title">Fee History Report</div>

    <div class="details-block">
      <h3>Student Details</h3>

      <div class="details-row">
        <div class="details-label">Name</div>
        <div class="details-value">{{student_name}}</div>
      </div>

      <div class="details-row">
        <div class="details-label">School Number</div>
        <div class="details-value">{{school_number}}</div>
      </div>

      <div class="details-row">
        <div class="details-label">Class</div>
        <div class="details-value">{{class_name}}</div>
      </div>

      <div class="details-row">
        <div class="details-label">Session</div>
        <div class="details-value">{{session_name}}</div>
      </div>

      <div class="details-row">
        <div class="details-label">Generated on</div>
        <div class="details-value">{{generated_on}}</div>
      </div>

      <div class="details-row">
        <div class="details-label">Report Duration</div>
        <div class="details-value">{{report_duration}}</div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Payment No.</th>
          <th>Amount</th>
          <th>Mode</th>
          <th>Date</th>
          <th>Time</th>
          <th>Transaction Id</th>
          <th>Breakdown</th>
        </tr>
      </thead>

      <tbody>
        {{#each payments}}
        <tr>
          <td>{{payment_number}}</td>
          <td>₹ {{amount}}</td>
          <td>{{mode}}</td>
          <td>{{date}}</td>
          <td>{{time}}</td>
          <td>{{transaction_id}}</td>
          <td>
            {{#each breakdown}}
            <div class="breakdown-item">
              <span class="breakdown-label">{{label}}</span>
              <span> ₹ {{amount}}</span>
            </div>
            {{/each}}
          </td>
        </tr>
        {{/each}}
      </tbody>

    </table>

  </div>

</body>
</html>
`;

const studentList = [
  {
    id: 'S001',
    name: 'Aarav Singh',
    schoolNumber: 'EHS-1023',
    className: 'VII B',
    session: '2024-25',
    payments: [
      {
        paymentNumber: 'PMT-1201',
        amount: 4500,
        mode: 'UPI',
        date: '2024-06-10',
        time: '10:14 AM',
        transactionId: 'TXN1023001',
        session: '2024-25',
        breakdown: [
          { label: 'Tuition Fee', amount: 3000 },
          { label: 'Transport', amount: 900 },
          { label: 'Activity', amount: 600 },
        ],
      },
      {
        paymentNumber: 'PMT-1202',
        amount: 4500,
        mode: 'Cash',
        date: '2024-07-12',
        time: '12:44 PM',
        transactionId: 'TXN1023002',
        session: '2024-25',
        breakdown: [
          { label: 'Tuition Fee', amount: 3000 },
          { label: 'Transport', amount: 900 },
          { label: 'Activity', amount: 600 },
        ],
      },
      {
        paymentNumber: 'PMT-1203',
        amount: 4800,
        mode: 'Net Banking',
        date: '2024-08-14',
        time: '11:18 AM',
        transactionId: 'TXN1023003',
        session: '2024-25',
        breakdown: [
          { label: 'Tuition Fee', amount: 3000 },
          { label: 'Transport', amount: 1200 },
          { label: 'Lab Fee', amount: 600 },
        ],
      },
    ],
  },
  {
    id: 'S002',
    name: 'Kritika Mehta',
    schoolNumber: 'EHS-1041',
    className: 'VIII A',
    session: '2024-25',
    payments: [
      {
        paymentNumber: 'PMT-1301',
        amount: 5200,
        mode: 'UPI',
        date: '2024-06-09',
        time: '09:18 AM',
        transactionId: 'TXN1041001',
        session: '2024-25',
        breakdown: [
          { label: 'Tuition Fee', amount: 3200 },
          { label: 'Transport', amount: 1400 },
          { label: 'Smart Class', amount: 600 },
        ],
      },
      {
        paymentNumber: 'PMT-1302',
        amount: 5200,
        mode: 'Card',
        date: '2024-07-09',
        time: '01:03 PM',
        transactionId: 'TXN1041002',
        session: '2024-25',
        breakdown: [
          { label: 'Tuition Fee', amount: 3200 },
          { label: 'Transport', amount: 1400 },
          { label: 'Smart Class', amount: 600 },
        ],
      },
    ],
  },
  {
    id: 'S003',
    name: 'Manan Bose',
    schoolNumber: 'EHS-1077',
    className: 'IX C',
    session: '2023-24',
    payments: [
      {
        paymentNumber: 'PMT-1901',
        amount: 6100,
        mode: 'UPI',
        date: '2024-02-02',
        time: '02:41 PM',
        transactionId: 'TXN1077001',
        session: '2023-24',
        breakdown: [
          { label: 'Tuition Fee', amount: 3800 },
          { label: 'Transport', amount: 1500 },
          { label: 'Exam Fee', amount: 800 },
        ],
      },
      {
        paymentNumber: 'PMT-1902',
        amount: 6100,
        mode: 'Cash',
        date: '2024-03-05',
        time: '11:55 AM',
        transactionId: 'TXN1077002',
        session: '2023-24',
        breakdown: [
          { label: 'Tuition Fee', amount: 3800 },
          { label: 'Transport', amount: 1500 },
          { label: 'Exam Fee', amount: 800 },
        ],
      },
    ],
  },
];

const parseDate = (dateString) => {
  if (!dateString) return null;
  const parsed = new Date(`${dateString}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const matchesDateRange = (dateString, startDate, endDate) => {
  const value = parseDate(dateString);
  if (!value) return false;
  if (startDate) {
    const start = parseDate(startDate);
    if (start && value < start) return false;
  }
  if (endDate) {
    const end = parseDate(endDate);
    if (end && value > end) return false;
  }
  return true;
};

const matchesMonth = (dateString, monthValue) => {
  if (!monthValue) return true;
  const parsed = parseDate(dateString);
  if (!parsed) return false;
  return parsed.getMonth() === Number(monthValue);
};

const matchesSession = (paymentSession, sessionValue) => {
  if (!sessionValue || sessionValue === 'All') return true;
  return paymentSession === sessionValue;
};

const matchesMode = (paymentMode, modeValue) => {
  if (!modeValue || modeValue === 'All') return true;
  return paymentMode === modeValue;
};

const formatCurrency = (amount) => amount.toLocaleString('en-IN');

const buildReportDuration = (filters) => {
  const parts = [];
  if (filters.startDate || filters.endDate) {
    const start = filters.startDate ? filters.startDate : 'Any';
    const end = filters.endDate ? filters.endDate : 'Any';
    parts.push(`Date Range: ${start} to ${end}`);
  }
  if (filters.month) {
    const monthName = MONTH_OPTIONS.find((opt) => opt.value === filters.month)?.label;
    if (monthName) parts.push(`Month: ${monthName}`);
  }
  if (filters.session && filters.session !== 'All') {
    parts.push(`Session: ${filters.session}`);
  }
  return parts.length ? parts.join(' | ') : 'Complete payment history';
};

const buildBreakdownHtml = (items = []) =>
  items
    .map(
      (item) => `\n            <div class=\"breakdown-item\">\n              <span class=\"breakdown-label\">${item.label}</span>\n              <span> ₹ ${formatCurrency(item.amount)}</span>\n            </div>`
    )
    .join('');

const buildPaymentsHtml = (payments) =>
  payments
    .map(
      (payment) => `\n        <tr>\n          <td>${payment.paymentNumber}</td>\n          <td>₹ ${formatCurrency(payment.amount)}</td>\n          <td>${payment.mode}</td>\n          <td>${payment.date}</td>\n          <td>${payment.time}</td>\n          <td>${payment.transactionId}</td>\n          <td>${buildBreakdownHtml(payment.breakdown)}</td>\n        </tr>`
    )
    .join('\n');

const buildPaymentHistoryHtml = (student, payments, filters) => {
  const reportDuration = buildReportDuration(filters);
  const filled = PAYMENT_HISTORY_TEMPLATE.replace('{{student_name}}', student.name)
    .replace('{{school_number}}', student.schoolNumber)
    .replace('{{class_name}}', student.className)
    .replace('{{session_name}}', student.session)
    .replace('{{generated_on}}', new Date().toLocaleString())
    .replace('{{report_duration}}', reportDuration)
    .replace(/{{#each payments}}([\s\S]*?){{\/each}}/, buildPaymentsHtml(payments));

  return filled;
};

const downloadPdf = (htmlString, filename) => {
  if (typeof window === 'undefined') return;
  const newWindow = window.open('', '_blank', 'width=1200,height=1600');
  if (!newWindow) return;
  newWindow.document.write(htmlString);
  newWindow.document.close();
  newWindow.focus();
  newWindow.print();
  newWindow.document.title = filename;
};

const downloadCsv = (rows, filename) => {
  if (typeof window === 'undefined' || !rows.length) return;
  const header = [
    'Payment No.',
    'Amount',
    'Mode',
    'Date',
    'Time',
    'Transaction Id',
    'Session',
    'Breakdown',
    'Student Name',
    'Class',
  ];
  const csvRows = rows.map((row) =>
    [
      row.paymentNumber,
      row.amount,
      row.mode,
      row.date,
      row.time,
      row.transactionId,
      row.session,
      row.breakdown,
      row.studentName,
      row.className,
    ]
      .map((value) => `"${value || ''}"`)
      .join(',')
  );
  const csvContent = [header.join(','), ...csvRows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const filterPayments = (payments, filters) =>
  payments.filter(
    (payment) =>
      matchesDateRange(payment.date, filters.startDate, filters.endDate) &&
      matchesMonth(payment.date, filters.month) &&
      matchesSession(payment.session, filters.session) &&
      matchesMode(payment.mode, filters.mode)
  );

export default function AccountantDashboard() {
  const sessionOptions = useMemo(() => {
    const values = new Set();
    studentList.forEach((student) => {
      values.add(student.session);
      student.payments.forEach((payment) => values.add(payment.session));
    });
    return ['All', ...Array.from(values)];
  }, []);

  const [studentFilters, setStudentFilters] = useState(() =>
    studentList.reduce((acc, student) => {
      acc[student.id] = { startDate: '', endDate: '', month: '', session: 'All', mode: 'All' };
      return acc;
    }, {})
  );

  const [overallFilters, setOverallFilters] = useState({
    startDate: '',
    endDate: '',
    month: '',
    session: 'All',
    mode: 'All',
  });

  const overallPayments = useMemo(
    () =>
      studentList.flatMap((student) =>
        student.payments.map((payment) => ({
          ...payment,
          studentName: student.name,
          className: student.className,
          schoolNumber: student.schoolNumber,
        }))
      ),
    []
  );

  const filteredOverallPayments = useMemo(
    () => filterPayments(overallPayments, overallFilters),
    [overallPayments, overallFilters]
  );

  const handleStudentFilterChange = (studentId, key, value) => {
    setStudentFilters((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [key]: value,
      },
    }));
  };

  const getFilteredStudentPayments = (student) => {
    const filters = studentFilters[student.id] || {};
    return filterPayments(student.payments, filters);
  };

  const handleStudentPdf = (student) => {
    const filters = studentFilters[student.id];
    const filteredPayments = getFilteredStudentPayments(student);
    const htmlString = buildPaymentHistoryHtml(student, filteredPayments, filters);
    downloadPdf(htmlString, `${student.name}-fee-history.pdf`);
  };

  const handleStudentCsv = (student) => {
    const filters = studentFilters[student.id];
    const filteredPayments = getFilteredStudentPayments(student);
    const rows = filteredPayments.map((payment) => ({
      ...payment,
      breakdown: payment.breakdown.map((item) => `${item.label}: ₹${item.amount}`).join('; '),
      studentName: student.name,
      className: student.className,
    }));
    downloadCsv(rows, `${student.name}-fee-history.csv`);
  };

  const handleOverallPdf = () => {
    const reportStudent = {
      name: 'All Students',
      schoolNumber: 'Consolidated',
      className: '—',
      session: overallFilters.session === 'All' ? 'All sessions' : overallFilters.session,
    };
    const htmlString = buildPaymentHistoryHtml(reportStudent, filteredOverallPayments, overallFilters);
    downloadPdf(htmlString, 'overall-fee-history.pdf');
  };

  const handleOverallCsv = () => {
    const rows = filteredOverallPayments.map((payment) => ({
      ...payment,
      breakdown: payment.breakdown.map((item) => `${item.label}: ₹${item.amount}`).join('; '),
    }));
    downloadCsv(rows, 'overall-fee-history.csv');
  };

  return (
    <>
      <Head>
        <title>Accountant Dashboard | Payment History</title>
      </Head>
      <div className="min-h-screen bg-gray-50 pb-16 text-gray-900">
        <header className="bg-white shadow-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-amber-700">ERP · Finance</p>
              <h1 className="text-2xl font-semibold text-gray-900">Accountant Dashboard</h1>
              <p className="text-sm text-gray-600">Filter, review, and export payment histories synced with session data.</p>
            </div>
            <div className="rounded-lg bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 ring-1 ring-amber-200">
              Payment history control center
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6">
          <section className="mt-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-gray-900">Student-wise payment history</h2>
              <p className="text-sm text-gray-600">
                Apply filters by date range, month, and session, then download the filtered list as PDF or CSV for every student record.
              </p>
            </div>
            <div className="mt-4 grid gap-6 lg:grid-cols-2">
              {studentList.map((student) => {
                const filters = studentFilters[student.id];
                const payments = getFilteredStudentPayments(student);
                return (
                  <div key={student.id} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">Student</p>
                          <p className="text-lg font-semibold text-gray-900">{student.name}</p>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <p>School No: {student.schoolNumber}</p>
                          <p>Class: {student.className}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                        <span className="rounded-full bg-gray-100 px-3 py-1">Session: {student.session}</span>
                        <span className="rounded-full bg-gray-100 px-3 py-1">Records: {payments.length}</span>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <label className="flex flex-col text-sm text-gray-700">
                        From date
                        <input
                          type="date"
                          value={filters.startDate}
                          onChange={(e) => handleStudentFilterChange(student.id, 'startDate', e.target.value)}
                          className="mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </label>
                      <label className="flex flex-col text-sm text-gray-700">
                        To date
                        <input
                          type="date"
                          value={filters.endDate}
                          onChange={(e) => handleStudentFilterChange(student.id, 'endDate', e.target.value)}
                          className="mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </label>
                      <label className="flex flex-col text-sm text-gray-700">
                        Month (Jan-Dec)
                        <select
                          value={filters.month}
                          onChange={(e) => handleStudentFilterChange(student.id, 'month', e.target.value)}
                          className="mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        >
                          {MONTH_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="flex flex-col text-sm text-gray-700">
                        Session
                        <select
                          value={filters.session}
                          onChange={(e) => handleStudentFilterChange(student.id, 'session', e.target.value)}
                          className="mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        >
                          {sessionOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="flex flex-col text-sm text-gray-700">
                        Mode
                        <select
                          value={filters.mode}
                          onChange={(e) => handleStudentFilterChange(student.id, 'mode', e.target.value)}
                          className="mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        >
                          {['All', 'UPI', 'Cash', 'Card', 'Net Banking'].map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
                      <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-2 text-left font-semibold text-gray-700">Payment No.</th>
                            <th className="px-3 py-2 text-left font-semibold text-gray-700">Amount</th>
                            <th className="px-3 py-2 text-left font-semibold text-gray-700">Mode</th>
                            <th className="px-3 py-2 text-left font-semibold text-gray-700">Date</th>
                            <th className="px-3 py-2 text-left font-semibold text-gray-700">Transaction Id</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                          {payments.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="px-3 py-6 text-center text-sm text-gray-500">
                                No payments match the selected filters.
                              </td>
                            </tr>
                          ) : (
                            payments.map((payment) => (
                              <tr key={payment.paymentNumber}>
                                <td className="px-3 py-2 font-medium text-gray-900">{payment.paymentNumber}</td>
                                <td className="px-3 py-2 text-gray-800">₹ {formatCurrency(payment.amount)}</td>
                                <td className="px-3 py-2 text-gray-700">{payment.mode}</td>
                                <td className="px-3 py-2 text-gray-700">{payment.date}</td>
                                <td className="px-3 py-2 text-xs text-gray-500">{payment.transactionId}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => handleStudentPdf(student)}
                        className="inline-flex items-center gap-2 rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-800"
                      >
                        Download PDF
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStudentCsv(student)}
                        className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-amber-700 ring-1 ring-amber-200 transition hover:bg-amber-50"
                      >
                        Download CSV
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-10 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">Overall payments</p>
                <h2 className="text-lg font-semibold text-gray-900">Consolidated payment history</h2>
                <p className="text-sm text-gray-600">
                  Mode filter is retained and combined with date range, month, and session filters. Export filtered rows instantly.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleOverallPdf}
                  className="inline-flex items-center gap-2 rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-800"
                >
                  Download as PDF
                </button>
                <button
                  type="button"
                  onClick={handleOverallCsv}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-amber-700 ring-1 ring-amber-200 transition hover:bg-amber-50"
                >
                  Download as CSV
                </button>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <label className="flex flex-col text-sm text-gray-700">
                From date
                <input
                  type="date"
                  value={overallFilters.startDate}
                  onChange={(e) => setOverallFilters((prev) => ({ ...prev, startDate: e.target.value }))}
                  className="mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                To date
                <input
                  type="date"
                  value={overallFilters.endDate}
                  onChange={(e) => setOverallFilters((prev) => ({ ...prev, endDate: e.target.value }))}
                  className="mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Month (Jan-Dec)
                <select
                  value={overallFilters.month}
                  onChange={(e) => setOverallFilters((prev) => ({ ...prev, month: e.target.value }))}
                  className="mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  {MONTH_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Session
                <select
                  value={overallFilters.session}
                  onChange={(e) => setOverallFilters((prev) => ({ ...prev, session: e.target.value }))}
                  className="mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  {sessionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Mode
                <select
                  value={overallFilters.mode}
                  onChange={(e) => setOverallFilters((prev) => ({ ...prev, mode: e.target.value }))}
                  className="mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  {['All', 'UPI', 'Cash', 'Card', 'Net Banking'].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Payment No.</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Student</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Class</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Amount</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Mode</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Date</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Transaction Id</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {filteredOverallPayments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-3 py-6 text-center text-sm text-gray-500">
                        No payments match the selected filters.
                      </td>
                    </tr>
                  ) : (
                    filteredOverallPayments.map((payment) => (
                      <tr key={`${payment.paymentNumber}-${payment.studentName}`}>
                        <td className="px-3 py-2 font-medium text-gray-900">{payment.paymentNumber}</td>
                        <td className="px-3 py-2 text-gray-800">{payment.studentName}</td>
                        <td className="px-3 py-2 text-gray-700">{payment.className}</td>
                        <td className="px-3 py-2 text-gray-800">₹ {formatCurrency(payment.amount)}</td>
                        <td className="px-3 py-2 text-gray-700">{payment.mode}</td>
                        <td className="px-3 py-2 text-gray-700">{payment.date}</td>
                        <td className="px-3 py-2 text-xs text-gray-500">{payment.transactionId}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
