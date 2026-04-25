/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        saffron: {
          50:  '#fff8ec',
          100: '#ffefd0',
          200: '#ffd89b',
          300: '#ffbc5e',
          400: '#ff9d2d',
          500: '#f97e07',
          600: '#dd5f02',
          700: '#b74306',
          800: '#94350c',
          900: '#782d0d',
        },
        ember: '#E63027',
        ink:   '#1A1208',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans:    ['"DM Sans"', 'sans-serif'],
        script:  ['Caveat', 'cursive'],
      },
      animation: {
        'float':      'float 3s ease-in-out infinite',
        'ticker':     'ticker 20s linear infinite',
        'spin-slow':  'spin 20s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        ticker: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,157,45,0.4)' },
          '50%':      { boxShadow: '0 0 40px rgba(255,157,45,0.7)' },
        },
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
};
