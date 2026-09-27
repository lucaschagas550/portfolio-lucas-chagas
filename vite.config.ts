import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    // SVGs (ícones de tecnologia) viram arquivos próprios em vez de data: URIs
    // dentro do JS: saem do bundle da hidratação e ficam em cache.
    assetsInlineLimit: (file) => (file.endsWith(".svg") ? false : undefined),
  },
});
