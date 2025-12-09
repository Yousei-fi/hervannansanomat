import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
  content: [
    './views/**/*.twig',
    './*.php',
    './src/**/*.{js,jsx,ts,tsx,twig}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.25rem',
      screens: {
        lg: '1024px',
        xl: '1200px',
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        brand: {
          green: '#86bc24',
          dark: '#1f1d18',
          light: '#f7f8f4',
          sand: '#e9e6dc',
          smoke: '#f3f4f6',
        },
        ink: {
          DEFAULT: '#111827',
          soft: '#4b5563',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        soft: '1rem',
      },
      boxShadow: {
        soft: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        card: '0 16px 40px -16px rgba(17, 24, 39, 0.20)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.ink.DEFAULT'),
            a: {
              color: theme('colors.brand.green'),
              fontWeight: '600',
              '&:hover': { color: theme('colors.brand.dark') },
            },
            h1: { color: theme('colors.brand.dark') },
            h2: { color: theme('colors.brand.dark') },
            h3: { color: theme('colors.brand.dark') },
            strong: { color: theme('colors.brand.dark') },
            blockquote: {
              borderLeftColor: theme('colors.brand.green'),
            },
          },
        },
      }),
    },
  },
  plugins: [forms, typography],
};

