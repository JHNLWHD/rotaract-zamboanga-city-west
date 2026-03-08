#!/usr/bin/env node

import pkg from 'contentful-management';
const { createClient } = pkg;
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();

// Environment variables
const SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT = process.env.VITE_CONTENTFUL_ENVIRONMENT || 'master';
const FORCE = process.argv.includes('--force');
const DRY_RUN = process.argv.includes('--dry-run');

// Validation
if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('❌ Missing required environment variables:');
  console.error('   VITE_CONTENTFUL_SPACE_ID');
  console.error('   CONTENTFUL_MANAGEMENT_TOKEN');
  process.exit(1);
}

console.log(
  `🗑️  Starting content deletion process${DRY_RUN ? ' (DRY RUN)' : ''}...`
);
console.log(`   Space ID: ${SPACE_ID}`);
console.log(`   Environment: ${ENVIRONMENT}`);

// Content types to delete (excluding homepage content types by default)
const CONTENT_TYPES = ['event', 'project', 'officer', 'pastPresident'];

// Homepage content types - these are preserved by default but can be deleted with --include-homepage
const HOMEPAGE_CONTENT_TYPES = [
  'homepageHeroSection',
  'homepageAboutSection',
  'homepageAwardsSection',
  'statItem',
  'cardsAwards',
];

const INCLUDE_HOMEPAGE = process.argv.includes('--include-homepage');

if (INCLUDE_HOMEPAGE) {
  console.log(
    '\n⚠️  Homepage content will be DELETED (--include-homepage flag detected)'
  );
} else {
  console.log('\nℹ️  The following homepage content types will be PRESERVED:');
  HOMEPAGE_CONTENT_TYPES.forEach(type => console.log(`   • ${type}`));
  console.log('   Use --include-homepage flag to delete homepage content too.');
}

async function confirmDeletion() {
  if (FORCE || DRY_RUN) {
    return true;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => {
    rl.question(
      '\n⚠️  WARNING: This will delete ALL content entries and assets from Contentful!\n   Type "DELETE" to confirm: ',
      answer => {
        rl.close();
        resolve(answer === 'DELETE');
      }
    );
  });
}

async function deleteEntries(environment, contentType) {
  try {
    console.log(`\n📋 Processing ${contentType} entries...`);

    // Get all entries of this content type
    const entries = await environment.getEntries({
      content_type: contentType,
      limit: 1000,
    });

    if (entries.items.length === 0) {
      console.log(`   ℹ️  No ${contentType} entries found`);
      return { deleted: 0, failed: 0 };
    }

    console.log(`   Found ${entries.items.length} ${contentType} entries`);

    let deleted = 0;
    let failed = 0;

    for (const entry of entries.items) {
      try {
        if (DRY_RUN) {
          console.log(
            `   [DRY RUN] Would delete: ${entry.fields.title?.['en-US'] || entry.fields.name?.['en-US'] || entry.sys.id}`
          );
          deleted++;
        } else {
          // Unpublish if published
          if (entry.isPublished()) {
            console.log(
              `   📤 Unpublishing: ${entry.fields.title?.['en-US'] || entry.fields.name?.['en-US'] || entry.sys.id}`
            );
            await entry.unpublish();
          }

          // Delete entry
          console.log(
            `   🗑️  Deleting: ${entry.fields.title?.['en-US'] || entry.fields.name?.['en-US'] || entry.sys.id}`
          );
          await entry.delete();
          deleted++;
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(
          `   ❌ Failed to delete entry ${entry.sys.id}:`,
          error.message
        );
        failed++;
      }
    }

    console.log(`   ✅ ${contentType}: ${deleted} deleted, ${failed} failed`);
    return { deleted, failed };
  } catch (error) {
    console.error(
      `❌ Failed to process ${contentType} entries:`,
      error.message
    );
    return { deleted: 0, failed: 0 };
  }
}

async function getHomepageAssetIds(environment) {
  // Skip if homepage is being deleted
  if (INCLUDE_HOMEPAGE) {
    return new Set();
  }

  try {
    const homepageAssetIds = new Set();

    console.log('\n🔍 Finding assets used by homepage content...');

    for (const contentType of HOMEPAGE_CONTENT_TYPES) {
      try {
        const entries = await environment.getEntries({
          content_type: contentType,
          limit: 1000,
        });

        for (const entry of entries.items) {
          // Check for direct asset links
          Object.values(entry.fields).forEach(field => {
            if (field && field['en-US']) {
              const value = field['en-US'];
              // Check if it's an asset link
              if (
                value?.sys?.type === 'Link' &&
                value?.sys?.linkType === 'Asset'
              ) {
                homepageAssetIds.add(value.sys.id);
              }
              // Check if it's an array of asset links
              if (Array.isArray(value)) {
                value.forEach(item => {
                  if (
                    item?.sys?.type === 'Link' &&
                    item?.sys?.linkType === 'Asset'
                  ) {
                    homepageAssetIds.add(item.sys.id);
                  }
                });
              }
            }
          });
        }
      } catch (error) {
        console.warn(`   ⚠️  Could not process ${contentType}:`, error.message);
      }
    }

    console.log(`   Found ${homepageAssetIds.size} assets used by homepage`);
    return homepageAssetIds;
  } catch (error) {
    console.error('❌ Failed to get homepage assets:', error.message);
    return new Set();
  }
}

async function deleteAssets(environment) {
  try {
    console.log('\n🖼️  Processing assets...');

    // Get homepage asset IDs to preserve
    const homepageAssetIds = await getHomepageAssetIds(environment);

    // Get all assets
    const assets = await environment.getAssets({
      limit: 1000,
    });

    if (assets.items.length === 0) {
      console.log('   ℹ️  No assets found');
      return { deleted: 0, failed: 0, preserved: 0 };
    }

    console.log(`   Found ${assets.items.length} total assets`);

    let deleted = 0;
    let failed = 0;
    let preserved = 0;

    for (const asset of assets.items) {
      try {
        // Skip homepage assets
        if (homepageAssetIds.has(asset.sys.id)) {
          console.log(
            `   🔒 Preserving homepage asset: ${asset.fields.title?.['en-US'] || asset.sys.id}`
          );
          preserved++;
          continue;
        }

        if (DRY_RUN) {
          console.log(
            `   [DRY RUN] Would delete: ${asset.fields.title?.['en-US'] || asset.sys.id}`
          );
          deleted++;
        } else {
          // Unpublish if published
          if (asset.isPublished()) {
            console.log(
              `   📤 Unpublishing: ${asset.fields.title?.['en-US'] || asset.sys.id}`
            );
            await asset.unpublish();
          }

          // Delete asset
          console.log(
            `   🗑️  Deleting: ${asset.fields.title?.['en-US'] || asset.sys.id}`
          );
          await asset.delete();
          deleted++;
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(
          `   ❌ Failed to delete asset ${asset.sys.id}:`,
          error.message
        );
        failed++;
      }
    }

    console.log(
      `   ✅ Assets: ${deleted} deleted, ${preserved} preserved, ${failed} failed`
    );
    return { deleted, failed, preserved };
  } catch (error) {
    console.error('❌ Failed to process assets:', error.message);
    return { deleted: 0, failed: 0, preserved: 0 };
  }
}

function clearAssetMapping() {
  try {
    const mappingPath = path.join(
      process.cwd(),
      'scripts',
      'asset-mapping.json'
    );

    if (fs.existsSync(mappingPath)) {
      if (DRY_RUN) {
        console.log(`\n[DRY RUN] Would clear asset mapping: ${mappingPath}`);
      } else {
        fs.writeFileSync(mappingPath, '{}');
        console.log(`\n✅ Cleared asset mapping: ${mappingPath}`);
      }
    } else {
      console.log('\nℹ️  No asset mapping file found (nothing to clear)');
    }
  } catch (error) {
    console.error('❌ Failed to clear asset mapping:', error.message);
  }
}

async function deleteContent() {
  try {
    // Confirm deletion
    const confirmed = await confirmDeletion();

    if (!confirmed) {
      console.log('\n❌ Deletion cancelled by user');
      process.exit(0);
    }

    if (DRY_RUN) {
      console.log(
        '\n🧪 Running in dry-run mode - no actual deletions will occur\n'
      );
    }

    // Create Contentful Management client
    const client = createClient({
      accessToken: MANAGEMENT_TOKEN,
    });

    // Get space and environment
    console.log('\n📡 Connecting to Contentful...');
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment(ENVIRONMENT);
    console.log('✅ Connected successfully!');

    // Track overall statistics
    let totalDeleted = 0;
    let totalFailed = 0;

    // Delete entries for each content type
    console.log('\n🗂️  Deleting content entries...');
    const contentTypesToDelete = INCLUDE_HOMEPAGE
      ? [...CONTENT_TYPES, ...HOMEPAGE_CONTENT_TYPES]
      : CONTENT_TYPES;

    for (const contentType of contentTypesToDelete) {
      const result = await deleteEntries(environment, contentType);
      totalDeleted += result.deleted;
      totalFailed += result.failed;
    }

    // Delete assets
    console.log('\n🖼️  Deleting assets (preserving homepage assets)...');
    const assetResult = await deleteAssets(environment);
    totalDeleted += assetResult.deleted;
    totalFailed += assetResult.failed;

    // Clear asset mapping
    clearAssetMapping();

    // Summary
    console.log('\n🎉 Content deletion completed!');
    console.log('\n📊 Summary:');
    console.log(`   ✅ Total deleted: ${totalDeleted}`);
    console.log(`   🔒 Homepage assets preserved: ${assetResult.preserved}`);
    console.log(`   ❌ Total failed: ${totalFailed}`);

    if (DRY_RUN) {
      console.log(
        '\n💡 This was a dry run. Run without --dry-run to perform actual deletion.'
      );
    } else if (totalFailed > 0) {
      console.log(
        '\n⚠️  Some items failed to delete. You may need to run this script again.'
      );
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Content deletion failed:', error.message);
    process.exit(1);
  }
}

// Handle process termination gracefully
process.on('SIGINT', () => {
  console.log('\n⚠️  Deletion process interrupted by user');
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('\n⚠️  Deletion process terminated');
  process.exit(1);
});

// Run the deletion
deleteContent();
