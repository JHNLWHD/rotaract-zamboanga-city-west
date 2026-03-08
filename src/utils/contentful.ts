import type { Asset } from 'contentful';

export function processAsset(asset: Asset): string {
  if (!asset?.fields?.file?.url) return '';
  const url = asset.fields.file.url as string;
  return url.startsWith('//') ? `https:${url}` : url;
}
