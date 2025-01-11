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
        "Gween": {
          300: "#01d101",
          600: "#006400"
        }
      },
      backgroundImage: {
        'svgimg': 'url(\'https://github-readme-stats.vercel.app/api?username=GameLord2011&theme=shadow_green&show_icons=true&rank_icon=github\')',
        'rainbow': 'radial-gradient(circle, rgb(255, 0, 0) 0%, rgb(255, 165, 0) 16%, rgb(255, 255, 0) 32%, rgb(0, 255, 0) 48%, rgb(0, 0, 255) 64%, rgb(75, 0, 130) 80%, rgb(128, 0, 128) 100%);',
      }
    },
  },
  plugins: [],
} satisfies Config;
