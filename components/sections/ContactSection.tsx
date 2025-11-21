'use client'

import { motion } from 'framer-motion'
import { useContactForm } from '@/lib/hooks/useContactForm'

export default function ContactSection() {
  const {
    contactForm,
    setContactForm,
    isSubmitting,
    submitStatus,
    isFormValid,
    handleSubmit
  } = useContactForm()

  return (
    <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-baby-blue-50 to-off-white laser-container">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-gray-900 mb-6 tracking-tight">
            Get in Touch
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Have questions? We'd love to hear from you!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glassmorphism rounded-3xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:border-transparent ${
                  contactForm.name.trim() === '' && contactForm.name !== '' 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-200 focus:ring-soft-blue-500'
                }`}
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                Your Email *
              </label>
              <input
                type="email"
                id="email"
                required
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:border-transparent ${
                  contactForm.email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-200 focus:ring-soft-blue-500'
                }`}
                placeholder="john@example.com"
              />
              {contactForm.email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email) && (
                <p className="text-xs text-red-500 mt-1">Please enter a valid email address</p>
              )}
            </div>

            {/* Phone - Optional */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-2">
                Phone Number <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-soft-blue-500 focus:border-transparent"
                placeholder="+1 234 567 8900"
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-gray-800 mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                required
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                className={`w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:border-transparent ${
                  contactForm.subject.trim() === '' && contactForm.subject !== '' 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-200 focus:ring-soft-blue-500'
                }`}
                placeholder="How can we help you?"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-800 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className={`w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:border-transparent resize-none ${
                  contactForm.message.trim() === '' && contactForm.message !== '' 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-200 focus:ring-soft-blue-500'
                }`}
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              whileHover={{ scale: (isSubmitting || !isFormValid) ? 1 : 1.02 }}
              whileTap={{ scale: (isSubmitting || !isFormValid) ? 1 : 0.98 }}
              className={`w-full pill-button text-white text-lg shadow-xl transition-all ${
                isFormValid && !isSubmitting
                  ? 'bg-coral-500 hover:bg-coral-600 cursor-pointer'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </motion.button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-green-100 text-green-700 text-center"
              >
                ✓ Message sent successfully! We'll get back to you soon.
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-red-100 text-red-700 text-center"
              >
                ✗ Something went wrong. Please try again or contact us directly.
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}

