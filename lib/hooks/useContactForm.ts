import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { ContactForm, SubmitStatus } from '@/types'

export function useContactForm() {
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')

  const isFormValid = contactForm.name.trim() !== '' && 
                      contactForm.email.trim() !== '' && 
                      contactForm.subject.trim() !== '' && 
                      contactForm.message.trim() !== '' &&
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    if (publicKey && publicKey !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(publicKey)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const yourEmail = process.env.NEXT_PUBLIC_YOUR_EMAIL

      if (!serviceId || !templateId || serviceId === 'YOUR_SERVICE_ID' || templateId === 'YOUR_TEMPLATE_ID') {
        throw new Error('EmailJS is not configured. Please set up your environment variables.')
      }

      const templateParams = {
        from_name: contactForm.name,
        from_email: contactForm.email,
        phone: contactForm.phone || 'Not provided',
        subject: contactForm.subject,
        message: contactForm.message,
        to_email: yourEmail || 'your-email@example.com',
        reply_to: contactForm.email,
      }

      await emailjs.send(serviceId, templateId, templateParams)

      setSubmitStatus('success')
      setContactForm({ 
        name: '', 
        email: '', 
        phone: '', 
        subject: '', 
        message: '' 
      })
      
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitStatus('error')
      
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    contactForm,
    setContactForm,
    isSubmitting,
    submitStatus,
    isFormValid,
    handleSubmit
  }
}

