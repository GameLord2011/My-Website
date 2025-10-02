import { writeFileSync, readdirSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const appDirectory = resolve(__dirname, "../app");
const SITEMAP_PATH = join(__dirname, "../public/sitemap.xml");
const BASE_URL = "https://gamelord2011.vercel.app";

function isDynamicRoute(routePath) {
  return routePath.includes("[") && routePath.includes("]");
}

function formatRoutePath(relativePath) {
  let routePath = relativePath.replace(/\\/g, "/").replace("/page.tsx", "");
  if (routePath === "" || routePath === "/page.tsx") return "/";
  return `/${routePath}`;
}

function getRoutes(dir, basePath = "") {
  const entries = readdirSync(dir, { withFileTypes: true });
  let routes = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relativePath = join(basePath, entry.name);
    if (entry.isDirectory()) {
      routes = routes.concat(getRoutes(fullPath, relativePath));
    } else if (entry.isFile() && entry.name === "page.tsx") {
      const routePath = formatRoutePath(relativePath);
      if (isDynamicRoute(routePath)) continue;
      routes.push({ path: routePath });
      console.log("Found route:", routePath);
    }
  }
  return routes;
}

function generateSitemapXml(routes) {
  const now = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes
    .map(
      ({ path }) =>
        `<url><loc>${BASE_URL}${path}</loc><lastmod>${now}</lastmod><priority>${path === "/" ? "1" : "0.7"}</priority><changefreq>always</changefreq></url>`,
    )
    .replace("\n", "")}</urlset>`;
}

async function generateSitemap() {
  const routes = getRoutes(appDirectory);
  const sitemap = generateSitemapXml(routes);
  writeFileSync(SITEMAP_PATH, sitemap, "utf8");
  console.log("Sitemap generated successfully!");
}

generateSitemap().catch(console.error);
