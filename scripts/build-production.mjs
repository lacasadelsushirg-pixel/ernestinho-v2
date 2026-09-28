import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const OUT = join(ROOT, "dist");
const STAGING = "https://ernestinho-v2.vercel.app";
const PROD = "https://www.ernestinhocarioca.com.br";
const SKIP = new Set([".git", ".github", ".vercel", "dist", "node_modules"]);
const TEXT_EXT = new Set([".html", ".xml", ".txt", ".js", ".css", ".json", ".webmanifest"]);

function ext(path) {
  const name = path.toLowerCase();
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i) : "";
}
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const src = join(dir, entry.name);
    const rel = relative(ROOT, src);
    const dst = join(OUT, rel);
    if (entry.isDirectory()) {
      await mkdir(dst, { recursive: true });
      await walk(src);
      continue;
    }
    await mkdir(join(dst, ".."), { recursive: true });
    if (TEXT_EXT.has(ext(src))) {
      const source = await readFile(src, "utf8");
      await writeFile(dst, source.replaceAll(STAGING, PROD), "utf8");
    } else {
      await cp(src, dst);
    }
  }
}
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await walk(ROOT);

let stale = 0;
async function verify(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) await verify(p);
    else if (TEXT_EXT.has(ext(p))) {
      const value = await readFile(p, "utf8");
      if (value.includes(STAGING)) { stale++; console.error("staging origin remains:", relative(OUT, p)); }
    }
  }
}
await verify(OUT);
if (stale) process.exit(1);
console.log("Production build ready in dist/ with canonical origin:", PROD);
