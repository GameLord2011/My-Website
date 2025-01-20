import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        '2xs': '100px',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "Gween": {
          300: "hsl(120, 99.05%, 41.18%)",
          600: "hsl(120, 100%, 19.61%)"
        }
      },
      backgroundImage: {
        'svgimg': 'url(\'https://github-readme-stats.vercel.app/api?username=GameLord2011&theme=shadow_green&show_icons=true&rank_icon=github\')',
        'rainbow': 'radial-gradient(circle, hsl(0, 100%, 50%) 0%, hsl(38.82, 100%, 50%) 16%, hsl(60, 100%, 50%) 32%, hsl(120, 100%, 50%) 48%, hsl(240, 100%, 50%) 64%, hsl(274.62, 100%, 25.49%) 80%, hsl(300, 100%, 25.1%) 100%);',
      }
    },
  },
  plugins: [],
} satisfies Config;
