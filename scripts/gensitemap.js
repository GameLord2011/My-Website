import { writeFileSync } from "fs";
import { join } from "path";

async function generateSitemap() {
    const baseUrl = "https://gamelord2011.gihtub.io";

    // Define your routes (static + dynamic)
    const routes = [
        "/", // Home
        //"/about", // Static page
        //"/contact", // Static page
        // Add dynamic routes if available
        // Example: fetched from your CMS or database
        // ...(await fetchDynamicRoutes())
    ];

    // Create sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${routes
            .map((route) => {
                return `<url>
                    <loc>${baseUrl}${route}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                </url>`;
            })
            .join("")}
    </urlset>`;

    // Write the sitemap to the public folder
    const filePath = join(process.cwd(), "public", "sitemap.xml");
    writeFileSync(filePath, sitemap, "utf8");
    console.log("sitemap.xml generated!");
}

generateSitemap();
