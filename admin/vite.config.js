import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import http from "node:http";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function autoBackendPlugin() {
  let serverProcess = null;

  const isServerRunning = () => {
    return new Promise((resolve) => {
      const req = http.get("http://127.0.0.1:5000/api/health", (res) => {
        resolve(res.statusCode === 200);
      });
      req.on("error", () => resolve(false));
      req.setTimeout(800, () => {
        req.destroy();
        resolve(false);
      });
    });
  };

  return {
    name: "auto-backend-server",
    async configureServer() {
      const running = await isServerRunning();
      if (!running) {
        console.log("\n[SkyWardens CMS] API Server on port 5000 not responding. Auto-starting CMS backend server...");
        const serverScript = path.resolve(__dirname, "../server/server.js");
        serverProcess = spawn(process.execPath, [serverScript], {
          cwd: path.resolve(__dirname, "../server"),
          stdio: "inherit",
          env: { ...process.env, PORT: "5000" },
        });

        serverProcess.on("error", (err) => {
          console.error("[SkyWardens CMS] Auto-start backend error:", err.message);
        });
      } else {
        console.log("[SkyWardens CMS] CMS Backend Server on port 5000 is online and operational.");
      }

      const cleanup = () => {
        if (serverProcess) {
          try {
            serverProcess.kill();
          } catch (_) {}
        }
      };

      process.on("exit", cleanup);
      process.on("SIGINT", cleanup);
      process.on("SIGTERM", cleanup);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), autoBackendPlugin()],
  server: {
    port: 5174,
    strictPort: false,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/uploads": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/images": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
