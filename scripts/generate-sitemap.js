const fs = require('fs');
const path = require('path');

// Import your data (you'll need to convert this to work with your build process)
const { projects } = require('../src/data/projects.ts');
const { events } = require('../src/data/events.ts');

const baseUrl = 'https://rotaract.rotaryzcwest.org';
const currentDate = new Date().toISOString().split('T')[0];

// Static pages
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/projects', priority: '0.8', changefreq: 'monthly' },
  { url: '/events', priority: '0.8', changefreq: 'weekly' },
  { url: '/officers', priority: '0.7', changefreq: 'yearly' },
];

// Generate sitemap XML
function generateSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Static Pages -->`;

  // Add static pages
  staticPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Add project pages
  sitemap += `

  <!-- Dynamic Project Pages -->`;
  projects.forEach(project => {
    sitemap += `
  <url>
    <loc>${baseUrl}/projects/${project.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  // Add event pages
  sitemap += `

  <!-- Dynamic Event Pages -->`;
  events.forEach(event => {
    sitemap += `
  <url>
    <loc>${baseUrl}/events/${event.date}/${event.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  sitemap += `

</urlset>`;

  return sitemap;
}

// Write sitemap to file
const sitemapContent = generateSitemap();
fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemapContent);

console.log('✅ Sitemap generated successfully!');
console.log(`📊 Total URLs: ${staticPages.length + projects.length + events.length}`); 