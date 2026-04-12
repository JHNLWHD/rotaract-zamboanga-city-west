#!/usr/bin/env node
/**
 * Creates foundation giving content types ONLY if they do not exist.
 * Does not delete, modify, or recreate any other content types or entries.
 *
 * Run: npm run contentful:setup-foundation-giving
 * Requires: VITE_CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN, VITE_CONTENTFUL_ENVIRONMENT
 */

import pkg from 'contentful-management';
const { createClient } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT = process.env.VITE_CONTENTFUL_ENVIRONMENT || 'master';

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error(
    '❌ Missing VITE_CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN'
  );
  process.exit(1);
}

const rowType = {
  sys: { id: 'foundationGivingRow' },
  name: 'Foundation Giving Row',
  displayField: 'rotaryYearLabel',
  description: 'One Rotary year row for TRF club giving (USD)',
  fields: [
    {
      id: 'rotaryYearLabel',
      name: 'Rotary year label',
      type: 'Symbol',
      required: true,
      validations: [{ size: { max: 50 } }],
    },
    {
      id: 'sortOrder',
      name: 'Sort order',
      type: 'Integer',
      required: true,
    },
    {
      id: 'annualFund',
      name: 'Annual Fund (USD)',
      type: 'Number',
      required: true,
    },
    {
      id: 'polioPlusFund',
      name: 'PolioPlus Fund (USD)',
      type: 'Number',
      required: true,
    },
    {
      id: 'otherFund',
      name: 'Other Fund (USD)',
      type: 'Number',
      required: true,
    },
    {
      id: 'endowmentFund',
      name: 'Endowment Fund (USD)',
      type: 'Number',
      required: true,
    },
    {
      id: 'totalFund',
      name: 'Total (USD)',
      type: 'Number',
      required: true,
    },
  ],
};

const reportType = {
  sys: { id: 'foundationGivingReport' },
  name: 'Foundation Giving Report',
  displayField: 'reportTitle',
  description:
    'Singleton-style report: header, as-of date, row links, fund FAQs',
  fields: [
    {
      id: 'reportTitle',
      name: 'Report title',
      type: 'Symbol',
      required: true,
      validations: [{ size: { max: 120 } }],
    },
    {
      id: 'subtitle',
      name: 'Subtitle',
      type: 'Symbol',
      required: true,
      validations: [{ size: { max: 200 } }],
    },
    {
      id: 'currencyLabel',
      name: 'Currency label',
      type: 'Symbol',
      required: true,
      validations: [{ size: { max: 20 } }],
    },
    {
      id: 'asOfDate',
      name: 'As of date',
      type: 'Date',
      required: true,
    },
    {
      id: 'rows',
      name: 'Giving rows',
      type: 'Array',
      required: true,
      items: {
        type: 'Link',
        linkType: 'Entry',
        validations: [{ linkContentType: ['foundationGivingRow'] }],
      },
    },
    {
      id: 'faqAnnualFund',
      name: 'FAQ — Annual Fund',
      type: 'Text',
      required: true,
    },
    {
      id: 'faqPolioPlus',
      name: 'FAQ — PolioPlus',
      type: 'Text',
      required: true,
    },
    {
      id: 'faqOther',
      name: 'FAQ — Other Fund',
      type: 'Text',
      required: true,
    },
    {
      id: 'faqEndowment',
      name: 'FAQ — Endowment',
      type: 'Text',
      required: true,
    },
  ],
};

async function ensureContentType(environment, def) {
  const id = def.sys.id;
  try {
    await environment.getContentType(id);
    console.log(
      `ℹ️  Content type "${def.name}" (${id}) already exists — skipping (no changes).`
    );
    return 'skipped';
  } catch (e) {
    if (e.name !== 'NotFound') throw e;
  }

  console.log(`🆕 Creating content type "${def.name}" (${id})...`);
  const ct = await environment.createContentTypeWithId(id, def);
  await ct.publish();
  console.log(`✅ Published "${def.name}"`);
  return 'created';
}

async function main() {
  console.log('🚀 Foundation giving content models (additive only)');
  console.log(`   Space: ${SPACE_ID}, env: ${ENVIRONMENT}`);

  const client = createClient({ accessToken: MANAGEMENT_TOKEN });
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment(ENVIRONMENT);

  const a = await ensureContentType(environment, rowType);
  const b = await ensureContentType(environment, reportType);

  console.log('\n📋 Done:', {
    foundationGivingRow: a,
    foundationGivingReport: b,
  });
  console.log('   Next: npm run contentful:migrate-foundation-giving');
}

main().catch(err => {
  console.error('❌', err.message);
  process.exit(1);
});
