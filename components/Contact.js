import { useState } from 'react';
import { motion } from 'framer-motion';

import { CONTACT_EMAIL } from '@/lib/contactInfo';
import { trackFacebookEvent } from '@/lib/facebookPixel';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
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

  const inputClass =
    'w-full rounded-xl border border-midnight/15 bg-white px-4 py-3 text-midnight placeholder-midnight/40 transition-all duration-300 focus:border-gold/70 focus:outline-none focus:ring-2 focus:ring-gold/30';

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-8 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <motion.div
          className="relative overflow-hidden rounded-[28px] border border-gold/20 bg-gradient-to-br from-midnight via-graphite to-midnight p-10 text-parchment shadow-[0_40px_80px_-40px_rgba(10,10,12,0.5)]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
            style={{ backgroundImage: "url('/home/contact-glow.jpg')" }}
            aria-hidden="true"
          />
          <img
            src="/home/contact-glow.jpg"
            alt="School activities at Elden Heights in Hazaribagh Jharkhand"
            className="sr-only"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-midnight/70 via-midnight/80 to-midnight/95" />
          <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-cardinal/25 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-gold/15 blur-[120px]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

          <div className="relative space-y-8">
            <div>
              <span className="eyebrow eyebrow-dark">Begin the Conversation</span>
              <h2 className="mt-4 font-garamond text-4xl font-semibold leading-[1.05] text-parchment sm:text-[42px]">
                Get in touch.
              </h2>
              <p className="mt-4 max-w-md text-parchment/75">
                We&rsquo;d love to connect with you as we continue to craft a future-ready school
                community in Hazaribagh.
              </p>
            </div>

            <div className="space-y-6 text-parchment/85">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-300">
                  Address
                </p>
                <p className="mt-2">
                  Katghara, Opp. BSF Firing Range, Silwar,
                  <br /> Hazaribagh, Jharkhand
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-300">
                  Phone
                </p>
                <p className="mt-2 text-parchment">+91 94319 04333</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a href="tel:+919431904333" className="btn-gold">
                    Call Now
                  </a>
                  <a
                    href="https://wa.me/919431904333"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-parchment/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-parchment backdrop-blur transition hover:-translate-y-0.5 hover:border-gold/60 hover:bg-white/10 hover:text-gold-200"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d="M20.5 3.5A11 11 0 003.5 18L2 22l4.2-1.4A11 11 0 0020.5 3.5zM12 20a8 8 0 01-4.3-1.3l-.3-.2-2.5.8.8-2.4-.2-.3A8 8 0 1112 20zm4.6-5.7c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.2.2-.3.2-.6.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4-.3.4-1 1-1 2.4s1 2.8 1.2 3 2.1 3.3 5.2 4.6c.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.5.2-.7.2-1.4.2-1.5l-.4-.3z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-300">
                  Email
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="mt-2 inline-block text-parchment transition hover:text-gold-200"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="surface-card relative rounded-[28px] p-8 md:p-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <div className="space-y-6">
            <div>
              <span className="eyebrow">Send a message</span>
              <h3 className="mt-3 font-garamond text-3xl font-semibold text-midnight">
                We&rsquo;re listening.
              </h3>
            </div>

            <div className="space-y-2">
              <label htmlFor="name" className="text-[11px] font-semibold uppercase tracking-[0.25em] text-midnight/70">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={contactData.name}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-[0.25em] text-midnight/70">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={contactData.email}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-[11px] font-semibold uppercase tracking-[0.25em] text-midnight/70">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={contactData.message}
                onChange={handleChange}
                className={inputClass}
                placeholder="Tell us how we can help"
                required
              />
            </div>
            <button
              type="submit"
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending…' : 'Send Message'}
              {!isSubmitting && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-4-4l4 4-4 4" />
                </svg>
              )}
            </button>
            {status.message && (
              <p
                className={`rounded-xl border px-4 py-3 text-sm ${
                  status.type === 'error'
                    ? 'border-cardinal/30 bg-cardinal/5 text-cardinal'
                    : 'border-gold/40 bg-gold/10 text-midnight'
                }`}
              >
                {status.message}
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
