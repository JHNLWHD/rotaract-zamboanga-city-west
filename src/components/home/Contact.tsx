import React, { useEffect, useState } from 'react';
import { CheckCircle, Loader2, X } from 'lucide-react';

const fieldClass =
  'mt-2 w-full border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-cranberry-600 focus:ring-1 focus:ring-cranberry-600';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!showToast) return;
    const timer = window.setTimeout(() => {
      setShowToast(false);
      setSubmitStatus('idle');
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [showToast]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData(current => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setShowToast(false);

    try {
      const isProduction = !['localhost', '127.0.0.1'].includes(
        window.location.hostname
      );

      if (isProduction) {
        const payload = new FormData(event.currentTarget);
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(
            payload as unknown as Record<string, string>
          ).toString(),
        });
        if (!response.ok) throw new Error('Contact form submission failed');
      } else {
        await new Promise(resolve => window.setTimeout(resolve, 400));
      }

      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitStatus('success');
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setShowToast(true);
    }
  };

  return (
    <section
      id="contact"
      className="editorial-section bg-white"
      aria-labelledby="contact-heading"
    >
      <div className="editorial-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <p className="editorial-kicker">Contact</p>
          <h2 id="contact-heading" className="editorial-heading mt-3">
            Contact the club
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-slate-600">
            For partnership inquiries, record corrections, and general club
            matters, use the club email or send a message here.
          </p>

          <div className="mt-8 divide-y divide-slate-200 border-y border-slate-300 text-sm">
            <div className="py-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                Club email
              </p>
              <a
                href="mailto:raczambowest1@gmail.com"
                className="mt-1 inline-block font-semibold text-cranberry-700"
              >
                raczambowest1@gmail.com
              </a>
            </div>
            <div className="py-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                Social records
              </p>
              <div className="mt-1 flex gap-5">
                <a
                  href="https://www.facebook.com/RotaractClubZamboWest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-cranberry-700"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/raczambowest1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-cranberry-700"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          className="border-t-2 border-slate-950 pt-6"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden">
            <label>
              Do not fill this out: <input name="bot-field" />
            </label>
          </p>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-700">
              Full name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                autoComplete="name"
                className={fieldClass}
              />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Email address
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                autoComplete="email"
                className={fieldClass}
              />
            </label>
          </div>

          <label className="mt-5 block text-sm font-semibold text-slate-700">
            Subject
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className={fieldClass}
            />
          </label>

          <label className="mt-5 block text-sm font-semibold text-slate-700">
            Message
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={5}
              className={`${fieldClass} resize-y`}
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 inline-flex items-center gap-2 bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting && (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            )}
            {isSubmitting ? 'Sending…' : 'Send message'}
          </button>
        </form>
      </div>

      {showToast && (
        <div
          role={submitStatus === 'error' ? 'alert' : 'status'}
          className="fixed bottom-5 left-5 z-[100] flex max-w-sm items-start gap-3 border border-slate-300 bg-white p-4 shadow-lg"
        >
          {submitStatus === 'success' && (
            <CheckCircle
              className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
              aria-hidden="true"
            />
          )}
          <div className="text-sm">
            <p className="font-semibold text-slate-950">
              {submitStatus === 'success'
                ? 'Message sent'
                : 'Message could not be sent'}
            </p>
            <p className="mt-1 text-slate-600">
              {submitStatus === 'success'
                ? 'Thank you. The club will review your message.'
                : 'Please try again or email the club directly.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowToast(false)}
            className="ml-auto text-slate-500 hover:text-slate-900"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  );
};

export default Contact;
