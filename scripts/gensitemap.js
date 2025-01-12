import { writeFileSync } from "fs";
import { join } from "path";

async function generateSitemap() {
    const baseUrl = "https://gamelord2011.github.io";

    // Define your routes with priority
    const routes = [
        { path: "/", priority: 1.0 }, // Home
        //{ path: "/about", priority: 0.8 }, // About page
        //{ path: "/contact", priority: 0.7 }, // Contact page
        // Add dynamic routes if available
        // Example:
        // ...(await fetchDynamicRoutes().map(route => ({ path: `/dynamic/${route}`, priority: 0.6 })))
    ];

    // Create sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${routes
            .map(({ path, priority }) => {
                return `<url>
                    <loc>${baseUrl}${path}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    <priority>${priority}</priority>
                    <changefreq>always</changefreq>
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
