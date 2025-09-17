import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".");
  return {
    plugins: [react()],
    define: {
      "process.env.APIKEY": JSON.stringify(env.GEMINI_APIKEY),
      "process.env.GEMINI_APIKEY": JSON.stringify(env.GEMINI_APIKEY),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
  };
});
