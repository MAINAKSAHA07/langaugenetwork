#!/usr/bin/env node

/**
 * PocketBase Collections Schema Update Script
 * Adds language field to orders and ageGroup field to batches
 */

import http from 'http';

const POCKETBASE_URL = process.env.POCKETBASE_URL || 'http://127.0.0.1:8098';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'mainaksaha0807@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '8104760831';

let authToken = '';

// Helper function to make HTTP requests
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, POCKETBASE_URL);
    const options = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (authToken) {
      options.headers['Authorization'] = authToken;
    }

    const req = http.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          const response = body ? JSON.parse(body) : {};
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(response);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${JSON.stringify(response)}`));
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Authenticate as admin
async function authenticateAdmin() {
  console.log('🔐 Authenticating as admin...');
  try {
    const response = await makeRequest('POST', '/api/admins/auth-with-password', {
      identity: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });
    authToken = response.token;
    console.log('✅ Admin authenticated successfully!');
    return true;
  } catch (error) {
    console.error('❌ Admin authentication failed:', error.message);
    return false;
  }
}

// Update Orders Collection - Add language field
async function updateOrdersCollection() {
  console.log('\n📦 Updating "orders" collection...');
  
  try {
    // Get current collection
    const collections = await makeRequest('GET', '/api/collections');
    const ordersCollection = collections.items.find(col => col.name === 'orders');
    
    if (!ordersCollection) {
      console.log('❌ Orders collection not found!');
      return false;
    }

    // Check if language field already exists
    const hasLanguageField = ordersCollection.schema.some(field => field.name === 'language');
    
    if (hasLanguageField) {
      console.log('ℹ️  "language" field already exists in orders collection');
      return true;
    }

    // Add language field
    const updatedSchema = [
      ...ordersCollection.schema,
      {
        name: 'language',
        type: 'select',
        required: false,
        options: {
          maxSelect: 1,
          values: ['French', 'German', 'Spanish', 'English', 'Japanese', 'Korean', 'Mandarin'],
        },
      },
    ];

    await makeRequest('PATCH', `/api/collections/${ordersCollection.id}`, {
      schema: updatedSchema,
    });

    console.log('✅ Added "language" field to orders collection!');
    return true;
  } catch (error) {
    console.error('❌ Failed to update orders collection:', error.message);
    return false;
  }
}

// Update Batches Collection - Add ageGroup field
async function updateBatchesCollection() {
  console.log('\n📦 Updating "batches" collection...');
  
  try {
    // Get current collection
    const collections = await makeRequest('GET', '/api/collections');
    const batchesCollection = collections.items.find(col => col.name === 'batches');
    
    if (!batchesCollection) {
      console.log('❌ Batches collection not found!');
      return false;
    }

    // Check if ageGroup field already exists
    const hasAgeGroupField = batchesCollection.schema.some(field => field.name === 'ageGroup');
    
    if (hasAgeGroupField) {
      console.log('ℹ️  "ageGroup" field already exists in batches collection');
      return true;
    }

    // Add ageGroup field after mode field
    const modeIndex = batchesCollection.schema.findIndex(field => field.name === 'mode');
    const updatedSchema = [
      ...batchesCollection.schema.slice(0, modeIndex + 1),
      {
        name: 'ageGroup',
        type: 'select',
        required: true,
        options: {
          maxSelect: 1,
          values: ['adults', 'kids'],
        },
      },
      ...batchesCollection.schema.slice(modeIndex + 1),
    ];

    await makeRequest('PATCH', `/api/collections/${batchesCollection.id}`, {
      schema: updatedSchema,
    });

    console.log('✅ Added "ageGroup" field to batches collection!');
    return true;
  } catch (error) {
    console.error('❌ Failed to update batches collection:', error.message);
    return false;
  }
}

// Main function
async function main() {
  console.log('🚀 Starting PocketBase Collections Schema Update\n');
  console.log('📍 PocketBase URL:', POCKETBASE_URL);

  if (!await authenticateAdmin()) {
    process.exit(1);
  }

  await updateOrdersCollection();
  await updateBatchesCollection();

  console.log('\n✨ Schema update completed!');
}

main().catch(console.error);

