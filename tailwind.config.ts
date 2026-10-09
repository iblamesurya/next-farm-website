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
        brand: {
          yellow: "#FFD200", // Sunburst Yellow
          teal: "#004B50",   // Prussian Blue / Marine Teal
          navy: "#002B5B",   // Admiral Blue
          white: "#FFFFFF",  // Pure White
          light: "#F4F7F8",  // Pond Light Gray
          dark: "#1A1F24",   // High-readability Dark
          muted: "#4A5568",  // Muted Gray
        },
        "sunburst-yellow": "#FFD200",
        "prussian-blue": "#004B50",
        "admiral-blue": "#002B5B",
        "pure-white": "#FFFFFF",
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        body: ["var(--font-open-sans)", "Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
