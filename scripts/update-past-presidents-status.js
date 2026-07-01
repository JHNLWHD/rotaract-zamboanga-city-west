#!/usr/bin/env node

import pkg from 'contentful-management';
const { createClient } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT = process.env.VITE_CONTENTFUL_ENVIRONMENT || 'master';

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('❌ Missing required environment variables:');
  console.error('   VITE_CONTENTFUL_SPACE_ID');
  console.error('   CONTENTFUL_MANAGEMENT_TOKEN');
  process.exit(1);
}

const statusUpdates = [
  { term: '2025-2026', status: undefined },
  { term: '2026-2027', status: 'current' },
  { term: '2027-2028', status: 'president_elect' },
];

async function updateStatus(environment, term, status) {
  const existingEntries = await environment.getEntries({
    content_type: 'pastPresident',
    'fields.term': term,
  });

  if (existingEntries.items.length === 0) {
    console.log(`⚠️  No pastPresident entry found for term "${term}", skipping...`);
    return;
  }

  const entry = existingEntries.items[0];
  const currentStatus = entry.fields.status?.['en-US'];

  if (currentStatus === status) {
    console.log(`ℹ️  "${term}" already has status "${status ?? '(none)'}", no change needed`);
    return;
  }

  if (status === undefined) {
    delete entry.fields.status;
  } else {
    entry.fields.status = { 'en-US': status };
  }

  const updatedEntry = await entry.update();
  await updatedEntry.publish();

  console.log(`✅ Updated "${term}": status "${currentStatus ?? '(none)'}" → "${status ?? '(none)'}"`);
}

async function run() {
  try {
    const client = createClient({ accessToken: MANAGEMENT_TOKEN });
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment(ENVIRONMENT);

    console.log('🚀 Updating past president statuses for term rollover...\n');

    for (const { term, status } of statusUpdates) {
      await updateStatus(environment, term, status);
    }

    console.log('\n🎉 Past president status update completed!');
  } catch (error) {
    console.error('❌ Status update failed:', error.message);
    process.exit(1);
  }
}

run();
