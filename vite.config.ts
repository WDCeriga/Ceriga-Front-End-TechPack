import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  optimizeDeps: {
    include: ["@emotion/react", "@emotion/styled", "@mui/material/Tooltip"],
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    tsconfigPaths(),
  ],
  build: {
    outDir: "dist",
  },
  server: {
    host: "192.168.1.9",
    port: 5173,
    proxy: {
      "/public": {
        target: "http://192.168.1.9:4000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/public/, ""),
      },

      "/api": {
        target: "http://192.168.1.9:4000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
