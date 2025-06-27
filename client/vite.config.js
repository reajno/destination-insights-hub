import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jsconfigPaths from "vite-jsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss(), jsconfigPaths()],
  server: {
    port: 5173,
  },
  build: {
    outDir: "dist",
  },
  // 👇 This is the key part for React Router to work on refresh
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  define: {
    "process.env": {},
  },
  base: "/",
});
