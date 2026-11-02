import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // allow ngrok / tunnel hostnames in dev
  server: { allowedHosts: true },
  preview: { allowedHosts: true },
});
