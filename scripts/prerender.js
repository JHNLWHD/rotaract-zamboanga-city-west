import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const origin = 'https://rotaract.rotaryzcwest.org';

export function outputFile(route) {
  if (route === '/') return 'index.html';
  if (!/^\/[a-z0-9-]+(?:\/[a-z0-9-]+)*$/.test(route)) {
    throw new Error(`Unsafe or invalid route: ${route}`);
  }
  return `${route.slice(1)}.html`;
}

export function pageHtml(template, rendered, status = 200) {
  if (
    !template.includes('<!--page-head-->') ||
    !template.includes('<div id="root"></div>')
  ) {
    throw new Error('Prerender template markers are missing.');
  }
  return template
    .replace('<!--page-head-->', () => rendered.head)
    .replace(
      '<div id="root"></div>',
      () =>
        `<div id="root">${rendered.body}</div>\n<script id="page-state" type="application/json" data-status="${status}">${rendered.state}</script>`
    );
}

export function sitemap(pages) {
  const seen = new Set();
  const urls = pages.map(page => {
    outputFile(page.path);
    if (seen.has(page.path)) throw new Error(`Duplicate route: ${page.path}`);
    seen.add(page.path);
    let lastmod = '';
    if (page.lastmod) {
      lastmod = `<lastmod>${new Date(page.lastmod).toISOString()}</lastmod>`;
    }
    return `<url><loc>${origin}${page.path}</loc>${lastmod}</url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

export function validateHtml(html, route, status = 200) {
  const dom = new JSDOM(html);
  try {
    const doc = dom.window.document;
    assert.equal(
      doc.querySelectorAll('title').length,
      1,
      `${route}: one title required`
    );
    assert.equal(
      doc.querySelectorAll('meta[name="description"]').length,
      1,
      `${route}: one description required`
    );
    assert(
      doc.querySelector('meta[name="description"]').content.trim(),
      `${route}: empty description`
    );
    assert.equal(
      doc.querySelector('link[rel="canonical"]')?.getAttribute('href'),
      `${origin}${route}`,
      `${route}: wrong canonical`
    );
    assert(
      doc.querySelector('#root main#main-content h1')?.textContent.trim(),
      `${route}: missing initial page content`
    );
    const state = doc.querySelector('#page-state');
    assert.equal(
      state?.getAttribute('data-status'),
      String(status),
      `${route}: missing snapshot`
    );
    JSON.parse(state.textContent);
    for (const script of doc.querySelectorAll(
      'script[type="application/ld+json"]'
    ))
      JSON.parse(script.textContent);
    if (status === 200) {
      for (const property of [
        'og:title',
        'og:description',
        'og:url',
        'og:image',
      ]) {
        assert(
          doc.querySelector(`meta[property="${property}"]`)?.content,
          `${route}: missing ${property}`
        );
      }
    } else {
      assert(
        doc.querySelector('meta[name="robots"]')?.content.includes('noindex'),
        '404 must not be indexed'
      );
    }
  } finally {
    dom.window.close();
  }
}

async function buildPages() {
  const { createServer } = await import('vite');
  const mode = process.argv.includes('--development')
    ? 'development'
    : 'production';
  const vite = await createServer({
    mode,
    server: { middlewareMode: true },
    appType: 'custom',
  });
  try {
    const { loadPages, renderPage } =
      await vite.ssrLoadModule('/src/prerender.tsx');
    const pages = await loadPages();
    const xml = sitemap(pages);
    const routes = pages.map(page => page.path);
    const template = await readFile('dist/index.html', 'utf8');
    for (const page of pages) {
      const target = path.join('dist', outputFile(page.path));
      const html = pageHtml(template, renderPage(page, routes));
      validateHtml(html, page.path);
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, html);
    }
    const missing = pageHtml(
      template,
      renderPage({ path: '/404', queries: [] }, routes),
      404
    );
    validateHtml(missing, '/404', 404);
    await writeFile('dist/404.html', missing);
    await writeFile('dist/sitemap.xml', xml);
    const headers = await readFile('dist/_headers', 'utf8');
    assert(
      headers.includes(
        `X-Robots-Tag: ${mode === 'development' ? 'noindex, nofollow' : 'index, follow'}`
      ),
      'Wrong indexing policy for build context'
    );
    console.log(
      `Prerendered ${pages.length} public routes, sitemap.xml, and 404.html.`
    );
  } finally {
    await vite.close();
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildPages().catch(() => {
    console.error(
      'Prerender failed. Check published Contentful records and build configuration.'
    );
    process.exitCode = 1;
  });
}
