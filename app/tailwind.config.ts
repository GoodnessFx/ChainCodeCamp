import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Safety Orange — primary brand
        primary: {
          DEFAULT: "#ff4d00",
          dark: "#cc3d00",
          light: "#fff0eb",
        },
        // Blueprint Blue — secondary
        secondary: {
          DEFAULT: "#2a4ad0",
        },
        // Paper/Ink — light theme base
        ink: "#1a1a1a",
        paper: "#f8f7f4",
        // Sidebar
        "sidebar-bg": "#f0efe9",
        // Status
        success: "#008556",
        error: "#d70000",
      },
      fontFamily: {
        heading: ["Outfit", "sans-serif"],
        body: ["IBM Plex Serif", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        hard: "4px 4px 0px #1a1a1a",
        "hard-lg": "8px 8px 0px #1a1a1a",
        "hard-hover": "2px 2px 0px #1a1a1a",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#1a1a1a",
            fontFamily: "IBM Plex Serif, serif",
            "h1, h2, h3, h4": {
              fontFamily: "Outfit, sans-serif",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
            },
            code: {
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.875em",
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
