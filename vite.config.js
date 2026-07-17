import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // layout dependent variant
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
