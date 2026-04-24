/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "c-1390": "86.0625rem", // 1390px
        "c-1315": "82.1875rem", // 1315px
      },
      fontSize: {
        hero: ["3.5rem", { lineHeight: "1.2" }],
      },
      colors: {
        primary: "#3b82f6", // blue-500
        stroke: "#e5e7eb", // gray-200
        strokedark: "#374151", // gray-700
        blackho: "#1f2937", // gray-800
        btndark: "#1f2937", // gray-800
        titlebg: "#dbeafe", // blue-100
        titlebgdark: "#1e3a8a", // blue-900
      },
      animation: {
        right: "right 1s ease-in-out",
      },
      keyframes: {
        right: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
