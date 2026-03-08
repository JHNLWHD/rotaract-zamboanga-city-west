import fs from 'fs';
import path from 'path';

/**
 * Load asset mapping from asset-mapping.json
 * @returns {Object} Asset mapping object or empty object if not found
 */
export function loadAssetMapping() {
  try {
    const mappingPath = path.join(
      process.cwd(),
      'scripts',
      'asset-mapping.json'
    );
    if (fs.existsSync(mappingPath)) {
      const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
      console.log('✅ Asset mapping loaded');
      return mapping;
    } else {
      console.warn('⚠️  Asset mapping not found. Run upload-assets.js first.');
      return {};
    }
  } catch (error) {
    console.warn('⚠️  Could not load asset mapping:', error.message);
    return {};
  }
}

/**
 * Convert text to Contentful rich text format
 * @param {string} text - Text to convert
 * @returns {Object} Contentful rich text document (empty document if no text provided)
 */
export function convertToRichText(text) {
  if (!text) {
    return {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          content: [],
          data: {},
        },
      ],
    };
  }

  return {
    nodeType: 'document',
    data: {},
    content: [
      {
        nodeType: 'paragraph',
        content: [
          {
            nodeType: 'text',
            value: text,
            marks: [],
            data: {},
          },
        ],
        data: {},
      },
    ],
  };
}
