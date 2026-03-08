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

console.log('🚀 Starting homepage migration...');
console.log(`   Space ID: ${SPACE_ID}`);
console.log(`   Environment: ${ENVIRONMENT}`);

// Homepage data extracted from main branch
const homepageData = {
  hero: {
    badgeText: 'Empowering Young Leaders Since 2010',
    subTitle:
      'Where **fellowship**, **service**, and **leadership** unite to create lasting impact in our community.',
    stats: [
      { value: '14', description: 'Years of Impact', icon: 'award' },
      { value: '50', description: 'Active Members', icon: 'community' },
      { value: '100', description: 'Projects Completed', icon: 'globe' },
    ],
  },
  about: {
    ourStory:
      'Since 2010, the Rotaract Club of Zamboanga City West has brought together young Zamboangueño professionals who are passionate about creating positive change. We celebrate our local culture and heritage while working together to build a better future for our city and the nation. \n\n Chartered under Rotary International District 3850 and sponsored by the Rotary Club of Zamboanga City West, we are driven by our motto "*Fellowship Through Service*." By taking part in creative service projects, professional development programs, and meaningful connections, we continually build our skills and deepen the bonds that unite us through *"Service Above Self."*',
    stats: [
      { value: '14+', description: 'Years of Impact', icon: 'award' },
      { value: '50+', description: 'Active Members', icon: 'community' },
      { value: '100+', description: 'Projects Completed', icon: 'globe' },
      { value: '5000+', description: 'Lives Touched', icon: 'heart' },
    ],
  },
  awards: [
    {
      name: 'GEAR',
      year: '2021-2025',
      yearReceived: '2021-2025',
      dateReceived: '2021-07-01',
      icon: 'award',
      color: 'blue',
      isFeatured: true,
      shortDescription:
        'Groundbreaking and Exemplary Accomplishments of Rotaractors',
      description:
        'Global Excellence Achievement Recognition (GEAR: Groundbreaking and Exemplary Accomplishments of Rotaractors) for the years 2021-2025.',
    },
    {
      name: 'Gear Awards - Exemplary Rotaract Club',
      year: '2020-2021',
      yearReceived: '2020-2021',
      dateReceived: '2020-07-01',
      icon: 'award',
      color: 'blue',
      isFeatured: true,
      shortDescription: 'Recognized as an Exemplary Rotaract Club',
      description:
        'Recognized as an Exemplary Rotaract Club in the Gear Awards (Groundbreaking and Exemplary Accomplishments of Rotaractors) for 2020-2021.',
    },
    {
      name: 'ROPA Asia-Pacific Winner',
      year: '2020-2021',
      yearReceived: '2020-2021',
      dateReceived: '2020-07-01',
      icon: 'star',
      color: 'indigo',
      isFeatured: true,
      shortDescription: 'Asia-Pacific Winner of ROPA',
      description:
        'Asia-Pacific Winner of the Rotaract Outstanding Performance Award (2020-2021).',
    },
    {
      name: 'ROPA',
      year: '2021',
      yearReceived: '2021',
      dateReceived: '2021-07-01',
      icon: 'star',
      color: 'purple',
      isFeatured: true,
      shortDescription: 'Rotaract Outstanding Performance Award',
      description:
        'Rotaract Outstanding Performance Award - Recognizing excellence in service and leadership.',
    },
    {
      name: 'EON',
      year: '2020',
      yearReceived: '2020',
      dateReceived: '2020-07-01',
      icon: 'trophy',
      color: 'yellow',
      isFeatured: true,
      shortDescription: 'Excellence in Outstanding Networks',
      description:
        'Excellence in Outstanding Networks - For building strong community connections.',
    },
    {
      name: 'EON Gold Prize',
      year: '2019-2020',
      yearReceived: '2019-2020',
      dateReceived: '2019-07-01',
      icon: 'trophy',
      color: 'yellow',
      isFeatured: true,
      shortDescription: 'Gold Prize for Excellence in Outstanding Networks',
      description:
        'Gold Prize for Excellence in Outstanding Networks (2019-2020).',
    },
    {
      name: 'ROPA Finalist',
      year: '2019-2020',
      yearReceived: '2019-2020',
      dateReceived: '2019-07-01',
      icon: 'star',
      color: 'purple',
      isFeatured: false,
      shortDescription: 'Finalist for ROPA',
      description:
        'Finalist for the Rotaract Outstanding Performance Award (2019-2020).',
    },
  ],
};

async function deleteExistingHomepageContent(environment) {
  try {
    console.log('\n🗑️  Checking for existing homepage content...');

    const contentTypes = [
      'homepageHeroSection',
      'homepageAboutSection',
      'homepageAwardsSection',
      'statItem',
      'cardsAwards',
    ];

    let totalDeleted = 0;

    for (const contentType of contentTypes) {
      try {
        const entries = await environment.getEntries({
          content_type: contentType,
          limit: 1000,
        });

        if (entries.items.length === 0) {
          continue;
        }

        console.log(`   Found ${entries.items.length} ${contentType} entries`);

        for (const entry of entries.items) {
          try {
            if (entry.isPublished()) {
              await entry.unpublish();
            }
            await entry.delete();
            totalDeleted++;
          } catch (error) {
            console.error(
              `   ⚠️  Failed to delete ${contentType} entry:`,
              error.message
            );
          }
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } catch (error) {
        console.error(
          `   ⚠️  Could not process ${contentType}:`,
          error.message
        );
      }
    }

    if (totalDeleted > 0) {
      console.log(`   ✅ Deleted ${totalDeleted} existing homepage entries`);
    } else {
      console.log('   ℹ️  No existing homepage content found');
    }
  } catch (error) {
    console.error('⚠️  Error during cleanup:', error.message);
  }
}

async function createStatItem(environment, stat) {
  try {
    const statEntry = {
      fields: {
        value: { 'en-US': stat.value },
        description: { 'en-US': stat.description },
        icon: { 'en-US': stat.icon || 'award' }, // Default to 'award' if not provided
      },
    };

    const entry = await environment.createEntry('statItem', statEntry);
    await entry.publish();

    console.log(`   ✅ Created stat: ${stat.description}`);
    return entry.sys.id;
  } catch (error) {
    console.error(
      `   ❌ Failed to create stat ${stat.description}:`,
      error.message
    );
    throw error;
  }
}

async function createAwardCard(environment, award) {
  try {
    const awardEntry = {
      fields: {
        name: { 'en-US': award.name },
        shortDescription: { 'en-US': award.shortDescription },
        description: { 'en-US': award.description },
        icon: { 'en-US': award.icon },
        yearReceived: { 'en-US': award.yearReceived },
        dateReceived: { 'en-US': award.dateReceived },
        color: { 'en-US': award.color },
        isFeatured: { 'en-US': award.isFeatured },
      },
    };

    const entry = await environment.createEntry('cardsAwards', awardEntry);
    await entry.publish();

    console.log(`   ✅ Created award: ${award.name}`);
    return entry.sys.id;
  } catch (error) {
    console.error(`   ❌ Failed to create award ${award.name}:`, error.message);
    throw error;
  }
}

async function migrateHomepage() {
  try {
    // Create Contentful Management client
    const client = createClient({
      accessToken: MANAGEMENT_TOKEN,
    });

    // Get space and environment
    console.log('📡 Connecting to Contentful...');
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment(ENVIRONMENT);
    console.log('✅ Connected successfully!');

    // Delete existing homepage content first
    await deleteExistingHomepageContent(environment);

    // Step 1: Create hero section stats
    console.log('\n📊 Creating hero section stats...');
    const heroStatIds = [];
    for (const stat of homepageData.hero.stats) {
      const statId = await createStatItem(environment, stat);
      heroStatIds.push(statId);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Step 2: Create hero section
    console.log('\n🦸 Creating hero section...');
    const heroEntry = {
      fields: {
        badgeText: { 'en-US': homepageData.hero.badgeText },
        subTitle: { 'en-US': homepageData.hero.subTitle },
        stats: {
          'en-US': heroStatIds.map(id => ({
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: id,
            },
          })),
        },
      },
    };

    const hero = await environment.createEntry(
      'homepageHeroSection',
      heroEntry
    );
    await hero.publish();
    console.log(`✅ Hero section created (ID: ${hero.sys.id})`);

    // Step 3: Create about section stats
    console.log('\n📊 Creating about section stats...');
    const aboutStatIds = [];
    for (const stat of homepageData.about.stats) {
      const statId = await createStatItem(environment, stat);
      aboutStatIds.push(statId);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Step 4: Create about section
    console.log('\n📖 Creating about section...');
    const aboutEntry = {
      fields: {
        title: { 'en-US': 'About Us' },
        ourStory: { 'en-US': homepageData.about.ourStory },
        stats: {
          'en-US': aboutStatIds.map(id => ({
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: id,
            },
          })),
        },
      },
    };

    const about = await environment.createEntry(
      'homepageAboutSection',
      aboutEntry
    );
    await about.publish();
    console.log(`✅ About section created (ID: ${about.sys.id})`);

    // Step 5: Create award cards
    console.log('\n🏆 Creating award cards...');
    const awardIds = [];
    for (const award of homepageData.awards) {
      const awardId = await createAwardCard(environment, award);
      awardIds.push(awardId);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Step 6: Create awards section
    console.log('\n🎖️  Creating awards section...');
    const awardsEntry = {
      fields: {
        title: { 'en-US': 'Awards & Recognition' },
        cards: {
          'en-US': awardIds.map(id => ({
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: id,
            },
          })),
        },
      },
    };

    const awards = await environment.createEntry(
      'homepageAwardsSection',
      awardsEntry
    );
    await awards.publish();
    console.log(`✅ Awards section created (ID: ${awards.sys.id})`);

    // Summary
    console.log('\n🎉 Homepage migration completed!');
    console.log('\n📊 Summary:');
    console.log(`   ✅ Hero section: 1 created`);
    console.log(`   ✅ Hero stats: ${heroStatIds.length} created`);
    console.log(`   ✅ About section: 1 created`);
    console.log(`   ✅ About stats: ${aboutStatIds.length} created`);
    console.log(`   ✅ Award cards: ${awardIds.length} created`);
    console.log(`   ✅ Awards section: 1 created`);
    console.log('\n💡 IMPORTANT: Update these Entry IDs in your hooks:');
    console.log('\n📝 Copy and paste these into your hook files:');
    console.log('\n// src/hooks/landing-page/heroSection.ts');
    console.log(`const DEFAULT_HERO_ENTRY_ID = '${hero.sys.id}';`);
    console.log('\n// src/hooks/landing-page/aboutCommunity.ts');
    console.log(`const DEFAULT_ABOUT_SECTION_ENTRY_ID = '${about.sys.id}';`);
    console.log('\n// src/hooks/landing-page/awardsSection.ts');
    console.log(
      `const DEFAULT_AWARDS_COMMUNITY_ENTRY_ID = '${awards.sys.id}';`
    );
    console.log('\n');
  } catch (error) {
    console.error('❌ Homepage migration failed:', error.message);
    process.exit(1);
  }
}

// Run the migration
migrateHomepage();
