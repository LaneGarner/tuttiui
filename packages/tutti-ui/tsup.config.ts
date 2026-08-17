import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/react.ts", "src/tokens.ts", "src/tailwind.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  external: [
    "@tutti-ui/react",
    "@tutti-ui/react/tailwind",
    "@tutti-ui/tokens",
    "react",
    "react-dom",
    "tailwindcss",
  ],
});
