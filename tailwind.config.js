/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
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
