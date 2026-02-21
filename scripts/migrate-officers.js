#!/usr/bin/env node

import pkg from 'contentful-management';
const { createClient } = pkg;
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

console.log('🚀 Starting officers migration...');
console.log(`   Space ID: ${SPACE_ID}`);
console.log(`   Environment: ${ENVIRONMENT}`);

// Load officers data from external file
const dataFilePath = path.join(__dirname, 'officers-data.json');

if (!fs.existsSync(dataFilePath)) {
  console.error('❌ Officers data file not found!');
  console.error(`   Expected location: ${dataFilePath}`);
  console.error(
    '   Please create officers-data.json based on officers-data.template.json'
  );
  process.exit(1);
}

let officersData;
try {
  const fileContent = fs.readFileSync(dataFilePath, 'utf8');
  officersData = JSON.parse(fileContent);
} catch (error) {
  console.error(
    '❌ Failed to read or parse officers data file:',
    error.message
  );
  process.exit(1);
}

const { boardOfDirectors, directors, advisors, pastPresidents } = officersData;

if (
  !boardOfDirectors ||
  !directors ||
  !advisors ||
  !pastPresidents ||
  !Array.isArray(boardOfDirectors) ||
  !Array.isArray(directors) ||
  !Array.isArray(advisors) ||
  !Array.isArray(pastPresidents)
) {
  console.error('❌ Invalid officers data structure in officers-data.json');
  console.error(
    '   Please ensure the file contains boardOfDirectors, directors, advisors, and pastPresidents arrays'
  );
  process.exit(1);
}

const allOfficers = [...boardOfDirectors, ...directors, ...advisors];

async function migrateOfficer(client, environment, officer) {
  try {
    console.log(`👤 Migrating: ${officer.name} - ${officer.position}`);

    // Create officer entry
    const officerEntry = {
      fields: {
        name: { 'en-US': officer.name },
        position: { 'en-US': officer.position },
        term: { 'en-US': officer.term },
        responsibilities: { 'en-US': officer.responsibilities },
        category: { 'en-US': officer.category },
        displayOrder: { 'en-US': officer.displayOrder },
      },
    };

    // Add optional fields
    if (officer.email) {
      officerEntry.fields.email = { 'en-US': officer.email };
    }

    if (officer.phone) {
      officerEntry.fields.phone = { 'en-US': officer.phone };
    }

    if (officer.socialMedia) {
      officerEntry.fields.socialMediaLinks = { 'en-US': officer.socialMedia };
    }

    // Check if officer already exists
    try {
      const existingEntries = await environment.getEntries({
        content_type: 'officer',
        'fields.name': officer.name,
        'fields.term': officer.term,
        'fields.position': officer.position,
      });

      if (existingEntries.items.length > 0) {
        console.log(
          `⚠️  Officer "${officer.name}" (${officer.position}) already exists, skipping...`
        );
        return { status: 'skipped' };
      }
    } catch (error) {
      // Content type doesn't exist or is in an inconsistent state, proceed with creation
      console.log(
        `   ℹ️  Cannot check for duplicates, proceeding with creation...`
      );
    }

    // Create and publish entry
    const entry = await environment.createEntry('officer', officerEntry);
    await entry.publish();

    console.log(`✅ Migrated: ${officer.name} (ID: ${entry.sys.id})`);
    return { status: 'success' };
  } catch (error) {
    console.error(`❌ Failed to migrate ${officer.name}:`, error.message);
    throw error;
  }
}

async function migratePastPresident(client, environment, pastPresident) {
  try {
    console.log(
      `🏆 Migrating Past President: ${pastPresident.name} (${pastPresident.term})`
    );

    // Create past president entry
    const pastPresidentEntry = {
      fields: {
        term: { 'en-US': pastPresident.term },
        name: { 'en-US': pastPresident.name },
        displayOrder: { 'en-US': pastPresident.displayOrder },
      },
    };

    // Add optional status field
    if (pastPresident.status) {
      pastPresidentEntry.fields.status = { 'en-US': pastPresident.status };
    }

    // Check if past president already exists
    try {
      const existingEntries = await environment.getEntries({
        content_type: 'pastPresident',
        'fields.term': pastPresident.term,
      });

      if (existingEntries.items.length > 0) {
        console.log(
          `⚠️  Past President "${pastPresident.name}" (${pastPresident.term}) already exists, skipping...`
        );
        return { status: 'skipped' };
      }
    } catch (error) {
      // Content type doesn't exist or is in an inconsistent state, proceed with creation
      console.log(
        `   ℹ️  Cannot check for duplicates, proceeding with creation...`
      );
    }

    // Create and publish entry
    const entry = await environment.createEntry(
      'pastPresident',
      pastPresidentEntry
    );
    await entry.publish();

    console.log(
      `✅ Migrated Past President: ${pastPresident.name} (ID: ${entry.sys.id})`
    );
    return { status: 'success' };
  } catch (error) {
    console.error(
      `❌ Failed to migrate Past President ${pastPresident.name}:`,
      error.message
    );
    throw error;
  }
}

async function migrateOfficers() {
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

    console.log(
      `\n📋 Found ${allOfficers.length} officers and ${pastPresidents.length} past presidents to migrate\n`
    );

    // Migrate officers
    let officersMigrated = 0;
    let officersSkipped = 0;
    let officersFailed = 0;

    console.log('👥 Migrating current officers...\n');

    for (const officer of allOfficers) {
      try {
        const result = await migrateOfficer(client, environment, officer);
        if (result?.status === 'skipped') {
          officersSkipped++;
        } else {
          officersMigrated++;
        }
      } catch (error) {
        console.error(`❌ Failed to migrate ${officer.name}:`, error.message);
        officersFailed++;
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Migrate past presidents
    let pastPresidentsMigrated = 0;
    let pastPresidentsSkipped = 0;
    let pastPresidentsFailed = 0;

    console.log('\n🏆 Migrating past presidents...\n');

    for (const pastPresident of pastPresidents) {
      try {
        const result = await migratePastPresident(
          client,
          environment,
          pastPresident
        );
        if (result?.status === 'skipped') {
          pastPresidentsSkipped++;
        } else {
          pastPresidentsMigrated++;
        }
      } catch (error) {
        console.error(
          `❌ Failed to migrate Past President ${pastPresident.name}:`,
          error.message
        );
        pastPresidentsFailed++;
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    console.log('\n🎉 Officers migration completed!');
    console.log('\n📊 Summary:');
    console.log('👥 Officers:');
    console.log(`   ✅ Migrated: ${officersMigrated}`);
    console.log(`   ⚠️  Skipped: ${officersSkipped}`);
    console.log(`   ❌ Failed: ${officersFailed}`);
    console.log('🏆 Past Presidents:');
    console.log(`   ✅ Migrated: ${pastPresidentsMigrated}`);
    console.log(`   ⚠️  Skipped: ${pastPresidentsSkipped}`);
    console.log(`   ❌ Failed: ${pastPresidentsFailed}`);
  } catch (error) {
    console.error('❌ Officers migration failed:', error.message);
    process.exit(1);
  }
}

// Run the migration
migrateOfficers();
