import { createClient } from 'contentful';

const draftPreview = import.meta.env.DEV && import.meta.env.MODE === 'drafts';

if (draftPreview && !import.meta.env.VITE_CONTENTFUL_PREVIEW_TOKEN) {
  throw new Error(
    'Draft preview requires VITE_CONTENTFUL_PREVIEW_TOKEN. No published-content fallback is used.'
  );
}

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: draftPreview
    ? import.meta.env.VITE_CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN,
  host: draftPreview ? 'preview.contentful.com' : 'cdn.contentful.com',
  environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master',
});

let recordClient = client;
if (import.meta.env.SSR && import.meta.env.MODE === 'draft-review') {
  const previewToken = process.env.CONTENTFUL_PREVIEW_TOKEN;
  if (!previewToken) {
    throw new Error('Draft review builds require CONTENTFUL_PREVIEW_TOKEN.');
  }
  recordClient = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master',
    host: 'preview.contentful.com',
    accessToken: previewToken,
  });
}

export const fetchEntries = async () => {
  try {
    const entries = await client.getEntries();
    return entries.items;
  } catch (error) {
    console.error('Error fetching entries:', error);
    return [];
  }
};

export default {
  client,
  recordClient,
};
