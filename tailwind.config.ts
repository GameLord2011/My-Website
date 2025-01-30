import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        Gween: {
          300: "hsl(120, 99.05%, 41.18%)",
          600: "hsl(120, 100%, 19.61%)",
        },
      },
      backgroundImage: {
        svgimg:
          "url('https://github-readme-stats.vercel.app/api?username=GameLord2011&theme=shadow_green&show_icons=true&rank_icon=github')",
      },
      screens: {
        jio2: "240px",
        bz30: "360px",
      },
    },
  },
  plugins: [],
} satisfies Config;
