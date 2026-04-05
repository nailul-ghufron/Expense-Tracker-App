import forms from '@tailwindcss/forms'
import containerQueries from '@tailwindcss/container-queries'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "inverse-on-surface": "#f0f1f2",
        "primary-container": "#0056d2",
        "tertiary": "#00522c",
        "error-container": "#ffdad6",
        "on-tertiary-container": "#66f29e",
        "on-secondary-fixed": "#0f1c2d",
        "on-surface-variant": "#424654",
        "inverse-primary": "#b2c5ff",
        "on-secondary-fixed-variant": "#3b485a",
        "on-primary-fixed-variant": "#0040a1",
        "on-tertiary-fixed": "#00210e",
        "primary": "#0040a1",
        "surface": "#f8f9fa",
        "secondary": "#525f73",
        "on-background": "#191c1d",
        "tertiary-container": "#006d3c",
        "on-surface": "#191c1d",
        "surface-dim": "#d9dadb",
        "inverse-surface": "#2e3132",
        "tertiary-fixed-dim": "#51df8e",
        "on-primary-fixed": "#001847",
        "surface-bright": "#f8f9fa",
        "surface-tint": "#0056d2",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
        "surface-container-highest": "#e1e3e4",
        "secondary-fixed-dim": "#bac7de",
        "surface-variant": "#e1e3e4",
        "primary-fixed-dim": "#b2c5ff",
        "surface-container": "#edeeef",
        "primary-fixed": "#dae2ff",
        "on-secondary": "#ffffff",
        "on-primary-container": "#ccd8ff",
        "outline": "#737785",
        "surface-container-low": "#f3f4f5",
        "on-tertiary-fixed-variant": "#00522c",
        "surface-container-high": "#e7e8e9",
        "error": "#ba1a1a",
        "on-primary": "#ffffff",
        "on-secondary-container": "#586579",
        "background": "#f8f9fa",
        "surface-container-lowest": "#ffffff",
        "secondary-fixed": "#d6e3fb",
        "secondary-container": "#d6e3fb",
        "tertiary-fixed": "#70fda7",
        "outline-variant": "#c3c6d6",
        "on-tertiary": "#ffffff"
      },
      "borderRadius": {
        "DEFAULT": "1rem",
        "lg": "2rem",
        "xl": "3rem",
        "full": "9999px"
      },
      "fontFamily": {
        "headline": ["Manrope", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Inter", "sans-serif"]
      },
      "keyframes": {
        "fade-in": {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      "animation": {
        "fade-in": "fade-in 0.3s ease-out forwards",
      }
    },
  },
  plugins: [
    forms,
    containerQueries
  ],
}

