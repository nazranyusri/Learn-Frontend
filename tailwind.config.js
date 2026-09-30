/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Core Dark System Palette
        core: {
          bg: '#0B0E14', // Main app background (pure depth)
          surface: '#161A22', // Component cards, text modules, and widgets
          elevation: '#202632', // Hover states, dropdowns, and modal dialogs
          stroke: '#2A3241', // Grid lines, dividers, and borders
          input: '#0F141C', // Inset fields inside cards and elevated surfaces
        },
        // High-Contrast Typography System
        text: {
          primary: '#EAECEF', // Maximum legibility for prices, balances, and tickers
          secondary: '#848E9C', // Lower priority labels, timestamps, and captions
          muted: '#474D57', // Disabled states and placeholder text
        },
        // Functional Action & Market Sentiment Colors
        bull: {
          DEFAULT: '#0ECB81', // Neon green for price increases and buy orders
          hover: '#05B372',
          glow: 'rgba(14, 203, 129, 0.15)',
        },
        bear: {
          DEFAULT: '#F6465D', // Electric red for price drops and sell orders
          hover: '#E0314A',
          glow: 'rgba(246, 70, 93, 0.15)',
        },
        accent: {
          primary: {
            DEFAULT: '#3182CE', // Cyber blue for interactive buttons, tabs, and links
            hover: '#2B6CB0',
          },
          secondary: {
            DEFAULT: '#202632', // Grayish for secondary actions and less prominent buttons
            hover: '#2A3241',
          },
        },
      },
      fontFamily: {
        // Mono fonts are highly recommended for aligned pricing columns and charts
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'ui-monospace',
          'SFMono-Regular',
          'monospace',
        ],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Subtle glows for active chart elements or trading actions
        'bull-glow': '0 0 12px 2px rgba(14, 203, 129, 0.25)',
        'bear-glow': '0 0 12px 2px rgba(246, 70, 93, 0.25)',
      },
    },
  },
  plugins: [],
};
