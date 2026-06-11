/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-space-grotesk)", "Space Grotesk", "system-ui", "sans-serif"],
        body: ["var(--font-rubik)", "Rubik", "-apple-system", "system-ui", "sans-serif"],
      },
      colors: {
        // DESIGN.md navy adaptation tokens
        "canvas-dark":  "#0c1f3f",
        "canvas-night": "#08172e",
        "canvas-light": "#ffffff",
        "canvas-press": "#f0f2f5",
        "navy":         "#0c1f3f",
        "navy-mid":     "#2d5a8e",
        "hairline-navy":"#1e3a5f",
        "hairline-cloud":"#e5e7eb",
      },
      maxWidth: {
        "c-1152": "72rem", // 1152px — DESIGN.md container
        "c-1390": "86.0625rem",
      },
      borderRadius: {
        "xxl": "18px",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};
