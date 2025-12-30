/**
 * PocketBase Admin Client Utility
 * Provides authenticated admin client for programmatic database operations
 */

const PocketBase = require('pocketbase/cjs');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from project root
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Remove trailing /_/ if present
const PB_URL = (process.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8098').replace(/\/_\/$/, '');
const ADMIN_EMAIL = process.env.pocketbase_admin;
const ADMIN_PASSWORD = process.env.pocketbase_password;

/**
 * Create and authenticate an admin PocketBase client
 * @returns {Promise<PocketBase>} Authenticated PocketBase client
 */
async function createAdminClient() {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error(
      '❌ Missing credentials! Please set pocketbase_admin and pocketbase_password in .env file'
    );
  }

  const pb = new PocketBase(PB_URL);

  try {
    await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log('✅ Authenticated as admin:', ADMIN_EMAIL);
    return pb;
  } catch (error) {
    console.error('❌ Admin authentication failed:', error.message);
    console.error('\n⚠️  ACTION REQUIRED:');
    console.error('1. Open http://127.0.0.1:8098/_/ in your browser');
    console.error('2. Create an admin account with these credentials:');
    console.error(`   Email: ${ADMIN_EMAIL}`);
    console.error(`   Password: ${ADMIN_PASSWORD}`);
    console.error('3. Then run this script again\n');
    throw error;
  }
}

/**
 * Check if a collection exists
 * @param {PocketBase} pb - PocketBase client
 * @param {string} name - Collection name
 * @returns {Promise<boolean>}
 */
async function collectionExists(pb, name) {
  try {
    const collections = await pb.collections.getFullList();
    return collections.some(c => c.name === name);
  } catch (error) {
    console.error(`Error checking collection ${name}:`, error.message);
    return false;
  }
}

/**
 * Get collection ID by name
 * @param {PocketBase} pb - PocketBase client
 * @param {string} name - Collection name
 * @returns {Promise<string|null>}
 */
async function getCollectionId(pb, name) {
  try {
    const collections = await pb.collections.getFullList();
    const collection = collections.find(c => c.name === name);
    return collection?.id || null;
  } catch (error) {
    console.error(`Error getting collection ${name}:`, error.message);
    return null;
  }
}

/**
 * Get all existing collection names
 * @param {PocketBase} pb - PocketBase client
 * @returns {Promise<string[]>}
 */
async function getExistingCollections(pb) {
  try {
    const collections = await pb.collections.getFullList();
    return collections.map(c => c.name);
  } catch (error) {
    console.error('Error getting collections:', error.message);
    return [];
  }
}

module.exports = {
  createAdminClient,
  collectionExists,
  getCollectionId,
  getExistingCollections,
};

