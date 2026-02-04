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

  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-start">
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-black/15 bg-midnight text-white p-10 shadow-xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35"
            style={{ backgroundImage: "url('/home/contact-glow.jpg')" }}
            aria-hidden="true"
          />
          <img
            src="/home/contact-glow.jpg"
            alt="School activities at Elden Heights in Hazaribagh Jharkhand"
            className="sr-only"
          />
          <div className="absolute inset-0 bg-midnight/70" aria-hidden="true" />
          <div className="relative space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold">Get in Touch</h2>
            <p className="text-white/80 text-lg">
              We’d love to connect with you as we transition into a future-ready school community.
            </p>
            <div className="space-y-4 text-white/85">
              <div>
                <h3 className="font-semibold text-white">Address</h3>
                <p>Katghara, Opp. BSF Firing Range, Silwar, Hazaribagh, Jharkhand</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Phone</h3>
                <p>+91 9431904333</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <a
                    href="tel:+919431904333"
                    className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
                  >
                    Call Now
                  </a>
                  <a
                    href="https://wa.me/919431904333"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white">Email</h3>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-white underline decoration-white/70 decoration-2 underline-offset-4 transition hover:decoration-white"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.form
          onSubmit={handleSubmit}
          className="relative rounded-3xl border border-black/10 bg-white p-8 shadow-xl space-y-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <div className="relative space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-midnight">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={contactData.name}
                onChange={handleChange}
                required
                className="rounded-xl border border-black/20 bg-white/70 p-3 w-full focus:outline-none focus:ring-2 focus:ring-cardinal/60"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-midnight">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={contactData.email}
                onChange={handleChange}
                required
                className="rounded-xl border border-black/20 bg-white/70 p-3 w-full focus:outline-none focus:ring-2 focus:ring-cardinal/60"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="message" className="text-sm font-semibold text-midnight">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={contactData.message}
                onChange={handleChange}
                className="rounded-xl border border-black/20 bg-white/70 p-3 w-full focus:outline-none focus:ring-2 focus:ring-cardinal/60"
                placeholder="Tell us how we can help"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-full bg-midnight text-parchment font-semibold shadow-lg shadow-midnight/25 transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {status.message && (
              <p
                className={`text-sm ${status.type === 'error' ? 'text-black' : 'text-black'}`}
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
