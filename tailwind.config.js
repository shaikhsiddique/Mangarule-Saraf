/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // 40% Golden Theme
        "ms-gold": "#D4AF37",
        "ms-gold-light": "#F4E4BC",
        "ms-gold-dark": "#B8860B",
        "ms-amber": "#FFD700",
        "ms-bronze": "#CD7F32",
        
        // 30% Silver Theme
        "ms-silver": "#C0C0C0",
        "ms-silver-light": "#E8E8E8",
        "ms-silver-dark": "#A8A8A8",
        "ms-platinum": "#E5E4E2",
        
        // 20% Black & White
        "ms-black": "#000000",
        "ms-black-light": "#1A1A1A",
        "ms-gray": "#333333",
        "ms-white": "#FFFFFF",
        "ms-cream": "#FEFEFE",
        "ms-offwhite": "#FAFAFA"
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        "ms-card": "0 4px 20px 0 rgba(0, 0, 0, 0.1)",
        "ms-gold": "0 4px 20px 0 rgba(212, 175, 55, 0.3)",
        "ms-silver": "0 4px 20px 0 rgba(192, 192, 192, 0.3)",
        "ms-luxury": "0 8px 32px 0 rgba(0, 0, 0, 0.15)",
        "ms-inner": "inset 0 1.5px 0 0 #D4AF37"
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideInDown: { from: { transform: 'translateY(-1rem)' }, to: { transform: 'translateY(0)' } },
        shimmer: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' } }
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in',
        slideInDown: 'slideInDown 0.7s cubic-bezier(.22,1,.36,1)',
        shimmer: 'shimmer 2s infinite'
      },
    },
  },
  plugins: [],
}
