/**
 * Type definitions for the application
 */

export interface Product {
  typeLink: string
  size: string
  pcs: number
  diaperType: 'diaper' | 'pant'
  features: string[]
  image?: string
}

export interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export type SubmitStatus = 'idle' | 'success' | 'error'

export type FilterType = 'diaper' | 'pant' | 'all'

