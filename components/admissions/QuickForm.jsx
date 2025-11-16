import { useMemo, useState } from 'react';
import Link from 'next/link';

import { trackFacebookEvent } from '@/lib/facebookPixel';
import {
  PRIORITY_TOKEN_AMOUNT_IN_PAISE,
  PRIORITY_TOKEN_CONTENT_DETAILS,
  PRIORITY_TOKEN_SESSION_STORAGE_KEY
} from '@/lib/priorityToken';

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
  'Grade 9'
];

export default function QuickForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    classApplyingFor: '',
    parentName: '',
    phoneNumber: '',
    city: '',
    email: '',
    address: '',
    previousSchool: '',
    reasonForAdmission: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [hasAcceptedPolicies, setHasAcceptedPolicies] = useState(false);

  const shouldShowPreviousSchool = useMemo(() => {
    if (!formData.classApplyingFor?.startsWith('Grade ')) {
      return false;
    }

    const gradeNumber = Number(formData.classApplyingFor.replace('Grade ', ''));
    return Number.isInteger(gradeNumber) && gradeNumber >= 1 && gradeNumber <= 9;
  }, [formData.classApplyingFor]);

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
      body: JSON.stringify({ amount: PRIORITY_TOKEN_AMOUNT_IN_PAISE })
    });

    const orderResult = await orderResponse.json().catch(() => ({}));

    if (!orderResponse.ok || !orderResult?.orderId) {
      throw new Error(orderResult?.error || 'Unable to initiate payment. Please try again.');
    }

    trackFacebookEvent('AddPaymentInfo', {
      ...PRIORITY_TOKEN_CONTENT_DETAILS,
      class_applying_for: parentDetails.classApplyingFor,
      city: parentDetails.city
    });

    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

    if (!razorpayKey) {
      throw new Error('Payment configuration is missing. Please contact the school team.');
    }

    return new Promise((resolve, reject) => {
      const checkout = new window.Razorpay({
        key: razorpayKey,
        amount: PRIORITY_TOKEN_AMOUNT_IN_PAISE,
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

            const purchasePayload = {
              ...PRIORITY_TOKEN_CONTENT_DETAILS,
              class_applying_for: parentDetails.classApplyingFor,
              city: parentDetails.city,
              parent_name: parentDetails.parentName
            };

            if (typeof window !== 'undefined' && window.sessionStorage) {
              try {
                window.sessionStorage.setItem(
                  PRIORITY_TOKEN_SESSION_STORAGE_KEY,
                  JSON.stringify(purchasePayload)
                );
              } catch (storageError) {
                console.warn('Unable to persist purchase payload for success page tracking.', storageError);
              }
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
      const snapshot = {
        ...formData,
        previousSchool: shouldShowPreviousSchool ? formData.previousSchool : ''
      };

      trackFacebookEvent('AddToCart', {
        ...PRIORITY_TOKEN_CONTENT_DETAILS,
        class_applying_for: snapshot.classApplyingFor,
        city: snapshot.city,
        parent_name: snapshot.parentName
      });

      const response = await fetch('/api/admissions/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(snapshot)
      });

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(result?.error || 'Something went wrong. Please try again.');
      }

      trackFacebookEvent('CompleteRegistration', {
        currency: 'INR',
        value: 0,
        class_applying_for: snapshot.classApplyingFor,
        city: snapshot.city,
        parent_name: snapshot.parentName
      });

      trackFacebookEvent('InitiateCheckout', {
        ...PRIORITY_TOKEN_CONTENT_DETAILS,
        class_applying_for: snapshot.classApplyingFor,
        city: snapshot.city,
        parent_name: snapshot.parentName
      });

      await startPayment(snapshot);
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Submission failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="admissions-form" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-cardinal">Secure Your Seat</p>
          <h2 className="text-3xl font-semibold text-cardinal">Quick Admission Form</h2>
          <p className="text-gray-600">Complete the form and pay the refundable ₹500 token to hold your child’s seat.</p>
        </div>
        <div className="mt-10">
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
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-cardinal">
              Email ID
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="rounded-lg border border-gray-300 bg-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-cardinal"
              placeholder="name@example.com"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="address" className="text-sm font-semibold text-cardinal">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleChange}
              required
              className="rounded-lg border border-gray-300 bg-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-cardinal"
            />
          </div>
          {shouldShowPreviousSchool && (
            <div className="flex flex-col space-y-2">
              <label htmlFor="previousSchool" className="text-sm font-semibold text-cardinal">
                Previous School
              </label>
              <input
                id="previousSchool"
                name="previousSchool"
                type="text"
                value={formData.previousSchool}
                onChange={handleChange}
                required
                className="rounded-lg border border-gray-300 bg-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-cardinal"
              />
            </div>
          )}
          <div className="flex flex-col space-y-2">
            <label htmlFor="reasonForAdmission" className="text-sm font-semibold text-cardinal">
              Reason for Admission (Optional)
            </label>
            <textarea
              id="reasonForAdmission"
              name="reasonForAdmission"
              rows={3}
              value={formData.reasonForAdmission}
              onChange={handleChange}
              className="rounded-lg border border-gray-300 bg-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-cardinal"
              placeholder="Share any specific goals or expectations you have."
            />
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
            <input
              id="policyAcknowledgement"
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-gray-300 text-cardinal focus:ring-cardinal"
              checked={hasAcceptedPolicies}
              onChange={(event) => setHasAcceptedPolicies(event.target.checked)}
              required
            />
            <label htmlFor="policyAcknowledgement" className="leading-relaxed">
              I have read{' '}
              <Link href="/terms-and-conditions" className="text-cardinal underline">
                terms and conditions
              </Link>{' '}
              &amp;{' '}
              <Link href="/policies/admission-policy" className="text-cardinal underline">
                admission policy
              </Link>
              .
            </label>
          </div>
            <div className="space-y-4">
              <button
                type="submit"
                disabled={isSubmitting || !hasAcceptedPolicies}
                className="w-full px-6 py-3 rounded-xl bg-cardinal text-white font-medium shadow-lg transition hover:bg-white hover:text-cardinal border border-cardinal disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing…' : 'Submit & Pay ₹500 Token'}
              </button>
              <p className="text-xs text-gray-500 text-center">
                Fully adjusted in final admission fees.
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
        </div>
      </div>
    </section>
  );
}
