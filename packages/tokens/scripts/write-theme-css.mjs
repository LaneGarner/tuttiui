// Emits dist/theme.css from the built token module, so the stylesheet and the
// TypeScript objects can never disagree. Run by tsup's onSuccess hook.
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dist = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const { buildThemeCss } = await import(join(dist, "index.mjs"));

const out = join(dist, "theme.css");
await writeFile(out, buildThemeCss(), "utf8");
console.log(`theme.css -> ${out}`);
