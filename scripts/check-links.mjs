// Checks that every local file the page references exists in dist/,
// and that every in-page link (#section) points to an element that exists.
import { readFileSync, existsSync } from "node:fs";

const html = readFileSync("dist/index.html", "utf8");
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const refs = [...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
const errors = [];

for (const ref of refs) {
  if (/^(https?:|mailto:|tel:|data:|\/\/)/.test(ref)) continue;
  if (ref === "#") continue; // placeholder link
  if (ref.startsWith("#")) {
    if (!ids.has(ref.slice(1))) errors.push(`Broken in-page link: ${ref}`);
    continue;
  }
  const path = ref.split(/[?#]/)[0];
  if (!existsSync(`dist/${path}`)) errors.push(`Missing file: ${path}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Link check passed (${refs.length} links checked).`);
