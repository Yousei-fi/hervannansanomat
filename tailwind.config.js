import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
  content: [
    './views/**/*.twig',
    './*.php',
    './src/**/*.{js,jsx,ts,tsx,twig}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          white: '#ffffff',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'soft': '1rem',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [forms, typography],
};

