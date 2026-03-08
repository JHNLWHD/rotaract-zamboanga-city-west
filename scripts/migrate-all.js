#!/usr/bin/env node

import { spawn } from 'child_process';

const scripts = [
  {
    name: 'Delete Existing Content',
    command: 'node',
    args: ['scripts/delete-content.js', '--force', '--include-homepage'],
  },
  {
    name: 'Setup Content Models',
    command: 'node',
    args: ['scripts/setup-contentful-models.js'],
  },
  {
    name: 'Upload Assets',
    command: 'node',
    args: ['scripts/upload-assets.js'],
  },
  {
    name: 'Migrate Homepage',
    command: 'node',
    args: ['scripts/migrate-homepage.js'],
  },
  {
    name: 'Migrate Projects',
    command: 'node',
    args: ['scripts/migrate-projects.js'],
  },
  {
    name: 'Migrate Events',
    command: 'node',
    args: ['scripts/migrate-events.js'],
  },
  {
    name: 'Migrate Officers',
    command: 'node',
    args: ['scripts/migrate-officers.js'],
  },
];

async function runScript(script) {
  return new Promise(resolve => {
    console.log(`\n🚀 Running: ${script.name}`);
    console.log('─'.repeat(50));

    const child = spawn(script.command, script.args, {
      stdio: 'inherit',
      cwd: process.cwd(),
    });

    child.on('close', code => {
      if (code === 0) {
        console.log(`✅ ${script.name} completed successfully`);
        resolve({ success: true, name: script.name });
      } else {
        console.log(`❌ ${script.name} failed with exit code ${code}`);
        resolve({ success: false, name: script.name, code });
      }
    });

    child.on('error', error => {
      console.log(`❌ ${script.name} failed with error:`, error.message);
      resolve({ success: false, name: script.name, error: error.message });
    });
  });
}

async function runAllMigrations() {
  console.log('🎯 Starting Contentful Migration Process');
  console.log('═'.repeat(50));

  const results = [];
  let shouldContinue = true;

  for (const script of scripts) {
    if (!shouldContinue) {
      console.log(`⏭️  Skipping ${script.name} due to previous failure`);
      results.push({ success: false, name: script.name, skipped: true });
      continue;
    }

    const result = await runScript(script);
    results.push(result);

    // Stop on first failure for critical scripts
    if (
      !result.success &&
      (script.name.includes('Delete') ||
        script.name.includes('Setup') ||
        script.name.includes('Upload'))
    ) {
      console.log(`\n⚠️  Critical script failed: ${script.name}`);
      console.log('   Stopping migration process to prevent data issues.');
      shouldContinue = false;
    }
  }

  // Summary
  console.log('\n📊 Migration Summary');
  console.log('═'.repeat(50));

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success && !r.skipped).length;
  const skipped = results.filter(r => r.skipped).length;

  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⏭️  Skipped: ${skipped}`);

  if (failed > 0) {
    console.log('\n🔍 Failed Scripts:');
    results
      .filter(r => !r.success && !r.skipped)
      .forEach(r => {
        console.log(
          `   • ${r.name}${r.code ? ` (exit code: ${r.code})` : ''}${r.error ? ` (${r.error})` : ''}`
        );
      });

    console.log('\n💡 Troubleshooting Tips:');
    console.log('   1. Check your Contentful credentials in .env file');
    console.log('   2. Ensure your management token has write permissions');
    console.log('   3. Verify the space ID is correct');
    console.log('   4. Make sure you have network connectivity');

    process.exit(1);
  } else {
    console.log('\n🎉 All migrations completed successfully!');
    process.exit(0);
  }
}

// Handle process termination gracefully
process.on('SIGINT', () => {
  console.log('\n⚠️  Migration process interrupted by user');
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('\n⚠️  Migration process terminated');
  process.exit(1);
});

runAllMigrations().catch(error => {
  console.error('\n💥 Unexpected error during migration:', error);
  process.exit(1);
});
