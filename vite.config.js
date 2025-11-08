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
            postgen: {
              gold: "#D8B56A",
              charcoal: "#0C0C0C",
              sand: "#F5F2E7",
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
