/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'baby-blue': {
          DEFAULT: '#E0F2FE',
          50: '#E0F2FE',
          100: '#BAE6FD',
          200: '#7DD3FC',
          300: '#38BDF8',
          400: '#0EA5E9',
          500: '#0284C7',
          600: '#0369A1',
          700: '#075985',
        },
        'soft-blue': {
          DEFAULT: '#DBEAFE',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        'coral': {
          DEFAULT: '#FF6B9D',
          50: '#FFF1F5',
          100: '#FFE4EC',
          200: '#FFC7D9',
          300: '#FF9BB8',
          400: '#FF6B9D',
          500: '#FF4785',
          600: '#E91E63',
          700: '#C2185B',
        },
        'off-white': '#FAFAF9',
      },
      fontFamily: {
        'heading': ['Nunito', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      perspective: {
        '1000': '1000px',
      },
      boxShadow: {
        'coral-500/50': '0 25px 50px -12px rgba(255, 107, 157, 0.5)',
      },
    },
  },
  plugins: [],
}

