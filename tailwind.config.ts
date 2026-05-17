import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "system-ui", "-apple-system", "sans-serif"],
        display: ["Pretendard", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Soft pastel record colors (20s-women-friendly palette)
        peach: {
          50: "#FFF5EE",
          100: "#FFE9DC",
          200: "#FFD4B8",
          300: "#FFBE94",
          400: "#FFA571",
          500: "#FF8A4D",
        },
        rose: {
          50: "#FFF1F4",
          100: "#FFE0E8",
          200: "#FFC4D2",
          300: "#FFA5BB",
          400: "#FF7E9F",
          500: "#F95B83",
        },
        lavender: {
          50: "#F4F0FF",
          100: "#E8DFFF",
          200: "#D2C0FF",
          300: "#B8A0FF",
          400: "#9D7CFF",
          500: "#7F58F5",
        },
        mint: {
          50: "#EDFBF5",
          100: "#D4F5E5",
          200: "#A8EBCD",
          300: "#78DEAE",
          400: "#4DD08F",
          500: "#2BBA73",
        },
        butter: {
          50: "#FFFAEA",
          100: "#FFF1C2",
          200: "#FFE48A",
          300: "#FFD557",
          400: "#FFC629",
          500: "#F2B005",
        },
        sky: {
          50: "#EEF7FF",
          100: "#D9ECFF",
          200: "#B0D8FF",
          300: "#7DBFFF",
          400: "#4FA5FF",
          500: "#2487F5",
        },
        // Semantic category colors (use these in components)
        feeding: "#FF8A9E",
        diaper: "#FFB454",
        sleep: "#9D7CFF",
        food: "#FF9F5C",
        medicine: "#E591E0",
        health: "#FF7575",
        growth: "#4DCDA0",
        photo: "#C2A2FF",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
        "3xl": "calc(var(--radius) + 16px)",
      },
      boxShadow: {
        soft: "0 4px 20px -4px rgb(0 0 0 / 0.06), 0 2px 6px -2px rgb(0 0 0 / 0.04)",
        glow: "0 8px 30px -8px rgb(255 138 158 / 0.5)",
        card: "0 2px 12px -2px rgb(0 0 0 / 0.05)",
      },
      backgroundImage: {
        "gradient-warm": "linear-gradient(135deg, #FFE9DC 0%, #FFD4B8 50%, #FFA5BB 100%)",
        "gradient-soft": "linear-gradient(180deg, #FFF5EE 0%, #FFF1F4 100%)",
        "gradient-primary": "linear-gradient(135deg, #FFA5BB 0%, #FF8A9E 100%)",
        "gradient-mesh":
          "radial-gradient(at 20% 10%, #FFE9DC 0px, transparent 50%), radial-gradient(at 80% 30%, #FFE0E8 0px, transparent 50%), radial-gradient(at 30% 80%, #F4F0FF 0px, transparent 50%)",
      },
      keyframes: {
        "slide-up": {
          from: { transform: "translateY(100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
      animation: {
        "slide-up": "slide-up 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        "fade-in": "fade-in 0.2s ease-out",
        "scale-in": "scale-in 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
