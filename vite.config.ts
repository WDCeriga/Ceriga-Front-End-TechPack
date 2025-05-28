import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import react from "@vitejs/plugin-react";
import routes from "./src/routes";

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
    // host: "192.168.1.5",
    port: 5173,
    proxy: {
      "/public": {
        target: routes.server.base,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/public/, ""),
      },

      "/api": {
        target: routes.server.base,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
