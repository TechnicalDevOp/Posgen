import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      theme: {
  extend: {
    colors: {
      posgen: {
        red: "#C62828",
        green: "#2E7D32",
        gold: "#F4A261",
        black: "#0B0F14",
        dark: "#111827",
        white: "#FFFFFF",
      },
          },
          fontFamily: {
            display: ['"Playfair Display"', "serif"],
            body: ["Poppins", "sans-serif"],
          },
        },
      },
    }),
  ],
});


  