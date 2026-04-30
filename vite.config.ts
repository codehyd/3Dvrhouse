import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": "/src",
    },
  },

  build: {
    target: "esnext",
    modulePreload: {
      polyfill: false,
    },
  },

  preview: {
    headers: {
      "Content-Type": "application/javascript",
    },
  },
});