// Copies the website's pages into www/, which is what the app packages.
// The app opens on the customer's dashboard (sign in, their sites, the editor).
import { cpSync, mkdirSync, readdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const root = new URL("..", import.meta.url).pathname, www = new URL("www", import.meta.url).pathname;
rmSync(www, { recursive: true, force: true });
mkdirSync(www);
for (const f of readdirSync(root)) if (f.endsWith(".html") || f === "manifest.webmanifest") cpSync(join(root, f), join(www, f));
cpSync(join(root, "assets"), join(www, "assets"), { recursive: true });
renameSync(join(www, "index.html"), join(www, "home.html"));
writeFileSync(join(www, "index.html"), '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>html{background:#05080C}</style><script>location.replace("dashboard.html")</script>\n');
console.log("Copied the site into app/www");
