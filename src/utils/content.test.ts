import type { Asset } from 'contentful';
import { describe, expect, it } from 'vitest';
import { cacheConfig } from '../config/cache';
import { cn } from '../lib/utils';
import { processAsset, responsiveImage } from './contentful';
import {
  markdownToPlainText,
  richTextToMarkdown,
  type RichText,
} from './richText';

const asset = (url?: string) =>
  ({ fields: { file: url ? { url } : undefined } }) as unknown as Asset;

describe('content utilities', () => {
  it('resizes only supported Contentful images and preserves original URLs', () => {
    const original =
      'https://images.ctfassets.net/space/asset/photo.jpg?fl=progressive';
    const props = responsiveImage(original, '(min-width: 768px) 400px, 100vw');
    const url = new URL(props.src);
    expect(url.searchParams.get('fm')).toBe('webp');
    expect(url.searchParams.get('q')).toBe('80');
    expect(url.searchParams.get('w')).toBe('960');
    expect(url.searchParams.has('fl')).toBe(false);
    expect(url.searchParams.has('fit')).toBe(false);
    expect(url.searchParams.has('h')).toBe(false);
    expect(
      props.srcSet.split(', ').map(candidate => candidate.split(' ')[1])
    ).toEqual(['320w', '640w', '960w', '1280w', '1920w']);
    expect(props.sizes).toBe('(min-width: 768px) 400px, 100vw');
    expect(original).not.toContain('w=');
    for (const src of [
      '/photo.png',
      'https://images.test/photo.jpg',
      'https://images.ctfassets.net/file.svg',
      'https://images.ctfassets.net/animation.gif',
      'https://images.ctfassets.net.evil.test/photo.jpg',
      '',
    ])
      expect(responsiveImage(src, '100vw')).toEqual({ src });
  });
  it('normalizes Contentful asset URLs and missing assets', () => {
    expect(processAsset(asset('//images.ctfassets.net/photo.jpg'))).toBe(
      'https://images.ctfassets.net/photo.jpg'
    );
    expect(processAsset(asset('https://example.com/photo.jpg'))).toBe(
      'https://example.com/photo.jpg'
    );
    expect(processAsset(asset())).toBe('');
  });

  it('renders supported Contentful rich text as Markdown', () => {
    const text = (value: string, marks: string[] = []) => ({
      nodeType: 'text',
      value,
      marks: marks.map(type => ({ type })),
    });
    const document = {
      content: [
        { nodeType: 'heading-1', content: [text('Title')] },
        { nodeType: 'heading-2', content: [text('Section')] },
        { nodeType: 'heading-3', content: [text('Third')] },
        { nodeType: 'heading-4', content: [text('Fourth')] },
        { nodeType: 'heading-5', content: [text('Fifth')] },
        { nodeType: 'heading-6', content: [text('Sixth')] },
        {
          nodeType: 'paragraph',
          content: [
            text('bold', ['bold']),
            text(' italic', ['italic']),
            text(' underline', ['underline']),
            text(' code', ['code']),
            text(' plain', ['unknown']),
            {
              nodeType: 'hyperlink',
              data: { uri: 'https://example.com' },
              content: [text(' link')],
            },
            {
              nodeType: 'entry-hyperlink',
              data: {},
              content: [text(' entry')],
            },
            {
              nodeType: 'asset-hyperlink',
              data: { uri: '/asset' },
              content: [text(' asset')],
            },
            { nodeType: 'embedded-entry', content: [text(' fallback')] },
          ],
        },
        {
          nodeType: 'unordered-list',
          content: [
            {
              nodeType: 'list-item',
              content: [
                { nodeType: 'paragraph', content: [text('One')] },
                {
                  nodeType: 'ordered-list',
                  content: [
                    {
                      nodeType: 'list-item',
                      content: [
                        { nodeType: 'paragraph', content: [text('Nested')] },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              nodeType: 'list-item',
              content: [{ nodeType: 'custom', content: [text('Two')] }],
            },
          ],
        },
        {
          nodeType: 'blockquote',
          content: [text('Quoted\nline')],
        },
        { nodeType: 'hr' },
        { nodeType: 'custom', content: [text('Final')] },
        { nodeType: 'paragraph', content: [] },
      ],
    } as RichText;

    const markdown = richTextToMarkdown(document);

    expect(markdown).toContain('# Title\n\n## Section');
    expect(markdown).toContain('**bold*** italic** underline*` code` plain');
    expect(markdown).toContain(
      '[ link](https://example.com) entry[ asset](/asset) fallback'
    );
    expect(markdown).toContain('- One\n  1. Nested\n- Two');
    expect(markdown).toContain('> Quoted\n> line\n\n---\n\nFinal');
    expect(richTextToMarkdown(null)).toBe('');
    expect(richTextToMarkdown({})).toBe('');
  });

  it('keeps incomplete rich-text nodes safe', () => {
    const document = {
      content: [
        {
          nodeType: 'paragraph',
          content: [{ nodeType: 'text', marks: [{ type: 'code' }] }],
        },
        { nodeType: 'unordered-list' },
        {
          nodeType: 'unordered-list',
          content: [
            { nodeType: 'list-item' },
            {
              nodeType: 'list-item',
              content: [
                {
                  nodeType: 'paragraph',
                  content: [{ nodeType: 'text', value: 'Line\n' }],
                },
              ],
            },
          ],
        },
      ],
    } as RichText;

    expect(richTextToMarkdown(document)).toBe('``\n\n- Line');
  });

  it('converts Markdown to compact plain text', () => {
    const markdown = [
      '# Heading',
      '> Quote with **bold** and _italic_',
      '- [Link](https://example.com)',
      '1. ![Photo](photo.jpg)',
      '`inline` and __strong__ plus *emphasis*',
      '```js\nconst hidden = true;\n```',
      '---',
      'Escaped \\# symbol',
    ].join('\n');

    expect(markdownToPlainText(markdown)).toBe(
      'Heading Quote with bold and italic Link Photo inline and strong plus emphasis Escaped # symbol'
    );
    expect(markdownToPlainText(undefined)).toBe('');
  });

  it('keeps shared cache policy and class merging deterministic', () => {
    expect(cacheConfig.monthly.staleTime).toBe(12 * 60 * 60 * 1000);
    expect(cacheConfig.yearly.staleTime).toBe(24 * 24 * 60 * 60 * 1000);
    expect(cacheConfig.yearly.gcTime).toBe(Infinity);
    expect(cn('px-2', undefined, 'px-4')).toBe('px-4');
  });
});
