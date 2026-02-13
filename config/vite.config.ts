import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLibraryMode = mode === "library";

  const baseConfig = {
    plugins: [react()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "../src"),
        "@/components": resolve(__dirname, "../src/components"),
        "@/lib": resolve(__dirname, "../src/lib"),
        "@/assets": resolve(__dirname, "../src/assets"),
      },
    },
    css: {
      postcss: "./config/postcss.config.js",
    },
  };

  if (isLibraryMode) {
    return {
      ...baseConfig,
      plugins: [
        react(),
        dts({
          tsconfigPath: resolve(__dirname, "./tsconfig.lib.json"),
          outDir: resolve(__dirname, "../dist/lib"),
          rollupTypes: true,
        }),
      ],
      build: {
        outDir: resolve(__dirname, "../dist/lib"),
        lib: {
          entry: resolve(__dirname, "../src/lib/index.ts"),
          name: "TrevorUI",
          fileName: format => {
            if (format === "es") return "index.es.js";
            if (format === "cjs") return "index.js";
            return `index.${format}.js`;
          },
          formats: ["es", "cjs"],
        },
        rollupOptions: {
          external: ["react", "react-dom", "react/jsx-runtime"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
            },
          },
        },
        sourcemap: true,
        minify: "esbuild",
        emptyOutDir: true,
      },
      define: {
        "process.env.NODE_ENV": JSON.stringify("production"),
      },
    };
  }

  return {
    ...baseConfig,
    base: "/Listening-Intelligence-My-Personal-Music-Analytics-Dashboard/",
    server: {
      port: 3000,
      open: true,
      cors: true,
    },
    build: {
      outDir: "dist",
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
          },
        },
      },
    },
    optimizeDeps: {
      include: ["react", "react-dom"],
    },
  };
});
