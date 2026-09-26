import type { Asset } from 'contentful';

export function processAsset(asset: Asset): string {
  if (!asset?.fields?.file?.url) return '';
  const url = asset.fields.file.url as string;
  return url.startsWith('//') ? `https:${url}` : url;
}

// Resize delivered copies only. Keep CMS URLs unchanged for downloads and lightboxes.
export function responsiveImage(src: string, sizes: string) {
  if (
    !/^https:\/\/images\.ctfassets\.net\/.*\.(?:jpe?g|png|webp)(?:\?.*)?$/i.test(
      src
    )
  )
    return { src };
  const url = new URL(src);
  url.searchParams.delete('fl');
  url.searchParams.set('fm', 'webp');
  url.searchParams.set('q', '80');
  const resized = (width: number) => {
    url.searchParams.set('w', String(width));
    return url.toString();
  };
  return {
    src: resized(960),
    srcSet: [320, 640, 960, 1280, 1920]
      .map(width => `${resized(width)} ${width}w`)
      .join(', '),
    sizes,
  };
}
