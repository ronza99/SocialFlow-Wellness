/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Enhanced Wellness Design System
        'warm-sand': '#F5F0EA',
        'sage-green': '#8FB3A3',
        'misty-teal': '#4FA88F',
        'mocha-mousse': '#A67C5A',
        'soft-apricot': '#F7E6D3',
        'terracotta': '#C65D51',
        // Enhanced contrast colors
        'sage-green-dark': '#7A9B8A',
        'misty-teal-dark': '#3E8A73',
        'mocha-mousse-dark': '#8A5D4A',
        // New accent colors
        'cream-white': '#FEFCF8',
        'dusty-rose': '#E8B4B8',
        'forest-green': '#5A7C65',
        'golden-sand': '#E6D2B5',
      },
      fontFamily: {
        'serif': ['Inter', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'wellness': '20px',
        'organic': '60% 40% 30% 70% / 60% 30% 70% 40%',
        'organic-2': '30% 70% 70% 30% / 30% 30% 70% 70%',
      },
      boxShadow: {
        'wellness': '0 8px 32px rgba(139, 179, 163, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04)',
        'wellness-lg': '0 20px 60px rgba(139, 179, 163, 0.15), 0 8px 24px rgba(0, 0, 0, 0.06)',
        'wellness-xl': '0 32px 80px rgba(139, 179, 163, 0.2), 0 12px 32px rgba(0, 0, 0, 0.08)',
        'organic': '0 10px 25px -5px rgba(139, 179, 163, 0.1), 0 20px 40px -10px rgba(139, 179, 163, 0.05)',
        'organic-lg': '0 20px 40px -10px rgba(139, 179, 163, 0.15), 0 30px 60px -20px rgba(139, 179, 163, 0.1)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(139, 179, 163, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      fontSize: {
        'mobile-xl': ['1.25rem', { lineHeight: '1.75rem' }],
        'mobile-2xl': ['1.5rem', { lineHeight: '2rem' }],
        'mobile-3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        'mobile-4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'organic-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238FB3A3' fill-opacity='0.03'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};