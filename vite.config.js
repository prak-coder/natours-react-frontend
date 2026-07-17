import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // layout dependent variant
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Intercepts any request starting with /api
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
