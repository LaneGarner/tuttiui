import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  // theme.css is generated from the built module rather than checked in, so the
  // stylesheet can't drift from the token objects.
  onSuccess: "node scripts/write-theme-css.mjs",
});
