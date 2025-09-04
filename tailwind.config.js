/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        // Add this new section to reduce font sizes
        fontSize: {
          'xs': '0.9rem',
          'sm': '1rem',
          'base': '1.1rem',
          'lg': '1.1rem',
          'xl': '1.2rem',
          '2xl': '1.3rem',
          '3xl': '1.5rem',
          '4xl': '1.75rem',
        },
        // You can also add this new section to reduce spacing
        spacing: {
          '1': '0.125rem',
          '2': '0.25rem',
          '3': '0.375rem',
          '4': '0.5rem',
          '5': '0.625rem',
          '6': '0.75rem',
          '8': '1rem',
          '10': '1.25rem',
          '12': '1.7rem',
          '16': '2rem',
          '20': '2.5rem',
          '24': '3rem',
        },
        keyframes: {
          line: {
            '0%': { opacity: '0', transform: 'translateY(100%)' },
            '10%': { opacity: '1' },
            '100%': { opacity: '0', transform: 'translateY(-100%)' },
          },
          gradientX: {
            '0%': { backgroundPosition: '0% 50%' },
            '100%': { backgroundPosition: '200% 50%' },
          },
          
          
        },
        animation: {
          line: 'line 3s linear infinite',
          gradientX: 'gradientX 6s ease infinite',
        },
        backgroundSize: {
          '200': '200% 200%',
        },
      },
    },
    plugins: [],
  };