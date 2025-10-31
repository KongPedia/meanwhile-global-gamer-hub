import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import ViteYaml from '@modyfi/vite-plugin-yaml';


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    ViteYaml(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
