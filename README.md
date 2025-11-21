# Noliqs - Premium Baby Diaper Landing Page

A high-converting, visually stunning landing page for Noliqs, a premium baby diaper brand.

## Features

- 🎨 Beautiful cloud-soft design with glassmorphism effects
- 📱 Fully responsive (mobile-first approach)
- ✨ Smooth animations with Framer Motion
- 🎯 High-converting sections: Hero, Features, Comparison, Testimonials, Subscription
- 🌈 Soft pastel color palette optimized for baby products

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Fonts:** Nunito (headings) & Inter (body)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
noliqs/
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Main landing page component
│   └── globals.css     # Global styles and Tailwind imports
├── package.json
├── tailwind.config.js  # Tailwind configuration with custom colors
├── next.config.js      # Next.js configuration
└── tsconfig.json       # TypeScript configuration
```

## Design Highlights

- **Color Palette:** Soft Baby Blue (#E0F2FE), Sage Green (#DCFCE7), Warm Peach (#FFE4E6)
- **Typography:** Rounded, friendly fonts for a warm, approachable feel
- **Shapes:** Heavy use of rounded corners (rounded-3xl, rounded-full)
- **Effects:** Glassmorphism cards with backdrop blur
- **Animations:** Gentle float effects and fade-in-up reveals

## Contact Form Setup

The contact form uses EmailJS (free service) for sending emails and SMS notifications. 

**Quick Setup:**
1. See `EMAILJS_SETUP.md` for detailed instructions
2. Create `.env.local` file with your EmailJS credentials
3. Get free account at https://www.emailjs.com/

**Free Tier:**
- 200 emails/month
- SMS via carrier email gateways (unlimited, free)

## Customization

All colors, fonts, and styling can be customized in:
- `tailwind.config.js` - Color palette and theme extensions
- `app/globals.css` - Global styles and utility classes
- `app/page.tsx` - Component structure and content

