import { defineConfig } from "vitest/config";

// Config separada do vite.config.ts: o plugin do React Router não deve rodar nos testes.
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["app/**/*.test.{ts,tsx}"],
  },
});
