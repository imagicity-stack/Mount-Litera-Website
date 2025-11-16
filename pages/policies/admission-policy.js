import { useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { trackFacebookEvent } from '@/lib/facebookPixel';

const policyText = `ADMISSION POLICY
1. Overview

Mount Litera School follows a transparent and structured admission process designed to ensure fairness, discipline, and academic readiness. Admissions are open for classes UKG to Class 10 for the academic session 2026–27. The school reserves the right to approve or reject any application based on eligibility, document verification, and seat availability.

2. Admission Funnel & Token Amount

To streamline the admission pipeline, parents may choose to pay a non-refundable token amount at the initial stage. This token amount helps the school reserve a provisional spot during the admission cycle.

Important Note for Parents

The token amount does not guarantee a permanent seat.
Ayooo don’t assume “money diya matlab seat pakka” type logic. Not happening.

A seat is confirmed only after the school verifies all documents, checks eligibility, and completes the full admission process.

If the child’s admission is confirmed, the paid token amount will be adjusted/waived off in the final admission fee.

If the parent chooses to discontinue or fails to complete documentation on time, the token amount will not be refunded.

3. Required Documentation

Before final admission approval, parents must submit the following documents:

Birth Certificate

Aadhar Card of Student & Parents

Transfer Certificate (for Class 2 onward)

Previous School Report Card

2 Passport-size photographs of the student

Address Proof

Any other document requested by the school during verification

If any document is incomplete, fake, unclear, or not submitted within the timeline, the school may cancel the provisional reservation without refund.

4. Fee Structure & Payment Conditions

The complete fee structure will be shared at the time of admission.

Token amount is non-refundable under all circumstances unless the school itself rejects admission.

Fee payment deadlines must be followed strictly.

The school holds the right to revoke admission if fee rules or deadlines are violated.

5. Seat Availability & Priority

Admission is purely based on:

Availability of seats

Verification of documents

Interaction/assessment (where applicable)

School’s internal guidelines

The school does not guarantee admission merely based on inquiry, form submission, or payment of token money.

6. School Rights

The school reserves the full right to:

Modify admission guidelines

Request additional documents

Cancel provisional admission if information provided is found false

Reject applications without stating reasons

7. Parent Declaration

By paying the token amount or filling the admission form, the parent acknowledges that:

They have read and understood the admission policy.

The token amount is non-refundable.

Admission is finalized only after document verification and fee payment.

Any misrepresentation can lead to cancellation.`;

export default function AdmissionPolicyPage() {
  useEffect(() => {
    trackFacebookEvent('ViewContent', {
      page_path: '/policies/admission-policy',
      content_name: 'admission_policy',
      content_category: 'policy',
    });
  }, []);

  return (
    <>
      <Head>
        <title>Admission Policy | Mount Litera School</title>
        <meta
          name="description"
          content="Read the official Mount Litera School admission policy for the 2026–27 academic session."
        />
      </Head>
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="py-16 bg-[#F8F5F3]">
            <div className="max-w-4xl mx-auto px-6 space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-cardinal">Admission Policy</h1>
              <p className="whitespace-pre-line text-gray-700 leading-relaxed">{policyText}</p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
