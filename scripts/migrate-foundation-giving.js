#!/usr/bin/env node
/**
 * Seeds one Foundation Giving Report and row entries (official club snapshot).
 * Skips if a foundationGivingReport entry already exists (use --force to replace
 * only foundation-giving entries created by this model — does not touch other types).
 *
 * Run: npm run contentful:migrate-foundation-giving
 */

import pkg from 'contentful-management';
const { createClient } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT = process.env.VITE_CONTENTFUL_ENVIRONMENT || 'master';
const LOCALE = 'en-US';

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error(
    '❌ Missing VITE_CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN'
  );
  process.exit(1);
}

const ROWS = [
  {
    rotaryYearLabel: 'RY 2021-2022',
    sortOrder: 1,
    annualFund: 4955.2,
    polioPlusFund: 25,
    otherFund: 0,
    endowmentFund: 0,
    totalFund: 4980.2,
  },
  {
    rotaryYearLabel: 'RY 2022-2023',
    sortOrder: 2,
    annualFund: 305.01,
    polioPlusFund: 0,
    otherFund: 0,
    endowmentFund: 0,
    totalFund: 305.01,
  },
  {
    rotaryYearLabel: 'RY 2023-2024',
    sortOrder: 3,
    annualFund: 432.29,
    polioPlusFund: 0,
    otherFund: 0,
    endowmentFund: 0,
    totalFund: 432.29,
  },
  {
    rotaryYearLabel: 'RY 2024-2025',
    sortOrder: 4,
    annualFund: 0,
    polioPlusFund: 220,
    otherFund: 0,
    endowmentFund: 0,
    totalFund: 220,
  },
  {
    rotaryYearLabel: 'RY 2025-2026',
    sortOrder: 5,
    annualFund: 0,
    polioPlusFund: 100,
    otherFund: 725,
    endowmentFund: 0,
    totalFund: 825,
  },
];

const FAQ = {
  faqAnnualFund:
    'Contributions to the Annual Fund support The Rotary Foundation’s grants and programs worldwide. They help fund humanitarian projects, scholarships, and district and global initiatives aligned with Rotary’s areas of focus.',
  faqPolioPlus:
    'PolioPlus giving supports the Global Polio Eradication Initiative—Rotary’s long-standing effort with partners to immunize children and end polio worldwide.',
  faqOther:
    'The “Other” column reflects gifts recorded in this category on the official Rotary Foundation club giving statement—such as designated or miscellaneous Foundation channels, as classified in Rotary’s reporting.',
  faqEndowment:
    'Endowment gifts help build permanent Foundation funding. The principal is invested, and earnings support Foundation programs over the long term.',
};

function rowFields(r) {
  return {
    rotaryYearLabel: { [LOCALE]: r.rotaryYearLabel },
    sortOrder: { [LOCALE]: r.sortOrder },
    annualFund: { [LOCALE]: r.annualFund },
    polioPlusFund: { [LOCALE]: r.polioPlusFund },
    otherFund: { [LOCALE]: r.otherFund },
    endowmentFund: { [LOCALE]: r.endowmentFund },
    totalFund: { [LOCALE]: r.totalFund },
  };
}

async function deleteEntryIfPublished(entry) {
  if (entry.isPublished()) await entry.unpublish();
  await entry.delete();
}

async function main() {
  const force = process.argv.includes('--force');
  console.log('🚀 Migrating foundation giving entries...');

  const client = createClient({ accessToken: MANAGEMENT_TOKEN });
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment(ENVIRONMENT);

  const existingReports = await environment.getEntries({
    content_type: 'foundationGivingReport',
    limit: 10,
  });

  if (existingReports.items.length > 0 && !force) {
    console.log(
      'ℹ️  A Foundation Giving Report entry already exists. Skip migration (use --force to remove it and re-seed).'
    );
    process.exit(0);
  }

  if (existingReports.items.length > 0 && force) {
    console.log(
      '⚠️  --force: removing existing foundation giving report(s) and linked rows...'
    );
    for (const rep of existingReports.items) {
      const fields = rep.fields;
      const rowLinks = fields.rows?.[LOCALE] || [];
      for (const link of rowLinks) {
        const id = link?.sys?.id;
        if (!id) continue;
        try {
          const rowEntry = await environment.getEntry(id);
          await deleteEntryIfPublished(rowEntry);
          console.log(`   🗑️  Deleted row ${id}`);
        } catch (e) {
          console.warn(`   ⚠️  Could not delete row ${id}:`, e.message);
        }
      }
      await deleteEntryIfPublished(rep);
      console.log(`   🗑️  Deleted report ${rep.sys.id}`);
    }
  }

  const rowIds = [];
  for (const r of ROWS) {
    const entry = await environment.createEntry('foundationGivingRow', {
      fields: rowFields(r),
    });
    await entry.publish();
    rowIds.push(entry.sys.id);
    console.log(`✅ Row ${r.rotaryYearLabel} → ${entry.sys.id}`);
  }

  const reportEntry = await environment.createEntry('foundationGivingReport', {
    fields: {
      reportTitle: { [LOCALE]: 'THE ROTARY FOUNDATION GIVING' },
      subtitle: {
        [LOCALE]:
          '5-Year Club Giving (in-US Dollar) — Rotaract Club of Zamboanga City West',
      },
      currencyLabel: { [LOCALE]: 'USD' },
      asOfDate: { [LOCALE]: '2026-04-10' },
      rows: {
        [LOCALE]: rowIds.map(id => ({
          sys: { type: 'Link', linkType: 'Entry', id },
        })),
      },
      faqAnnualFund: { [LOCALE]: FAQ.faqAnnualFund },
      faqPolioPlus: { [LOCALE]: FAQ.faqPolioPlus },
      faqOther: { [LOCALE]: FAQ.faqOther },
      faqEndowment: { [LOCALE]: FAQ.faqEndowment },
    },
  });
  await reportEntry.publish();
  console.log(`✅ Report published: ${reportEntry.sys.id}`);
  console.log('🎉 Foundation giving migration complete.');
}

main().catch(err => {
  console.error('❌', err.message);
  process.exit(1);
});
