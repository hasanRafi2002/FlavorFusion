






/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include all source files for class extraction
    "./src/components/ui/**/*.{js,ts,jsx,tsx}", // Include custom UI components
  ],
  theme: {
  	extend: {
  		colors: {
  			cardBg: '#f8fafc',
  			alertError: '#f87171',
  			alertSuccess: '#34d399'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
      fontFamily: {
        sans: ['Inconsolata', 'monospace'], // Override Tailwind's default sans font
      },
  	}
  },
  darkMode: ['class'], // Enable class-based dark mode
  plugins: [
    require('daisyui'), // Include DaisyUI for pre-built UI components
      require("tailwindcss-animate")
],
  daisyui: {
    themes: [
      "light", // Default light theme
      // "dark",  // Optional dark theme
    ],
  },
};
