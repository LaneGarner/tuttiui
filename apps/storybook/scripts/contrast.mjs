/**
 * WCAG contrast harness.
 *
 * Jest can't do this: the component tests run in jsdom with no stylesheet, so
 * `getComputedStyle` returns nothing meaningful because Tailwind never ran and
 * the CSS variables were never resolved. Contrast is only measurable in a real
 * browser against the real bundle, which is what this does — it loads the
 * "Every Surface" story in both themes, resolves every foreground against the
 * background actually painted behind it, and computes the ratio.
 *
 * This is the only check in the repo that could have caught the bug that
 * started all of this: a design system shipping text at 1.28:1.
 *
 *   node scripts/contrast.mjs [--serve-only]
 */
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, extname, normalize } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "storybook-static");
const PORT = Number(process.env.CONTRAST_PORT ?? 6199);

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
};

const serve = () =>
  new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      try {
        const url = new URL(req.url, "http://x");
        let file = join(root, normalize(decodeURIComponent(url.pathname)));
        if ((await stat(file)).isDirectory()) file = join(file, "index.html");
        res.writeHead(200, {
          "content-type": MIME[extname(file)] ?? "application/octet-stream",
        });
        res.end(await readFile(file));
      } catch {
        res.writeHead(404).end("not found");
      }
    });
    server.listen(PORT, () => resolve(server));
  });

// --- WCAG math -------------------------------------------------------------

const parseColor = (c) => {
  const n = (c.match(/[\d.]+/g) ?? []).map(Number);
  return { r: n[0] ?? 0, g: n[1] ?? 0, b: n[2] ?? 0, a: n[3] ?? 1 };
};

const relativeLuminance = ({ r, g, b }) => {
  const f = (v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};

const contrast = (fg, bg) => {
  const [hi, lo] = [relativeLuminance(fg), relativeLuminance(bg)].sort(
    (a, b) => b - a
  );
  return (hi + 0.05) / (lo + 0.05);
};

// --- in-page probe ---------------------------------------------------------

const collect = () =>
  // Runs inside the browser. Walks every text-bearing element, composites the
  // effective background by climbing ancestors through transparent layers, and
  // reports the resolved rgb() pairs for scoring outside.
  Array.from(document.querySelectorAll("*"))
    .filter((el) => {
      const text = Array.from(el.childNodes).some(
        (n) => n.nodeType === 3 && n.textContent.trim().length > 1
      );
      const box = el.getBoundingClientRect();
      return text && box.width > 0 && box.height > 0;
    })
    .map((el) => {
      const style = getComputedStyle(el);
      const layers = [];
      for (let node = el; node; node = node.parentElement) {
        const c = getComputedStyle(node).backgroundColor;
        const m = (c.match(/[\d.]+/g) ?? []).map(Number);
        const alpha = m.length > 3 ? m[3] : 1;
        if (alpha > 0) {
          layers.push(c);
          if (alpha === 1) break;
        }
      }
      const size = parseFloat(style.fontSize);
      const weight = Number(style.fontWeight) || 400;
      return {
        label:
          el.getAttribute("data-probe") ??
          `${el.tagName.toLowerCase()}${el.getAttribute("data-variant") ? `[${el.getAttribute("data-variant")}]` : ""}: ${el.textContent.trim().slice(0, 28)}`,
        color: style.color,
        layers,
        // WCAG "large text": >=24px, or >=18.66px when bold.
        large: size >= 24 || (size >= 18.66 && weight >= 700),
      };
    });

const compositeOver = (layers) => {
  let out = { r: 255, g: 255, b: 255 };
  for (let i = layers.length - 1; i >= 0; i--) {
    const c = parseColor(layers[i]);
    out = {
      r: c.r * c.a + out.r * (1 - c.a),
      g: c.g * c.a + out.g * (1 - c.a),
      b: c.b * c.a + out.b * (1 - c.a),
    };
  }
  return out;
};

/**
 * Known shortfalls, accepted for now with a reason.
 *
 * Listing them keeps the harness a useful gate — a new regression still fails
 * the run — while making the debt visible instead of silently passing.
 */
const KNOWN = [
  {
    theme: "light",
    label: "fg-faint",
    reason:
      "gray-400 on the gray-50 canvas is 2.43:1. This is the literal value the " +
      "library shipped before the semantic layer, preserved so the migration " +
      "changes no light-mode pixels. It affects placeholders and decorative " +
      "icons. Darkening it is a design change and belongs in its own release.",
  },
];

const isKnown = (row) =>
  KNOWN.some((k) => k.theme === row.theme && k.label === row.label);

const STORY =
  "/iframe.html?id=overview-every-surface--every-surface&viewMode=story";

const run = async () => {
  const server = await serve();
  const browser = await chromium.launch();
  const failures = [];
  const known = [];
  const rows = [];

  for (const theme of ["light", "dark"]) {
    const page = await browser.newPage({ viewport: { width: 900, height: 1200 } });
    await page.goto(
      `http://localhost:${PORT}${STORY}&globals=theme:${theme}`,
      { waitUntil: "networkidle" }
    );
    await page.waitForTimeout(600);

    for (const probe of await page.evaluate(collect)) {
      const bg = compositeOver(probe.layers);
      const fgRaw = parseColor(probe.color);
      const fg = {
        r: fgRaw.r * fgRaw.a + bg.r * (1 - fgRaw.a),
        g: fgRaw.g * fgRaw.a + bg.g * (1 - fgRaw.a),
        b: fgRaw.b * fgRaw.a + bg.b * (1 - fgRaw.a),
      };
      const ratio = Number(contrast(fg, bg).toFixed(2));
      const threshold = probe.large ? 3 : 4.5;
      const row = { theme, ...probe, ratio, threshold, pass: ratio >= threshold };
      rows.push(row);
      if (!row.pass && !isKnown(row)) failures.push(row);
      if (!row.pass && isKnown(row)) known.push(row);
    }
    await page.close();
  }

  await browser.close();
  server.close();

  console.log(`Checked ${rows.length} text/background pairs across both themes.`);

  for (const k of known) {
    const entry = KNOWN.find((e) => e.theme === k.theme && e.label === k.label);
    console.log(
      `\n  known: [${k.theme}] ${k.ratio} (needs ${k.threshold})  ${k.label}\n    ${entry.reason}`
    );
  }

  if (failures.length === 0) {
    console.log(
      `\nAll pairs meet WCAG AA${known.length ? ` (${known.length} known exception${known.length > 1 ? "s" : ""} above)` : ""}.`
    );
    return 0;
  }

  console.log(`\n${failures.length} below AA:\n`);
  for (const f of failures) {
    console.log(
      `  [${f.theme}] ${String(f.ratio).padStart(6)} (needs ${f.threshold})  ${f.label}`
    );
  }
  return 1;
};

process.exit(await run());
