import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/react.ts", "src/tokens.ts", "src/tailwind.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  external: [
    "@tuttiui/react",
    "@tuttiui/react/tailwind",
    "@tuttiui/tokens",
    "react",
    "react-dom",
    "tailwindcss",
  ],
});
