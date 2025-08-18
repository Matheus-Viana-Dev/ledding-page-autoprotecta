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
        'smoky-black': '#0C0C0C',
        'orioles-orange': '#FB4516',
        'platinum': '#E2E2E2',
        'smoky-black-light': '#1A1A1A',
        'orioles-orange-dark': '#E63E14',
        'platinum-light': '#F5F5F5',
        'smoky-black-dark': '#050505',
        'orioles-orange-light': '#FF6B3D',
        'platinum-dark': '#C8C8C8',
        'success': '#10B981',
        'warning': '#F59E0B',
        'error': '#EF4444',
        'info': '#3B82F6'
      },
      fontFamily: {
        'satoshi': ['Satoshi', 'sans-serif'],
        'denominary': ['Denominary', 'serif'],
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'slideInLeft': 'slideInLeft 0.6s ease-out',
        'slideInRight': 'slideInRight 0.6s ease-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        slideInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        }
      }
    },
  },
  plugins: [],
};

export default config;
