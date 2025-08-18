import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores principais da marca AutoProtecta
        'smoky-black': '#0C0C0C',        // Pantone Black 6 C
        'orioles-orange': '#FB4516',      // Pantone 172 C
        'platinum': '#E2E2E2',            // Pantone 663 C
        
        // Variações das cores principais
        'smoky-black-light': '#1A1A1A',
        'smoky-black-lighter': '#2A2A2A',
        'orioles-orange-dark': '#E63E14',
        'orioles-orange-light': '#FF6B35',
        'platinum-dark': '#D0D0D0',
        'platinum-light': '#F5F5F5',
        
        // Cores de estado
        'success': '#28A745',
        'warning': '#FFC107',
        'error': '#DC3545',
        'info': '#17A2B8',
      },
      fontFamily: {
        'satoshi': ['Satoshi', 'sans-serif'],
        'denominary': ['Denominary', 'serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'pulse': 'pulse 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
