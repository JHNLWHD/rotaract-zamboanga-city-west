import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Sparkles, X } from 'lucide-react';

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.reveal-on-scroll');
            elements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('revealed');
              }, 100 * i);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Auto-hide toast after 5 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
        setSubmitStatus('idle');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setShowToast(false);

    try {
      // Check if we're in production (deployed to Netlify)
      const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
      
      if (isProduction) {
        // Production: Submit to Netlify
        const formData = new FormData(e.target as HTMLFormElement);
        
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData as any).toString()
        });

        if (response.ok) {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          setSubmitStatus('error');
        }
      } else {
        // Development: Simulate successful submission
        console.log('📧 Form submission (development mode):', {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        });
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setShowToast(true);
    }
  };

  const closeToast = () => {
    setShowToast(false);
    setSubmitStatus('idle');
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      content: "raczambowest1@gmail.com",
      link: "mailto:raczambowest1@gmail.com"
    }
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="section-container relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cranberry-50/30"
    >
      {/* Modern background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 -right-32 w-96 h-96 bg-cranberry-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-32 w-80 h-80 bg-cranberry-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="reveal-on-scroll mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-cranberry-100 text-cranberry-700 text-sm font-semibold">
              <Sparkles className="w-4 h-4 mr-2" />
              Get in Touch
            </span>
          </div>
          
          <h2 className="text-section-title text-slate-900 reveal-on-scroll mb-6">
            Ready to <span className="text-gradient">Connect</span>?
            <br />Let's Start the Conversation
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto reveal-on-scroll leading-relaxed">
            Have questions about joining Rotaract? Want to partner with us on a project? 
            We'd love to hear from you and explore how we can work together.
          </p>
        </div>

        {/* Contact content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Contact form */}
          <div className="reveal-on-scroll">
            <div className="modern-card p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value="contact" />
                <div style={{ display: 'none' }}>
                  <label>
                    Don't fill this out if you're human: <input name="bot-field" />
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-cranberry-500 focus:border-cranberry-500 transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-cranberry-500 focus:border-cranberry-500 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-cranberry-500 focus:border-cranberry-500 transition-colors"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-cranberry-500 focus:border-cranberry-500 transition-colors resize-vertical"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                {/* Submit button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-cranberry-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-cranberry-700 focus:ring-2 focus:ring-cranberry-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right side - Contact information */}
          <div className="space-y-8">
            <div className="reveal-on-scroll">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Other Ways to <span className="text-cranberry-600">Reach Us</span>
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="modern-card p-6 flex items-start space-x-4 hover-lift group transition-all duration-300"
                  >
                    <div className="p-3 bg-cranberry-100 rounded-xl text-cranberry-600 group-hover:bg-cranberry-600 group-hover:text-white transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{info.title}</h4>
                      <p className="text-slate-600">{info.content}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Additional info */}
            <div className="reveal-on-scroll">
              <div className="modern-card p-8 bg-gradient-to-br from-cranberry-50 to-cranberry-100/50 border border-cranberry-200/50">
                <h4 className="font-semibold text-cranberry-800 mb-4">Quick Response</h4>
                <p className="text-cranberry-700 text-sm mb-4">
                  We typically respond to inquiries within 24-48 hours. For urgent matters, 
                  feel free to reach out to us directly on Facebook.
                </p>
                <a 
                  href="https://www.facebook.com/RotaractClubZamboWest" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-cranberry-600 hover:text-cranberry-700 font-medium text-sm"
                >
                  Visit our Facebook Page
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
          <div className={`flex items-center space-x-3 px-6 py-4 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-1 ${
            submitStatus === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {submitStatus === 'success' ? (
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
            )}
            <span className="font-medium">
              {submitStatus === 'success' 
                ? 'Message sent successfully! We\'ll get back to you soon.' 
                : 'There was an error sending your message. Please try again.'}
            </span>
            <button 
              onClick={closeToast} 
              className="text-white hover:opacity-70 transition-opacity p-1 rounded-full hover:bg-white/20"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact; 