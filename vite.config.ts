import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.woff", "**/*.woff2"], // Add font files
  base: "",
  plugins: [
    // analyzer({
    //   summary: true,
    // }),

    react(),
  ],
});
