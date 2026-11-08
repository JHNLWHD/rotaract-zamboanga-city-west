import { describe, expect, it } from 'vitest';
import { outputFile, pageHtml, sitemap, validateHtml } from './prerender';

describe('static site output', () => {
  it('maps safe routes and rejects path traversal or markup', () => {
    expect(outputFile('/')).toBe('index.html');
    expect(outputFile('/projects/service-day')).toBe(
      'projects/service-day.html'
    );
    for (const path of [
      '/../secret',
      '/projects/a?b',
      '//evil',
      '/<script>',
      '/projects/',
    ])
      expect(() => outputFile(path)).toThrow('invalid route');
  });

  it('inserts rendered content literally and marks the custom 404 snapshot', () => {
    const template =
      '<html><head><!--page-head--></head><body><div id="root"></div></body></html>';
    const rendered = {
      head: '<title>A &amp; B</title>',
      body: '<h1>$& club</h1>',
      state: '{"queries":[]}',
    };
    const html = pageHtml(template, rendered);
    expect(html).toContain('<h1>$& club</h1>');
    expect(html).toContain('data-status="200"');
    expect(pageHtml(template, rendered, 404)).toContain('data-status="404"');
    expect(() => pageHtml('', rendered)).toThrow('markers');
    expect(() => pageHtml('<!--page-head-->', rendered)).toThrow('markers');
  });

  it('emits all canonical URLs with real modification times and rejects duplicates', () => {
    const xml = sitemap([
      { path: '/' },
      { path: '/recognition' },
      { path: '/projects/service-day', lastmod: '2026-09-01T10:00:00+08:00' },
    ]);
    expect(xml).toContain(
      '<loc>https://rotaract.rotaryzcwest.org/recognition</loc>'
    );
    expect(xml).toContain('<lastmod>2026-09-01T02:00:00.000Z</lastmod>');
    expect(() => sitemap([{ path: '/' }, { path: '/' }])).toThrow('Duplicate');
    expect(() =>
      sitemap([{ path: '/projects/x', lastmod: 'invalid' }])
    ).toThrow();
  });

  it('blocks empty shells, duplicate metadata, invalid schema and indexable error pages', () => {
    const head =
      '<title>Club</title><meta name="description" content="Club records"><link rel="canonical" href="https://rotaract.rotaryzcwest.org/"><meta name="robots" content="noindex">' +
      ['og:title', 'og:description', 'og:url', 'og:image']
        .map(
          property =>
            `<meta property="${property}" content="https://rotaract.rotaryzcwest.org/">`
        )
        .join('');
    const template =
      '<head><!--page-head--></head><body><div id="root"></div></body>';
    const rendered = {
      head,
      body: '<main id="main-content"><h1>Club</h1></main>',
      state: '{"queries":[]}',
    };
    const html = pageHtml(template, rendered);
    expect(() => validateHtml(html, '/')).not.toThrow();
    expect(() => validateHtml(html.replace('<h1>Club</h1>', ''), '/')).toThrow(
      'missing initial'
    );
    expect(() =>
      validateHtml(
        html.replace(
          '</head>',
          '<meta name="description" content="duplicate"></head>'
        ),
        '/'
      )
    ).toThrow('one description');
    expect(() =>
      validateHtml(
        html.replace(
          '</head>',
          '<script type="application/ld+json">broken</script></head>'
        ),
        '/'
      )
    ).toThrow();
    expect(() =>
      validateHtml(
        html.replace('property="og:image"', 'property="unused"'),
        '/'
      )
    ).toThrow('missing og:image');
    expect(() =>
      validateHtml(pageHtml(template, rendered, 404), '/', 404)
    ).not.toThrow();
    expect(() =>
      validateHtml(
        pageHtml(
          template,
          { ...rendered, head: head.replace('noindex', 'index') },
          404
        ),
        '/',
        404
      )
    ).toThrow('404 must not');
  });
});
