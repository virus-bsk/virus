import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), "");
  const basePath = env.VITE_BASE_PATH || "/";

  // Cline API key for local dev proxy (never commit this)
  const clineApiKey = env.VITE_CLINEC_API_KEY;

  return {
    base: basePath,
    plugins: [react()],

    server: {
      watch: {
        // Polling avoids Windows EBUSY file watch errors on locked files
        usePolling: true,
        interval: 1000,
      },
      // Proxy Cline API calls through localhost to avoid CORS blocking
      proxy: {
        "/api/cline": {
          target: "https://api.cline.bot/api/v1",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api\/cline/, ""),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              if (clineApiKey) {
                proxyReq.setHeader("Authorization", `Bearer ${clineApiKey}`);
              }
              proxyReq.setHeader("HTTP-Referer", "http://localhost:5173");
              proxyReq.setHeader("X-Title", "bskcoding");
            });
          },
        },
      },
    },

    build: {
      chunkSizeWarningLimit: 1000,
    },
  };
});
