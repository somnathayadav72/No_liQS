/**
 * Utility functions for smooth scrolling to sections
 */

export const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export const scrollToProducts = () => {
  scrollToSection('products')
}

