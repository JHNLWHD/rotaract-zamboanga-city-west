interface RichTextMark {
  type: string;
}

interface RichTextNode {
  nodeType: string;
  value?: string;
  marks?: RichTextMark[];
  data?: {
    uri?: string;
    [key: string]: unknown;
  };
  content?: RichTextNode[];
}

export interface RichText {
  nodeType?: string;
  content?: RichTextNode[];
}

const escapeMarkdown = (value: string): string =>
  value.replace(/([\\`*_{}[\]()#+\-.!>])/g, '\\$1');

const renderInline = (nodes: RichTextNode[] | undefined): string => {
  if (!nodes || nodes.length === 0) return '';

  return nodes
    .map(node => {
      if (node.nodeType === 'text') {
        let text = escapeMarkdown(node.value ?? '');
        const marks = node.marks ?? [];
        for (const mark of marks) {
          switch (mark.type) {
            case 'bold':
              text = `**${text}**`;
              break;
            case 'italic':
              text = `*${text}*`;
              break;
            case 'underline':
              // Markdown has no native underline; emphasize instead.
              text = `*${text}*`;
              break;
            case 'code':
              text = `\`${node.value ?? ''}\``;
              break;
            default:
              break;
          }
        }
        return text;
      }

      if (
        node.nodeType === 'hyperlink' ||
        node.nodeType === 'entry-hyperlink' ||
        node.nodeType === 'asset-hyperlink'
      ) {
        const label = renderInline(node.content);
        const uri = node.data?.uri ?? '';
        return uri ? `[${label}](${uri})` : label;
      }

      return renderInline(node.content);
    })
    .join('');
};

const renderListItem = (node: RichTextNode): string => {
  const lines: string[] = [];
  for (const child of node.content ?? []) {
    if (child.nodeType === 'paragraph') {
      lines.push(renderInline(child.content));
    } else if (
      child.nodeType === 'unordered-list' ||
      child.nodeType === 'ordered-list'
    ) {
      lines.push(renderList(child, true));
    } else {
      lines.push(renderInline(child.content));
    }
  }
  return lines.filter(Boolean).join('\n');
};

const renderList = (node: RichTextNode, nested = false): string => {
  const ordered = node.nodeType === 'ordered-list';
  const items = (node.content ?? []).filter(
    child => child.nodeType === 'list-item'
  );

  const rendered = items
    .map((item, index) => {
      const marker = ordered ? `${index + 1}.` : '-';
      const body = renderListItem(item);
      const [first, ...rest] = body.split('\n');
      const indented = rest
        .map(line => (line ? `  ${line}` : line))
        .join('\n');
      return rest.length > 0 ? `${marker} ${first}\n${indented}` : `${marker} ${first}`;
    })
    .join('\n');

  return nested ? rendered : rendered;
};

/**
 * Convert a Contentful Rich Text document into a Markdown string suitable
 * for rendering with `react-markdown` + `remark-gfm`.
 *
 * Supports paragraphs, headings, ordered/unordered lists (including nested
 * lists), basic marks (bold, italic, code), and hyperlinks. Unsupported
 * nodes fall back to their inline text content.
 */
export function richTextToMarkdown(richText: RichText | undefined | null): string {
  if (!richText || !richText.content) return '';

  const blocks: string[] = [];

  for (const node of richText.content) {
    switch (node.nodeType) {
      case 'paragraph':
        blocks.push(renderInline(node.content));
        break;
      case 'heading-1':
        blocks.push(`# ${renderInline(node.content)}`);
        break;
      case 'heading-2':
        blocks.push(`## ${renderInline(node.content)}`);
        break;
      case 'heading-3':
        blocks.push(`### ${renderInline(node.content)}`);
        break;
      case 'heading-4':
        blocks.push(`#### ${renderInline(node.content)}`);
        break;
      case 'heading-5':
        blocks.push(`##### ${renderInline(node.content)}`);
        break;
      case 'heading-6':
        blocks.push(`###### ${renderInline(node.content)}`);
        break;
      case 'unordered-list':
      case 'ordered-list':
        blocks.push(renderList(node));
        break;
      case 'blockquote':
        blocks.push(
          renderInline(node.content)
            .split('\n')
            .map(line => `> ${line}`)
            .join('\n')
        );
        break;
      case 'hr':
        blocks.push('---');
        break;
      default:
        blocks.push(renderInline(node.content));
        break;
    }
  }

  return blocks
    .map(block => block.trim())
    .filter(Boolean)
    .join('\n\n')
    .trim();
}

/**
 * Strip Markdown syntax from a string and return human-readable plain text.
 *
 * Useful when a field that has been converted to Markdown via
 * {@link richTextToMarkdown} needs to be embedded in places that expect plain
 * text (SEO `<meta>` tags, JSON-LD, share previews, etc.).
 */
export function markdownToPlainText(markdown: string | undefined | null): string {
  if (!markdown) return '';

  return markdown
    .replace(/```[\s\S]*?```/g, ' ') // fenced code blocks
    .replace(/`([^`]*)`/g, '$1') // inline code
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links
    .replace(/^\s{0,3}>\s?/gm, '') // blockquote markers
    .replace(/^\s*[-*+]\s+/gm, '') // unordered list markers
    .replace(/^\s*\d+\.\s+/gm, '') // ordered list markers
    .replace(/^\s{0,3}#{1,6}\s+/gm, '') // headings
    .replace(/^\s*[-*_]{3,}\s*$/gm, '') // horizontal rules
    .replace(/\*\*([^*]+)\*\*/g, '$1') // bold
    .replace(/\*([^*]+)\*/g, '$1') // italic
    .replace(/__([^_]+)__/g, '$1') // bold (alt)
    .replace(/_([^_]+)_/g, '$1') // italic (alt)
    .replace(/\\([\\`*_{}[\]()#+\-.!>])/g, '$1') // unescape escaped chars
    .replace(/\s+/g, ' ')
    .trim();
}
