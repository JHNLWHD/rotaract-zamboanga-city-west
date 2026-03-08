#!/usr/bin/env node

import pkg from 'contentful-management';
const { createClient } = pkg;
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Environment variables
const SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT = process.env.VITE_CONTENTFUL_ENVIRONMENT || 'master';
const DRY_RUN = process.argv.includes('--dry-run');

// Validation
if (!DRY_RUN && (!SPACE_ID || !MANAGEMENT_TOKEN)) {
  console.error('❌ Missing required environment variables:');
  console.error('   VITE_CONTENTFUL_SPACE_ID');
  console.error('   CONTENTFUL_MANAGEMENT_TOKEN');
  console.error('');
  console.error(
    '💡 Tip: Use --dry-run to test file validation without Contentful connection'
  );
  process.exit(1);
}

console.log(
  `📤 Starting asset upload process${DRY_RUN ? ' (DRY RUN)' : ''}...`
);
if (!DRY_RUN) {
  console.log(`   Space ID: ${SPACE_ID}`);
  console.log(`   Environment: ${ENVIRONMENT}`);
}

// Asset mapping to store uploaded asset IDs
const assetMapping = new Map();

async function uploadAsset(
  client,
  environment,
  filePath,
  title,
  description = '',
  retries = 3
) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const fullPath = path.join(process.cwd(), 'public', filePath);

      // Check if file exists
      if (!fs.existsSync(fullPath)) {
        console.warn(`⚠️  File not found: ${fullPath}`);
        return null;
      }

      // Read file
      const fileBuffer = fs.readFileSync(fullPath);
      const fileName = path.basename(filePath);
      const fileExtension = path.extname(fileName).toLowerCase();

      // Determine content type
      const contentTypeMap = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
      };

      const contentType =
        contentTypeMap[fileExtension] || 'application/octet-stream';

      console.log(
        `📁 Uploading: ${fileName} (${(fileBuffer.length / 1024).toFixed(1)} KB)`
      );

      // Step 1: Create an upload
      console.log(`⬆️  Creating upload...`);
      const upload = await environment.createUpload({
        file: fileBuffer,
        contentType: contentType,
      });

      console.log(`✅ Upload created: ${upload.sys.id}`);

      // Step 2: Create asset with upload reference
      console.log(`📦 Creating asset...`);
      const asset = await environment.createAsset({
        fields: {
          title: {
            'en-US': title,
          },
          description: {
            'en-US': description,
          },
          file: {
            'en-US': {
              contentType: contentType,
              fileName: fileName,
              uploadFrom: {
                sys: {
                  type: 'Link',
                  linkType: 'Upload',
                  id: upload.sys.id,
                },
              },
            },
          },
        },
      });

      console.log(`📦 Asset created: ${asset.sys.id}`);

      // Step 3: Process and publish asset
      console.log(`⚙️  Processing asset...`);
      const processedAsset = await asset.processForAllLocales();

      console.log(`📢 Publishing asset...`);
      const publishedAsset = await processedAsset.publish();

      console.log(`✅ Uploaded: ${fileName} (ID: ${publishedAsset.sys.id})`);

      // Store in mapping
      assetMapping.set(filePath, publishedAsset.sys.id);

      return publishedAsset.sys.id;
    } catch (error) {
      console.error(
        `❌ Attempt ${attempt}/${retries} failed for ${filePath}:`,
        error.message
      );

      if (attempt === retries) {
        console.error(`💥 Final attempt failed for ${filePath}`);
        return null;
      }

      // Wait before retry (exponential backoff)
      const waitTime = Math.pow(2, attempt) * 1000;
      console.log(`⏳ Waiting ${waitTime}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
}

async function uploadAllAssets() {
  try {
    let client, space, environment;

    if (!DRY_RUN) {
      // Create Contentful Management client
      client = createClient({
        accessToken: MANAGEMENT_TOKEN,
      });

      // Get space and environment
      console.log('📡 Connecting to Contentful...');
      space = await client.getSpace(SPACE_ID);
      environment = await space.getEnvironment(ENVIRONMENT);
      console.log('✅ Connected successfully!');
    } else {
      console.log('🧪 Running in dry-run mode - validating files only...');
    }

    // Define assets to upload based on static data
    const assetsToUpload = [
      // Project images
      {
        path: '/projects/regala-esperanza-3-in-1-project/header.jpg',
        title: 'Regala Esperanza Project Header',
        description: 'Featured image for Regala Esperanza 3-in-1 project',
      },
      {
        path: '/projects/regala-esperanza-3-in-1-project/gallery-1.png',
        title: 'Regala Esperanza Gallery 1',
        description:
          'PRIMAGRAVIDA Safe Motherhood initiative - Medical check-ups',
      },
      {
        path: '/projects/regala-esperanza-3-in-1-project/gallery-2.png',
        title: 'Regala Esperanza Gallery 2',
        description: 'MOA signing ceremony with partners',
      },
      {
        path: '/projects/kids-fun-day/header.jpg',
        title: 'Kids Fun Day Header',
        description: 'Featured image for Kids Fun Day project',
      },
      {
        path: '/projects/kids-fun-day/gallery-1.png',
        title: 'Kids Fun Day Gallery 1',
        description:
          'Kids Fun Day activities at Barney Child Development Center',
      },
      {
        path: '/projects/kids-fun-day/gallery-2.png',
        title: 'Kids Fun Day Gallery 2',
        description: 'Book turnover and Day Care Center improvement unveiling',
      },
      {
        path: '/projects/international-coastal-cleanup-2024/header.jpg',
        title: 'International Coastal Cleanup Header',
        description: 'Featured image for International Coastal Cleanup 2024',
      },
      {
        path: '/projects/international-coastal-cleanup-2024/gallery-1.png',
        title: 'Coastal Cleanup Gallery 1',
        description: 'Community volunteers at R.T. Lim Boulevard',
      },
      {
        path: '/projects/international-coastal-cleanup-2024/gallery-2.png',
        title: 'Coastal Cleanup Gallery 2',
        description: 'Rotaract Club members participating in cleanup',
      },
      {
        path: '/projects/international-coastal-cleanup-2024/gallery-3.png',
        title: 'Coastal Cleanup Gallery 3',
        description: 'Environmental awareness campaign with stakeholders',
      },
      {
        path: '/projects/end-polio-motorcade/header.jpg',
        title: 'End Polio Motorcade Header',
        description: 'Featured image for End Polio Motorcade project',
      },
      {
        path: '/projects/end-polio-motorcade/gallery-1.png',
        title: 'End Polio Gallery 1',
        description: 'END POLIO Motorcade procession',
      },
      {
        path: '/projects/end-polio-motorcade/gallery-2.png',
        title: 'End Polio Gallery 2',
        description: 'Community leaders spreading polio awareness',
      },
      {
        path: '/projects/end-polio-motorcade/gallery-3.png',
        title: 'End Polio Gallery 3',
        description: 'Rotaract Club supporting vaccination awareness',
      },
      {
        path: '/projects/foodloop-isla-kah-bilang-project/header.jpg',
        title: 'FoodLoop ISLA Project Header',
        description: 'Featured image for FoodLoop & ISLA Kah-BILANG project',
      },
      {
        path: '/projects/foodloop-isla-kah-bilang-project/gallery-1.png',
        title: 'FoodLoop Gallery 1',
        description: 'Gardenator vertical farming system deployment',
      },
      {
        path: '/projects/foodloop-isla-kah-bilang-project/gallery-2.png',
        title: 'FoodLoop Gallery 2',
        description: 'D Beat of Nutrition Project community initiative',
      },
      {
        path: '/projects/bida-el-comunidad-year-2-muntinlupa/header.jpg',
        title: 'Bida El Comunidad Header',
        description: 'Featured image for Bida El Comunidad Year 2 project',
      },
      {
        path: '/projects/bida-el-comunidad-year-2-muntinlupa/gallery-1.png',
        title: 'Bida El Comunidad Gallery 1',
        description: 'Multi-club collaboration deployment',
      },
      {
        path: '/projects/bida-el-comunidad-year-2-muntinlupa/gallery-2.png',
        title: 'Bida El Comunidad Gallery 2',
        description: 'Technology transfer on vegetable production',
      },

      // Event images
      {
        path: '/events/basic-orientation-seminar-2025.jpg',
        title: 'Basic Orientation Seminar 2025',
        description: 'Featured image for Basic Orientation Seminar 2025',
      },
      {
        path: '/events/solidares-3.0.jpg',
        title: 'Solidares 3.0 Strategic Planning',
        description: 'Featured image for Solidares 3.0 event',
      },
      {
        path: '/events/16th-induction-and-turnover/16th-induction-and-turnover.png',
        title: '16th Joint Induction and Turnover',
        description:
          'Featured image for 16th Joint Induction and Turnover Ceremonies',
      },
      {
        path: '/events/16th-induction-and-turnover/dress-code-male.png',
        title: 'Dress Code Male',
        description: 'Male dress code guidelines for induction ceremony',
      },
      {
        path: '/events/16th-induction-and-turnover/dress-code-female.png',
        title: 'Dress Code Female',
        description: 'Female dress code guidelines for induction ceremony',
      },
      {
        path: '/events/16th-induction-and-turnover/official-pubmat.jpg',
        title: 'Official Pubmat',
        description: 'Official promotional material for induction ceremony',
      },
    ];

    console.log(`\n📋 Found ${assetsToUpload.length} assets to upload\n`);

    // Upload assets with progress tracking
    let uploaded = 0;
    let failed = 0;

    for (const asset of assetsToUpload) {
      if (DRY_RUN) {
        // In dry-run mode, just validate file existence
        const fullPath = path.join(process.cwd(), 'public', asset.path);
        if (fs.existsSync(fullPath)) {
          console.log(`✅ Found: ${asset.path}`);
          uploaded++;
        } else {
          console.log(`❌ Missing: ${asset.path}`);
          failed++;
        }
      } else {
        console.log(`📤 Uploading ${asset.path}...`);
        const assetId = await uploadAsset(
          client,
          environment,
          asset.path,
          asset.title,
          asset.description
        );

        if (assetId) {
          uploaded++;
          console.log(
            `📊 Progress: ${uploaded}/${assetsToUpload.length} completed`
          );
        } else {
          failed++;
          console.log(`⚠️  Failed uploads: ${failed}`);
        }
      }

      // Delay to avoid rate limiting and connection issues
      if (uploaded + failed < assetsToUpload.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    // Save asset mapping to file for migration scripts (only in real mode)
    const mappingPath = path.join(
      process.cwd(),
      'scripts',
      'asset-mapping.json'
    );

    if (!DRY_RUN) {
      const mappingObject = Object.fromEntries(assetMapping);
      fs.writeFileSync(mappingPath, JSON.stringify(mappingObject, null, 2));
    }

    console.log('\n🎉 Asset upload completed!');
    console.log('\n📊 Summary:');
    console.log(`   ✅ Uploaded: ${uploaded}`);
    console.log(`   ❌ Failed: ${failed}`);
    if (!DRY_RUN) {
      console.log(`   📄 Asset mapping saved to: ${mappingPath}`);
    }
  } catch (error) {
    console.error('❌ Asset upload failed:', error.message);
    process.exit(1);
  }
}

// Run the upload
uploadAllAssets();
