import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'background-blur': 'pulseBlur 8s infinite alternate',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out'
      },
      keyframes: {
        pulseBlur: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#ffffff",
            foreground: "#11181C",
            primary: {
              DEFAULT: "#006FEE",
              foreground: "#ffffff",
            },
            secondary: {
              DEFAULT: "#9353D3",
              foreground: "#ffffff",
            },
            success: {
              DEFAULT: "#17C964",
              foreground: "#ffffff",
            },
            warning: {
              DEFAULT: "#F5A524",
              foreground: "#ffffff",
            },
            danger: {
              DEFAULT: "#F31260",
              foreground: "#ffffff",
            },
            content1: "#f4f4f5",
            content2: "#e4e4e7",
          }
        },
        dark: {
          colors: {
            background: "#121212",
            foreground: "#ECEDEE",
            primary: {
              DEFAULT: "#006FEE",
              foreground: "#ffffff",
            },
            secondary: {
              DEFAULT: "#9353D3",
              foreground: "#ffffff",
            },
            success: {
              DEFAULT: "#17C964",
              foreground: "#ffffff",
            },
            warning: {
              DEFAULT: "#F5A524",
              foreground: "#ffffff",
            },
            danger: {
              DEFAULT: "#F31260",
              foreground: "#ffffff",
            },
            content1: "#27272a",
            content2: "#3f3f46",
          }
        }
      }
    })
  ],
};