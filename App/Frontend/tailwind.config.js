// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        // Redefine colors for a LIGHT theme
        'primary-blue': '#0078D4',     // Microsoft Blue (Stays the same for actions)
        'light-bg': '#F3F4F6',        // Overall background (Very light gray)
        'light-surface': '#FFFFFF',    // Component background (Pure white)
        'dark-text': '#1F2937',        // Main body text (Dark gray/black)
        'secondary-text': '#6B7280',   // Secondary text (Medium gray)
        'light-border': '#E5E7EB',     // Border color
        'accent-green': '#3CB462',     // For success/positive metrics
        'accent-red': '#E81123',       // For warnings/negative metrics
      },
      fontFamily: {
        sans: ['Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}