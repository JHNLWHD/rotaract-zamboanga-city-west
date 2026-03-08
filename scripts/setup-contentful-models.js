#!/usr/bin/env node

import pkg from 'contentful-management';
const { createClient } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// Environment variables
const SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT = process.env.VITE_CONTENTFUL_ENVIRONMENT || 'master';

// Validation
if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('❌ Missing required environment variables:');
  console.error('   VITE_CONTENTFUL_SPACE_ID');
  console.error('   CONTENTFUL_MANAGEMENT_TOKEN');
  process.exit(1);
}

console.log('🚀 Setting up Contentful content models...');
console.log(`   Space ID: ${SPACE_ID}`);
console.log(`   Environment: ${ENVIRONMENT}`);

// Content type definitions
const contentTypes = [
  {
    sys: {
      id: 'project',
    },
    name: 'Project',
    displayField: 'title',
    description: 'Community service projects and initiatives',
    fields: [
      {
        id: 'title',
        name: 'Title',
        type: 'Symbol',
        required: true,
        validations: [{ size: { max: 200 } }],
      },
      {
        id: 'slug',
        name: 'Slug',
        type: 'Symbol',
        required: true,
        validations: [
          { unique: true },
          { size: { max: 100 } },
          { regexp: { pattern: '^[a-z0-9-]+$' } },
        ],
      },
      {
        id: 'shortDescription',
        name: 'Short Description',
        type: 'Text',
        required: true,
        validations: [{ size: { max: 300 } }],
      },
      {
        id: 'description',
        name: 'Description',
        type: 'RichText',
        required: true,
      },
      {
        id: 'date',
        name: 'Date',
        type: 'Date',
        required: true,
      },
      {
        id: 'venue',
        name: 'Venue',
        type: 'Symbol',
        required: true,
        validations: [{ size: { max: 200 } }],
      },
      {
        id: 'impact',
        name: 'Impact',
        type: 'Text',
        required: true,
        validations: [{ size: { max: 500 } }],
      },
      {
        id: 'partners',
        name: 'Partners',
        type: 'Array',
        required: false,
        items: {
          type: 'Symbol',
          validations: [{ size: { max: 100 } }],
        },
      },
      {
        id: 'facebookLink',
        name: 'Facebook Link',
        type: 'Symbol',
        required: false,
        validations: [
          { regexp: { pattern: '^https://www\\.facebook\\.com/' } },
        ],
      },
      {
        id: 'shareableLink',
        name: 'Shareable Link',
        type: 'Symbol',
        required: true,
        validations: [{ regexp: { pattern: '^https?://' } }],
      },
      {
        id: 'featuredImage',
        name: 'Featured Image',
        type: 'Link',
        linkType: 'Asset',
        required: true,
        validations: [{ linkMimetypeGroup: ['image'] }],
      },
      {
        id: 'category',
        name: 'Category',
        type: 'Symbol',
        required: true,
        validations: [
          {
            in: [
              'Health & Wellness',
              'Education & Youth',
              'Environment',
              'Food Security',
              'Community Development',
            ],
          },
        ],
      },
      {
        id: 'hashtags',
        name: 'Hashtags',
        type: 'Array',
        required: false,
        items: {
          type: 'Symbol',
          validations: [{ regexp: { pattern: '^#[a-zA-Z0-9]+$' } }],
        },
      },
      {
        id: 'highlights',
        name: 'Highlights',
        type: 'Array',
        required: false,
        items: {
          type: 'Symbol',
          validations: [{ size: { max: 100 } }],
        },
      },
      {
        id: 'gallery',
        name: 'Gallery',
        type: 'Array',
        required: false,
        items: {
          type: 'Link',
          linkType: 'Asset',
          validations: [{ linkMimetypeGroup: ['image'] }],
        },
      },
      {
        id: 'bulletPoints',
        name: 'Bullet Points',
        type: 'Array',
        required: false,
        items: {
          type: 'Symbol',
          validations: [{ size: { max: 200 } }],
        },
      },
      {
        id: 'partnerLinks',
        name: 'Partner Links',
        type: 'Object',
        required: false,
      },
    ],
  },
  {
    sys: {
      id: 'event',
    },
    name: 'Event',
    displayField: 'title',
    description: 'Club events and activities',
    fields: [
      {
        id: 'title',
        name: 'Title',
        type: 'Symbol',
        required: true,
        validations: [{ size: { max: 200 } }],
      },
      {
        id: 'slug',
        name: 'Slug',
        type: 'Symbol',
        required: true,
        validations: [
          { unique: true },
          { size: { max: 100 } },
          { regexp: { pattern: '^[a-z0-9-]+$' } },
        ],
      },
      {
        id: 'description',
        name: 'Description',
        type: 'RichText',
        required: true,
      },
      {
        id: 'date',
        name: 'Date',
        type: 'Date',
        required: true,
      },
      {
        id: 'time',
        name: 'Time',
        type: 'Symbol',
        required: true,
        validations: [{ size: { max: 50 } }],
      },
      {
        id: 'venue',
        name: 'Venue',
        type: 'Symbol',
        required: true,
        validations: [{ size: { max: 200 } }],
      },
      {
        id: 'category',
        name: 'Category',
        type: 'Symbol',
        required: true,
        validations: [
          {
            in: [
              'Training',
              'Strategic Planning',
              'Ceremony',
              'Fellowship',
              'Community Service',
              'Fundraising',
            ],
          },
        ],
      },
      {
        id: 'status',
        name: 'Status',
        type: 'Symbol',
        required: true,
        validations: [
          {
            in: ['upcoming', 'registration_open', 'past'],
          },
        ],
      },
      {
        id: 'registrationUrl',
        name: 'Registration URL',
        type: 'Symbol',
        required: false,
        validations: [{ regexp: { pattern: '^https?://' } }],
      },
      {
        id: 'shareableLink',
        name: 'Shareable Link',
        type: 'Symbol',
        required: true,
        validations: [{ regexp: { pattern: '^https?://' } }],
      },
      {
        id: 'featuredImage',
        name: 'Featured Image',
        type: 'Link',
        linkType: 'Asset',
        required: true,
        validations: [{ linkMimetypeGroup: ['image'] }],
      },
      {
        id: 'invitationImage',
        name: 'Invitation Image',
        type: 'Link',
        linkType: 'Asset',
        required: false,
        validations: [{ linkMimetypeGroup: ['image'] }],
      },
      {
        id: 'highlights',
        name: 'Highlights',
        type: 'Array',
        required: false,
        items: {
          type: 'Symbol',
          validations: [{ size: { max: 200 } }],
        },
      },
      {
        id: 'agenda',
        name: 'Agenda',
        type: 'Array',
        required: false,
        items: {
          type: 'Symbol',
          validations: [{ size: { max: 200 } }],
        },
      },
      {
        id: 'requirements',
        name: 'Requirements',
        type: 'Array',
        required: false,
        items: {
          type: 'Symbol',
          validations: [{ size: { max: 200 } }],
        },
      },
      {
        id: 'gallery',
        name: 'Gallery',
        type: 'Array',
        required: false,
        items: {
          type: 'Link',
          linkType: 'Asset',
          validations: [{ linkMimetypeGroup: ['image'] }],
        },
      },
    ],
  },
  {
    sys: {
      id: 'officer',
    },
    name: 'Officer',
    displayField: 'name',
    description: 'Club officers and board members',
    fields: [
      {
        id: 'name',
        name: 'Name',
        type: 'Symbol',
        required: true,
        validations: [{ size: { max: 100 } }],
      },
      {
        id: 'position',
        name: 'Position',
        type: 'Symbol',
        required: true,
        validations: [{ size: { max: 100 } }],
      },
      {
        id: 'term',
        name: 'Term',
        type: 'Symbol',
        required: true,
        validations: [{ regexp: { pattern: '^\\d{4}-\\d{4}$' } }],
      },
      {
        id: 'responsibilities',
        name: 'Responsibilities',
        type: 'Text',
        required: true,
        validations: [{ size: { max: 300 } }],
      },
      {
        id: 'category',
        name: 'Category',
        type: 'Symbol',
        required: true,
        validations: [
          {
            in: ['Executive', 'Director', 'Advisor'],
          },
        ],
      },
      {
        id: 'email',
        name: 'Email',
        type: 'Symbol',
        required: false,
        validations: [{ regexp: { pattern: '^[^@]+@[^@]+\\.[^@]+$' } }],
      },
      {
        id: 'phone',
        name: 'Phone',
        type: 'Symbol',
        required: false,
        validations: [{ size: { max: 20 } }],
      },
      {
        id: 'profileImage',
        name: 'Profile Image',
        type: 'Link',
        linkType: 'Asset',
        required: false,
        validations: [{ linkMimetypeGroup: ['image'] }],
      },
      {
        id: 'socialMediaLinks',
        name: 'Social Media Links',
        type: 'Object',
        required: false,
      },
      {
        id: 'displayOrder',
        name: 'Display Order',
        type: 'Integer',
        required: true,
        validations: [{ range: { min: 0 } }],
      },
    ],
  },
  {
    sys: {
      id: 'pastPresident',
    },
    name: 'Past President',
    displayField: 'name',
    description: 'Historical record of past club presidents',
    fields: [
      {
        id: 'term',
        name: 'Term',
        type: 'Symbol',
        required: true,
        validations: [{ regexp: { pattern: '^\\d{4}-\\d{4}$' } }],
      },
      {
        id: 'name',
        name: 'Name',
        type: 'Symbol',
        required: true,
        validations: [{ size: { max: 100 } }],
      },
      {
        id: 'status',
        name: 'Status',
        type: 'Symbol',
        required: false,
        validations: [
          {
            in: ['current', 'president_elect', 'future'],
          },
        ],
      },
      {
        id: 'displayOrder',
        name: 'Display Order',
        type: 'Integer',
        required: true,
        validations: [{ range: { min: 0 } }],
      },
    ],
  },
  {
    sys: {
      id: 'statItem',
    },
    name: 'Stat Item',
    displayField: 'description',
    description: 'Reusable stat items for homepage sections',
    fields: [
      {
        id: 'value',
        name: 'Value',
        type: 'Symbol',
        required: true,
        validations: [{ size: { max: 50 } }],
      },
      {
        id: 'description',
        name: 'Description',
        type: 'Symbol',
        required: true,
        validations: [{ size: { max: 100 } }],
      },
      {
        id: 'icon',
        name: 'Icon',
        type: 'Symbol',
        required: false,
        validations: [{ size: { max: 50 } }],
      },
    ],
  },
  {
    sys: {
      id: 'homepageHeroSection',
    },
    name: 'Homepage Hero Section',
    displayField: 'badgeText',
    description: 'Hero section content for homepage',
    fields: [
      {
        id: 'badgeText',
        name: 'Badge Text',
        type: 'Symbol',
        required: true,
        validations: [{ size: { max: 100 } }],
      },
      {
        id: 'subTitle',
        name: 'Subtitle',
        type: 'Text',
        required: true,
        validations: [{ size: { max: 500 } }],
      },
      {
        id: 'stats',
        name: 'Stats',
        type: 'Array',
        required: false,
        items: {
          type: 'Link',
          linkType: 'Entry',
          validations: [{ linkContentType: ['statItem'] }],
        },
      },
    ],
  },
  {
    sys: {
      id: 'homepageAboutSection',
    },
    name: 'Homepage About Section',
    displayField: 'title',
    description: 'About section content for homepage',
    fields: [
      {
        id: 'title',
        name: 'Title',
        type: 'Symbol',
        required: true,
        validations: [{ size: { max: 100 } }],
      },
      {
        id: 'ourStory',
        name: 'Our Story',
        type: 'Text',
        required: true,
        validations: [{ size: { max: 2000 } }],
      },
      {
        id: 'stats',
        name: 'Stats',
        type: 'Array',
        required: false,
        items: {
          type: 'Link',
          linkType: 'Entry',
          validations: [{ linkContentType: ['statItem'] }],
        },
      },
      {
        id: 'image',
        name: 'Image',
        type: 'Link',
        linkType: 'Asset',
        required: false,
        validations: [{ linkMimetypeGroup: ['image'] }],
      },
    ],
  },
  {
    sys: {
      id: 'cardsAwards',
    },
    name: 'Award Card',
    displayField: 'name',
    description: 'Individual award cards with details',
    fields: [
      {
        id: 'name',
        name: 'Name',
        type: 'Symbol',
        required: true,
        validations: [{ size: { max: 100 } }],
      },
      {
        id: 'shortDescription',
        name: 'Short Description',
        type: 'Symbol',
        required: true,
        validations: [{ size: { max: 200 } }],
      },
      {
        id: 'description',
        name: 'Description',
        type: 'Symbol',
        required: true,
        validations: [{ size: { max: 500 } }],
      },
      {
        id: 'icon',
        name: 'Icon',
        type: 'Symbol',
        required: true,
        validations: [{ size: { max: 50 } }],
      },
      {
        id: 'yearReceived',
        name: 'Year Received',
        type: 'Symbol',
        required: true,
        validations: [{ size: { max: 20 } }],
      },
      {
        id: 'dateReceived',
        name: 'Date Received',
        type: 'Date',
        required: true,
      },
      {
        id: 'color',
        name: 'Color',
        type: 'Symbol',
        required: true,
        validations: [
          {
            in: [
              'blue',
              'red',
              'green',
              'purple',
              'yellow',
              'indigo',
              'pink',
              'gray',
            ],
          },
        ],
      },
      {
        id: 'isFeatured',
        name: 'Is Featured',
        type: 'Boolean',
        required: true,
      },
      {
        id: 'image',
        name: 'Image',
        type: 'Link',
        linkType: 'Asset',
        required: false,
        validations: [{ linkMimetypeGroup: ['image'] }],
      },
    ],
  },
  {
    sys: {
      id: 'homepageAwardsSection',
    },
    name: 'Homepage Awards Section',
    displayField: 'title',
    description: 'Awards section content for homepage',
    fields: [
      {
        id: 'title',
        name: 'Title',
        type: 'Symbol',
        required: true,
        validations: [{ size: { max: 100 } }],
      },
      {
        id: 'cards',
        name: 'Award Cards',
        type: 'Array',
        required: false,
        items: {
          type: 'Link',
          linkType: 'Entry',
          validations: [{ linkContentType: ['cardsAwards'] }],
        },
      },
    ],
  },
];

async function setupContentTypes() {
  try {
    console.log('🔧 Creating client...');
    console.log(`   Space: ${SPACE_ID}`);
    console.log(`   Environment: ${ENVIRONMENT}`);

    // Create Contentful Management client
    const client = createClient({
      accessToken: MANAGEMENT_TOKEN,
    });

    // Get space and environment
    console.log('📡 Connecting to Contentful...');
    const space = await client.getSpace(SPACE_ID);
    console.log('✅ Got space successfully');
    const environment = await space.getEnvironment(ENVIRONMENT);
    console.log('✅ Got environment successfully');

    console.log('✅ Connected successfully!');

    // Track success/failure of content type creation
    const results = [];

    // Create each content type
    for (const contentTypeData of contentTypes) {
      const contentTypeId = contentTypeData.sys.id;
      const contentTypeName = contentTypeData.name;

      try {
        console.log(
          `\n🔍 Checking if content type "${contentTypeName}" exists...`
        );

        // Check if content type already exists
        let contentType;
        try {
          contentType = await environment.getContentType(contentTypeId);
          console.log(
            `⚠️  Content type "${contentTypeName}" already exists, deleting entries and recreating...`
          );

          // First, try to get all entries of this content type
          try {
            console.log(
              `   🔍 Fetching entries for content type "${contentTypeName}"...`
            );
            const entries = await environment.getEntries({
              content_type: contentTypeId,
              limit: 1000,
            });

            if (entries.items.length > 0) {
              console.log(
                `   📋 Found ${entries.items.length} entries, deleting...`
              );

              // Unpublish and delete each entry
              for (const entry of entries.items) {
                try {
                  if (entry.isPublished()) {
                    await entry.unpublish();
                    console.log(`      ✓ Unpublished entry: ${entry.sys.id}`);
                  }
                  await entry.delete();
                  console.log(`      🗑️  Deleted entry: ${entry.sys.id}`);
                } catch (entryError) {
                  console.log(
                    `      ⚠️  Error deleting entry ${entry.sys.id}: ${entryError.message}`
                  );
                }
              }
            } else {
              console.log(`   ℹ️  No entries found for this content type`);
            }
          } catch (entriesError) {
            console.log(
              `   ⚠️  Could not fetch entries (${entriesError.message}), proceeding with content type deletion...`
            );
          }

          // Now unpublish and delete the content type
          if (contentType.isPublished()) {
            await contentType.unpublish();
            console.log(`   ✓ Unpublished content type "${contentTypeName}"`);
          }

          await contentType.delete();
          console.log(`   🗑️  Deleted content type "${contentTypeName}"`);

          // Wait a bit before recreating
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          if (error.name !== 'NotFound') {
            throw error;
          }
        }

        console.log(`🆕 Creating content type "${contentTypeName}"...`);

        // Create content type
        contentType = await environment.createContentTypeWithId(
          contentTypeId,
          contentTypeData
        );

        console.log(`📝 Publishing content type "${contentTypeName}"...`);

        // Publish content type
        await contentType.publish();

        console.log(
          `✅ Content type "${contentTypeName}" created and published successfully!`
        );
        results.push({ name: contentTypeName, success: true });
      } catch (error) {
        console.error(
          `❌ Error creating content type "${contentTypeName}":`,
          error.message
        );
        results.push({ name: contentTypeName, success: false, error: error.message });

        // Continue with other content types instead of failing completely
        continue;
      }
    }

    console.log('\n🎉 Content model setup completed!');
    console.log('\n📋 Summary:');
    
    // Display results with actual status
    const successCount = results.filter(r => r.success).length;
    const failureCount = results.filter(r => !r.success).length;
    
    for (const result of results) {
      if (result.success) {
        console.log(`   ✅ ${result.name} content type`);
      } else {
        console.log(`   ❌ ${result.name} content type - ${result.error}`);
      }
    }
    
    console.log(`\n📊 Results: ${successCount} succeeded, ${failureCount} failed`);
    
    if (failureCount > 0) {
      console.log('\n⚠️  Some content types failed to create. Review the errors above.');
      process.exit(1);
    }
    
    console.log('\n🚀 Ready for data migration!');
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run the setup
setupContentTypes();
