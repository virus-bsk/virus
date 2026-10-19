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
      rollupOptions: {
        output: {
          // Manual chunk strategy: group related modules
          manualChunks: (id) => {
            // Vendor groupings for node_modules packages. These MUST run
            // before the node_modules skip below, otherwise they never apply.
            // firebase submodules
            if (id.includes("firebase/auth")) return "firebase-auth";
            if (id.includes("firebase/firestore")) return "firebase-firestore";
            if (id.includes("firebase/analytics")) return "firebase-analytics";
            if (id.includes("firebase/storage")) return "firebase-storage";

            // Heavily-weighted libraries. jspdf/html2canvas/@google/genai are
            // only ever loaded via dynamic import, so their chunks stay lazy.
            if (id.includes("@google/genai")) return "vendor-google-genai";
            if (id.includes("jspdf")) return "vendor-jspdf";
            if (id.includes("html2canvas")) return "vendor-html2canvas";
            if (id.includes("react-icons")) return "vendor-react-icons";
            if (id.includes("highlight.js")) return "vendor-highlight";

            // react-router
            if (id.includes("react-router-dom")) return "vendor-react-router";

            // Skip remaining external modules; the path-based groups below
            // must never match files inside node_modules.
            if (id.includes("node_modules")) return;

            // Group data directories
            if (id.includes("data/")) {
              if (id.includes("companyInterviews")) return "company-interviews";
              if (id.includes("dsa")) return "data-dsa";
              if (id.includes("reactive-programming")) return "data-reactive";
              if (id.includes("kafka")) return "data-kafka";
              if (id.includes("sql")) return "data-sql";
              if (id.includes("microservices")) return "data-microservices";
              if (id.includes("java")) return "data-java";
              if (id.includes("maang")) return "data-maang";
            }

            // Group pages
            if (id.includes("pages/CompanyInterview")) return "company-interview";
            if (id.includes("pages/ResumeBuilderPage")) return "resume-builder";
            if (id.includes("pages/InterviewPrep")) return "interview-prep";
            if (id.includes("pages/Profile")) return "profile";
            if (id.includes("pages/Payment")) return "payment";
            if (id.includes("pages/Admin")) return "admin";

            // Group components
            if (id.includes("components/ResumeBuilder")) return "resume-builder-core";
            if (id.includes("components/AdminJobs")) return "admin-jobs";
            if (id.includes("components/AdminUsers")) return "admin-users";
            if (id.includes("components/AdminPricing")) return "admin-pricing";
            if (id.includes("components/AdminClineModels")) return "admin-cline-models";

            // Group feature pages
            if (id.includes("system-design")) return "system-design";
            if (id.includes("maang/basic-dsa")) return "maang-dsa";
            if (id.includes("maang/reactive")) return "reactive-deep-dive";
            if (id.includes("maang/ai-ml")) return "maang-ai-ml";
            if (id.includes("maang/system-design/advance")) return "system-design-advance";
            if (id.includes("maang/weeks")) return "maang-weekly";
            if (id.includes("topics")) {
              if (id.includes("DSACourse")) return "dsa-course";
              if (id.includes("DSALeetcode")) return "leetcode";
              if (id.includes("JavaCourse")) return "java-course";
              if (id.includes("SpringBootCourse")) return "spring-boot";
              if (id.includes("ReactJSCourse")) return "react-course";
              if (id.includes("MicroservicesCourse")) return "microservices";
              if (id.includes("KafkaCourse")) return "kafka";
              if (id.includes("LLMCourse")) return "llm";
            }
          },
        },
      },
    },
  };
});
