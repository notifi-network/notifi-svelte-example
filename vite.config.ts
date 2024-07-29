import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import GlobalPolyFill from "@esbuild-plugins/node-globals-polyfill";
import { resolve } from "path";

export default defineConfig({
  plugins: [sveltekit()],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        // @ts-ignore
        GlobalPolyFill.default({
          buffer: true,
        }),
      ],
    },
  },
  resolve: {
    alias: {
      "@toruslabs/openlogin": resolve(
        "./node_modules/@toruslabs/openlogin/dist/openlogin.umd.min.js"
      ),
    },
  },
});
