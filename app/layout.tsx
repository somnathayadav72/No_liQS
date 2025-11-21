import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NoliQS - The Softest Hug for Your Baby\'s Skin',
  description: 'Premium baby diapers with Bubble Technology, 10-hour all-night protection & 3-layer leakage protection. Trusted by 10,000+ parents.',
  icons: {
    icon: '/images/icon.jpg',
    shortcut: '/images/icon.jpg',
    apple: '/images/icon.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

