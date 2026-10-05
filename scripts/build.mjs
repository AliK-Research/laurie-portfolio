// Copies only the files the website needs into dist/, which is what gets deployed.
import { cpSync, existsSync, rmSync, mkdirSync } from "node:fs";

const SITE_FILES = ["index.html", "css", "js", "assets", "_headers"];
const OUT = "dist";

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT);
for (const f of SITE_FILES) {
  if (existsSync(f)) cpSync(f, `${OUT}/${f}`, { recursive: true });
}
console.log(`Built ${OUT}/ with: ${SITE_FILES.filter(existsSync).join(", ")}`);
