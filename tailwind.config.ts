import type { Config } from "tailwindcss";

const svgToDataUri = require("mini-svg-data-uri");
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette").default;

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./mdx-components.tsx",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0A0A0F',
          800: '#12121A',
          700: '#1A1A25',
          600: '#22222F',
          500: '#2A2A3A',
          400: '#3A3A4C',
          300: '#4A4A5F',
          200: '#6A6A7F',
          100: '#8A8A9F',
        },
        accent: {
          900: '#0C4A6E',
          800: '#075985',
          700: '#0369A1',
          600: '#0284C7',
          500: '#0EA5E9',
          400: '#38BDF8',
          300: '#7DD3FC',
          200: '#BAE6FD',
          100: '#E0F2FE',
        },
      },
      backgroundSize: {
        '200%': '200% auto',
      },
      animation: {
        'text-shimmer': 'text-shimmer 2.5s ease-out infinite alternate',
        'gradient-shift': 'gradient-shift 4s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s ease-out forwards',
      },
      keyframes: {
        'text-shimmer': {
          from: { 'background-position': '0 0' },
          to: { 'background-position': '-200% 0' },
        },
        'gradient-shift': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'shimmer': {
          '0%': { 'background-position': '200% center' },
          '100%': { 'background-position': '-200% center' },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: '500',
            },
            '[class~="lead"]': {
              color: 'inherit',
            },
            strong: {
              color: 'inherit',
            },
            'ul > li': {
              position: 'relative',
            },
            hr: {
              borderColor: 'inherit',
              opacity: 0.1,
            },
            blockquote: {
              borderLeftColor: 'inherit',
              opacity: 0.8,
            },
            h1: {
              color: 'inherit',
            },
            h2: {
              color: 'inherit',
            },
            h3: {
              color: 'inherit',
            },
            h4: {
              color: 'inherit',
            },
            'figure figcaption': {
              color: 'inherit',
              opacity: 0.8,
            },
            code: {
              color: 'inherit',
              backgroundColor: 'rgb(var(--gray-100))',
            },
            'a code': {
              color: 'inherit',
            },
            pre: {
              color: 'var(--gray-200)',
              backgroundColor: 'rgb(var(--gray-900))',
            },
            thead: {
              color: 'inherit',
              borderBottomColor: 'inherit',
            },
            'tbody tr': {
              borderBottomColor: 'inherit',
              opacity: 0.8,
            },
          },
        },
      },
    },
  },
  plugins: [
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-dot-thick": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
    require('@tailwindcss/typography'),
  ],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": {
      ...newVars,
      "--background": "#0a0a0a",
      "--foreground": "#ededed",
    },
  });
}

export default config;
