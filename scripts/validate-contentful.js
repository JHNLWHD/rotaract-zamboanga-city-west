#!/usr/bin/env node

import pkg from 'contentful-management';
const { createClient } = pkg;
import * as contentful from 'contentful';
import dotenv from 'dotenv';

dotenv.config();

// Environment variables
const SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const DELIVERY_TOKEN = process.env.VITE_CONTENTFUL_DELIVERY_TOKEN;
const ENVIRONMENT = process.env.VITE_CONTENTFUL_ENVIRONMENT || 'master';

async function validateCredentials() {
  console.log('🔍 Validating Contentful Configuration');
  console.log('═'.repeat(40));

  // Check environment variables
  const missing = [];
  if (!SPACE_ID) missing.push('VITE_CONTENTFUL_SPACE_ID');
  if (!MANAGEMENT_TOKEN) missing.push('CONTENTFUL_MANAGEMENT_TOKEN');
  if (!DELIVERY_TOKEN) missing.push('VITE_CONTENTFUL_DELIVERY_TOKEN');

  if (missing.length > 0) {
    console.log('❌ Missing required environment variables:');
    missing.forEach(env => console.log(`   • ${env}`));
    console.log('\n💡 Please add these to your .env file');
    return false;
  }

  console.log('✅ All environment variables present');
  console.log(`   Space ID: ${SPACE_ID}`);
  console.log(`   Environment: ${ENVIRONMENT}`);
  console.log(`   Management Token: ${MANAGEMENT_TOKEN.substring(0, 10)}...`);
  console.log(`   Delivery Token: ${DELIVERY_TOKEN.substring(0, 10)}...`);

  // Test management API connection
  console.log('\n📡 Testing Management API connection...');
  try {
    const client = createClient({
      accessToken: MANAGEMENT_TOKEN,
    });

    const space = await client.getSpace(SPACE_ID);
    console.log(`✅ Successfully connected to space: "${space.name}"`);

    const environment = await space.getEnvironment(ENVIRONMENT);
    console.log(`✅ Successfully accessed environment: "${environment.name}"`);

    // Test permissions by trying to get content types
    try {
      const contentTypes = await environment.getContentTypes();
      console.log(
        `✅ Management permissions verified (found ${contentTypes.items.length} content types)`
      );
    } catch (error) {
      console.log(
        '⚠️  Limited management permissions - may not be able to create content types'
      );
    }
  } catch (error) {
    console.log('❌ Management API connection failed:');
    if (error.status === 403) {
      console.log('   • Invalid management token or insufficient permissions');
      console.log('   • Make sure your token has write access to the space');
    } else if (error.status === 404) {
      console.log('   • Space not found - check your SPACE_ID');
    } else {
      console.log(`   • Status: ${error.status || 'Unknown'}`);
      console.log(
        `   • Message: ${error.message || error.statusText || 'Unknown error'}`
      );
    }
    return false;
  }

  // Test delivery API connection
  console.log('\n📡 Testing Delivery API connection...');
  try {
    const deliveryClient = contentful.createClient({
      space: SPACE_ID,
      accessToken: DELIVERY_TOKEN,
      environment: ENVIRONMENT,
    });

    // Actually test the delivery token by making a request
    const entries = await deliveryClient.getEntries({ limit: 1 });
    console.log('✅ Delivery token is valid and working');
    console.log(
      `   Successfully queried entries (${entries.total} total entries found)`
    );
  } catch (error) {
    console.log('❌ Delivery API connection failed:');
    if (error.status === 401) {
      console.log('   • Invalid delivery token');
      console.log('   • Check your VITE_CONTENTFUL_DELIVERY_TOKEN');
    } else if (error.status === 404) {
      console.log('   • Space or environment not found');
    } else {
      console.log(`   • Status: ${error.status || 'Unknown'}`);
      console.log(
        `   • Message: ${error.message || error.statusText || 'Unknown error'}`
      );
    }
    return false;
  }

  console.log('\n🎉 Contentful configuration is valid!');
  console.log('   You can now run: npm run migrate:all');
  return true;
}

validateCredentials()
  .then(isValid => {
    if (!isValid) {
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('\n💥 Validation failed:', error.message);
    process.exit(1);
  });
