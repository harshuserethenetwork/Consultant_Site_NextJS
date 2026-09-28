/**
 * Tailwind CSS configuration (shared by every component).
 *
 * IMPORTANT — where the values come from:
 *   • The colors below are CSS variables (e.g. `var(--background)`).
 *   • Those variables are generated from `src/config/site.config.ts` by
 *     `src/lib/theme.ts` and injected into <head> by `src/app/layout.tsx`.
 *   • So to re-brand the whole site you only edit `site.config.ts`.
 *
 * Loading this file from `src/app/globals.css` is done with Tailwind v4's
 * `@config` directive (the v4 way of keeping a JS/TS config file).
 */
import type { Config } from "tailwindcss";

const config: Config = {
  // Dark mode is switched by next-themes, which toggles `.dark` on <html>.
  darkMode: "class",

  theme: {
    // `.container` → centred, responsive side padding, 1280px cap on 2xl.
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },

    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        surface: "var(--surface)",

        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },

        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",

        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },

        // Feedback colours (defined in src/app/globals.css).
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--success-foreground)",
        },
      },

      fontFamily: {
        // The three CSS variables are created by next/font in the root layout.
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: [
          "var(--font-heading)",
          "var(--font-body)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },

      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
        "3xl": "calc(var(--radius) + 12px)",
      },

      keyframes: {
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        // Slow vertical drift for the decorative hero shapes.
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6%)" },
        },
      },

      animation: {
        "fade-in-up": "fade-in-up 0.5s ease-out both",
        marquee: "marquee 40s linear infinite",
        float: "float 9s ease-in-out infinite",
        // Same drift, slower and offset so shapes never move in lockstep.
        "float-slow": "float 15s ease-in-out 1.5s infinite",
      },
    },
  },

  plugins: [],
};

export default config;
