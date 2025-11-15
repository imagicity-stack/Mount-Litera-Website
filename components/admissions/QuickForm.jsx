import { useState } from 'react';

const TOKEN_AMOUNT_IN_PAISE = 50000;

const classOptions = [
  'Nursery',
  'LKG',
  'UKG',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10'
];

export default function QuickForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    classApplyingFor: '',
    parentName: '',
    phoneNumber: '',
    city: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const startPayment = async (parentDetails) => {
    if (typeof window === 'undefined') {
      throw new Error('Payment flow is only available in the browser.');
    }

    if (!window.Razorpay) {
      throw new Error('Payment gateway failed to load. Please refresh and try again.');
    }

    const orderResponse = await fetch('/api/razorpay/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: TOKEN_AMOUNT_IN_PAISE })
    });

    const orderResult = await orderResponse.json().catch(() => ({}));

    if (!orderResponse.ok || !orderResult?.orderId) {
      throw new Error(orderResult?.error || 'Unable to initiate payment. Please try again.');
    }

    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

    if (!razorpayKey) {
      throw new Error('Payment configuration is missing. Please contact the school team.');
    }

    return new Promise((resolve, reject) => {
      const checkout = new window.Razorpay({
        key: razorpayKey,
        amount: TOKEN_AMOUNT_IN_PAISE,
        currency: 'INR',
        name: 'Mount Litera Zee School',
        description: 'Priority Seat Token',
        order_id: orderResult.orderId,
        prefill: {
          name: parentDetails.parentName,
          contact: parentDetails.phoneNumber
        },
        notes: {
          student_name: parentDetails.studentName,
          class_applying_for: parentDetails.classApplyingFor,
          city: parentDetails.city
        },
        handler: async (response) => {
          try {
            const verifyResponse = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                formData: parentDetails
              })
            });

            const verificationResult = await verifyResponse.json().catch(() => ({}));

            if (!verifyResponse.ok || !verificationResult?.success) {
              reject(
                new Error(
                  verificationResult?.error || 'Unable to verify payment. Please contact the school team.'
                )
              );
              return;
            }

            resolve();
            window.location.href = '/payment-success';
          } catch (error) {
            reject(error);
          }
        },
        modal: {
          ondismiss: () => {
            reject(new Error('Payment was cancelled before completion.'));
          }
        },
        theme: {
          color: '#A81428'
        }
      });

      checkout.open();
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status) {
      setStatus(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const snapshot = { ...formData };

      const response = await fetch('/api/admissions/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(snapshot)
      });

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(result?.error || 'Something went wrong. Please try again.');
      }

      await startPayment(snapshot);
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Submission failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="admissions-form" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-cardinal">Secure Your Seat</p>
          <h2 className="text-3xl font-semibold text-cardinal">Quick Admission Form</h2>
          <p className="text-gray-600">Complete the form and pay the refundable ₹500 token to hold your child’s seat.</p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)]">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 rounded-3xl bg-[#F8F5F3] p-8 shadow-xl"
          >
            <div className="flex flex-col space-y-2">
              <label htmlFor="studentName" className="text-sm font-semibold text-cardinal">
                Student Name
              </label>
              <input
              id="studentName"
              name="studentName"
              type="text"
              autoComplete="name"
              value={formData.studentName}
              onChange={handleChange}
              required
              className="rounded-lg border border-gray-300 bg-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-cardinal"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="classApplyingFor" className="text-sm font-semibold text-cardinal">
              Class Applying For
            </label>
            <select
              id="classApplyingFor"
              name="classApplyingFor"
              value={formData.classApplyingFor}
              onChange={handleChange}
              required
              className="rounded-lg border border-gray-300 bg-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-cardinal"
            >
              <option value="">Select a class</option>
              {classOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="parentName" className="text-sm font-semibold text-cardinal">
              Parent Name
            </label>
            <input
              id="parentName"
              name="parentName"
              type="text"
              autoComplete="name"
              value={formData.parentName}
              onChange={handleChange}
              required
              className="rounded-lg border border-gray-300 bg-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-cardinal"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="phoneNumber" className="text-sm font-semibold text-cardinal">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              autoComplete="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="rounded-lg border border-gray-300 bg-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-cardinal"
              placeholder="e.g. 9876543210"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="city" className="text-sm font-semibold text-cardinal">
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              autoComplete="address-level2"
              value={formData.city}
              onChange={handleChange}
              required
              className="rounded-lg border border-gray-300 bg-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-cardinal"
            />
          </div>
            <div className="space-y-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 rounded-xl bg-cardinal text-white font-medium shadow-lg transition hover:bg-white hover:text-cardinal border border-cardinal disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing…' : 'Submit & Pay ₹500 Token'}
              </button>
              <p className="text-xs text-gray-500 text-center">
                Fully adjusted in final admission fees. Refunded if a seat is not allotted.
              </p>
            </div>
            {status && (
              <div
                className={`rounded-lg border p-4 text-sm md:text-base ${
                  status.type === 'success'
                    ? 'border-green-200 bg-green-50 text-green-700'
                    : 'border-red-200 bg-red-50 text-red-700'
                }`}
              >
                {status.message}
              </div>
            )}
          </form>
          <div className="rounded-3xl border border-dashed border-cardinal/40 bg-white p-8 shadow-lg space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-cardinal">Priority Token</p>
            <h3 className="text-2xl font-semibold text-cardinal">₹500 Priority Seat Token</h3>
            <p className="text-gray-600 text-sm md:text-base">
              This one-time token confirms your intent and keeps the seat reserved while paperwork is completed. It is fully
              adjusted in the final admission fees, and refunded if a seat cannot be allotted.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-cardinal" aria-hidden="true" />
                Priority handling by the admissions counsellor team
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-cardinal" aria-hidden="true" />
                Receipt shared instantly on successful payment
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-cardinal" aria-hidden="true" />
                Transparent and secure Razorpay checkout experience
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
