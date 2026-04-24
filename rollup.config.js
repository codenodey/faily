import { defineConfig } from "rollup";

export default defineConfig({
  input: "src/index.js",
  output: [
    {
      file: "dist/index.js",
      format: "esm"
    },
    {
      file: "dist/index.cjs",
      format: "cjs",
      exports: "named"
    }
  ]
});