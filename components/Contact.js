import { useState } from 'react';
import { motion } from 'framer-motion';

import { CONTACT_EMAIL } from '@/lib/contactInfo';
import { trackFacebookEvent } from '@/lib/facebookPixel';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function Contact() {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
    if (status.type) {
      setStatus({ type: null, message: '' });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });
    const snapshot = { ...contactData };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(snapshot)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send your message right now.');
      }

      setStatus({
        type: 'success',
        message: result.message || 'Thank you! We will get back to you soon.'
      });

      trackFacebookEvent('Contact', {
        currency: 'INR',
        value: 0,
        name: snapshot.name,
        email: snapshot.email
      });

      setContactData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="band-white">
      <div className="shell py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-2 md:gap-16">
          <h2 className="font-display text-[clamp(2.25rem,4.4vw,3.75rem)] font-medium leading-[1.06] text-ink">
            Get in touch
          </h2>
          <p className="lede">
            We would love to connect with you as we continue to build a future-ready school
            community in Hazaribagh. Call, write, or send us a message — we read every one.
          </p>
        </div>

        <span className="rule-heavy mt-14 md:mt-16" />

        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="divide-y divide-hairline border-y border-hairline"
          >
            <div className="py-6">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink-muted">
                Address
              </p>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-ink">
                Katghara, Opp. BSF Firing Range, Silwar,
                <br /> Hazaribagh, Jharkhand
              </p>
            </div>

            <div className="py-6">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink-muted">
                Phone
              </p>
              <a href="tel:+919431904333" className="hv-link mt-3 inline-block text-[1.05rem]">
                +91 94319 04333
              </a>
              <div className="mt-5 flex flex-wrap gap-4">
                <a href="tel:+919431904333" className="btn-primary">
                  Call now
                </a>
                <a
                  href="https://wa.me/919431904333"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d="M20.5 3.5A11 11 0 003.5 18L2 22l4.2-1.4A11 11 0 0020.5 3.5zM12 20a8 8 0 01-4.3-1.3l-.3-.2-2.5.8.8-2.4-.2-.3A8 8 0 1112 20zm4.6-5.7c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.2.2-.3.2-.6.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4-.3.4-1 1-1 2.4s1 2.8 1.2 3 2.1 3.3 5.2 4.6c.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.5.2-.7.2-1.4.2-1.5l-.4-.3z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="py-6">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink-muted">
                Email
              </p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="hv-link mt-3 inline-block text-[1.05rem]">
                {CONTACT_EMAIL}
              </a>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="surface-card p-8 md:p-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <h3 className="font-display text-3xl font-medium text-ink">Send a message</h3>
            <p className="mt-3 text-sm text-ink-muted">
              Fields marked with an asterisk are required.
            </p>

            <div className="mt-8 space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="field-label">
                  Name*
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={contactData.name}
                  onChange={handleChange}
                  required
                  className="field-input"
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="field-label">
                  Email*
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={contactData.email}
                  onChange={handleChange}
                  required
                  className="field-input"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="field-label">
                  Message*
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={contactData.message}
                  onChange={handleChange}
                  className="field-input"
                  placeholder="Tell us how we can help"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending…' : 'Send message'}
              </button>

              {status.message && (
                <p
                  className={`border-l-[3px] px-4 py-3 text-sm ${
                    status.type === 'error'
                      ? 'border-crimson bg-crimson-50 text-crimson-700'
                      : 'border-ink bg-ivory text-ink'
                  }`}
                >
                  {status.message}
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
