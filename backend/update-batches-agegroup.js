#!/usr/bin/env node

/**
 * Update existing batches to set ageGroup = "adults" if not set
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

// Update batches without ageGroup
async function updateBatchesAgeGroup() {
  console.log('\n📦 Checking batches for missing ageGroup...');
  
  try {
    // Get all batches
    const records = await makeRequest('GET', '/api/collections/batches/records?page=1&perPage=200');
    
    const batchesWithoutAgeGroup = records.items.filter(batch => 
      !batch.ageGroup || batch.ageGroup === ''
    );
    
    console.log(`Found ${batchesWithoutAgeGroup.length} batches without ageGroup`);
    
    if (batchesWithoutAgeGroup.length === 0) {
      console.log('✅ All batches have ageGroup set!');
      return true;
    }
    
    // Update each batch
    let updated = 0;
    for (const batch of batchesWithoutAgeGroup) {
      try {
        await makeRequest('PATCH', `/api/collections/batches/records/${batch.id}`, {
          ageGroup: 'adults',
        });
        updated++;
        console.log(`✅ Updated batch: ${batch.language} ${batch.level} (${batch.id})`);
      } catch (error) {
        console.error(`❌ Failed to update batch ${batch.id}:`, error.message);
      }
    }
    
    console.log(`\n✨ Updated ${updated} batches with ageGroup = "adults"`);
    return true;
  } catch (error) {
    console.error('❌ Failed to update batches:', error.message);
    return false;
  }
}

// Main function
async function main() {
  console.log('🚀 Starting Batch ageGroup Update\n');
  console.log('📍 PocketBase URL:', POCKETBASE_URL);

  if (!await authenticateAdmin()) {
    process.exit(1);
  }

  await updateBatchesAgeGroup();

  console.log('\n✨ Update completed!');
}

main().catch(console.error);

