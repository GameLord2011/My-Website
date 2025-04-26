import { writeFileSync, readdirSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const appDirectory = resolve(__dirname, "../app");

function getRoutes(dir, basePath = "") {
  const entries = readdirSync(dir, { withFileTypes: true });
  let routes = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relativePath = join(basePath, entry.name);

    if (entry.isDirectory()) {
      routes = routes.concat(getRoutes(fullPath, relativePath));
    } else if (entry.isFile() && entry.name === "page.tsx") {
      const routePath = relativePath
        .replace(/\\/g, "/")
        .replace("/page.tsx", "");

      // Skip dynamic routes (containing square brackets)
      if (routePath.includes("[") && routePath.includes("]")) {
        continue;
      }

      if (routePath === "") {
        routes.push({
          path: "/",
        });
        console.log("Found route: /");
      } else {
        routes.push({
          path: `/${routePath}`,
        });
        console.log("Found route:", `/${routePath}`);
      }
    }
  }

  return routes;
}

async function generateSitemap() {
  const baseUrl = "https://gamelord2011.vercel.app"; // Your website URL

  // Get all routes from the app directory
  const routes = getRoutes(appDirectory);

  // Create sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${routes
          .map(({ path }) => {
            return `<url>
                    <loc>${baseUrl}${path}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    <priority>${path === "/" ? "1" : "0.7"}</priority>
                    <changefreq>always</changefreq>
                </url>
                `;
          })
          .join("")}
    </urlset>
    `;

  // Write sitemap to public directory
  writeFileSync(join(__dirname, "../public/sitemap.xml"), sitemap, "utf8");
  console.log("Sitemap generated successfully!");
}

generateSitemap().catch(console.error);
