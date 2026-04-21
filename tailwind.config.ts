/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-kanit)"],
        sans: ["var(--font-kanit)"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        success: "hsl(var(--success))",
        // LEARNEY Bright Psychology custom colors
        "primary-pink": "#FF6FAE",
        "secondary-purple": "#A78BFA",
        "accent-yellow": "#FFD86B",
        "mint-support": "#8EE3C2",
        "sky-blue": "#8BCBFF",
        "soft-peach": "#FFC9A9",
        "bg-main": "#FFFDFB",
        "bg-card": "#FFFFFF",
        "bg-section": "#FFF5FB",
        "bg-alternate": "#F6F4FF",
        "bg-highlight": "#FFF8E7",
        "text-main": "#2D2A3A",
        "text-secondary": "#6B6880",
        "text-light": "#9A97AE",
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        // LEARNEY Psychology Gradients
        "hero-gradient":
          "linear-gradient(135deg, #FF9BC6 0%, #C7A8FF 45%, #8BCBFF 100%)",
        "psychology-gradient":
          "linear-gradient(135deg, #FFD86B 0%, #FFB3D1 40%, #B9A7FF 100%)",
        "calm-gradient":
          "linear-gradient(135deg, #FDFBFF 0%, #F7F1FF 45%, #EEF9FF 100%)",
        "button-gradient": "linear-gradient(90deg, #FF6FAE 0%, #A78BFA 100%)",
        "button-hover": "linear-gradient(90deg, #FF5DA4 0%, #8E73F5 100%)",
        "orb-pink":
          "radial-gradient(circle, rgba(255,111,174,0.25) 0%, rgba(255,111,174,0) 70%)",
        "orb-purple":
          "radial-gradient(circle, rgba(167,139,250,0.22) 0%, rgba(167,139,250,0) 70%)",
        "orb-yellow":
          "radial-gradient(circle, rgba(255,216,107,0.18) 0%, rgba(255,216,107,0) 70%)",
      },
    },
  },
  plugins: [],
  prefix: "tw-",
  darkMode: "class",
  future: {
    hoverOnlyWhenSupported: true,
  },
};

export default config;
