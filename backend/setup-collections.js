#!/usr/bin/env node

/**
 * PocketBase Collections Setup Script
 * This script creates all necessary collections for The Language Network
 * 
 * Usage:
 *   node setup-collections.js
 * 
 * Or on AWS:
 *   cd ~/language-network/backend
 *   node setup-collections.js
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

// Create Orders Collection
async function createOrdersCollection() {
  console.log('\n📦 Creating "orders" collection...');
  
  const schema = {
    name: 'orders',
    type: 'base',
    schema: [
      {
        name: 'customerName',
        type: 'text',
        required: true,
      },
      {
        name: 'customerEmail',
        type: 'email',
        required: true,
      },
      {
        name: 'customerPhone',
        type: 'text',
        required: true,
      },
      {
        name: 'amount',
        type: 'number',
        required: true,
      },
      {
        name: 'currency',
        type: 'text',
        required: false,
      },
      {
        name: 'status',
        type: 'select',
        required: true,
        options: {
          maxSelect: 1,
          values: ['pending', 'completed', 'failed', 'refunded'],
        },
      },
      {
        name: 'paymentGateway',
        type: 'text',
        required: false,
      },
      {
        name: 'courseType',
        type: 'text',
        required: false,
      },
      {
        name: 'batchId',
        type: 'text',
        required: false,
      },
      {
        name: 'razorpayPaymentId',
        type: 'text',
        required: false,
      },
      {
        name: 'razorpayOrderId',
        type: 'text',
        required: false,
      },
      {
        name: 'razorpaySignature',
        type: 'text',
        required: false,
      },
      {
        name: 'batchDetails',
        type: 'json',
        required: false,
        options: {
          maxSize: 2000000,
        },
      },
      {
        name: 'completedAt',
        type: 'date',
        required: false,
      },
    ],
    listRule: '@request.auth.id != ""',
    viewRule: '@request.auth.id != ""',
    createRule: '',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
  };

  try {
    const response = await makeRequest('POST', '/api/collections', schema);
    console.log('✅ "orders" collection created successfully!');
    return response;
  } catch (error) {
    if (error.message.includes('already exists') || error.message.includes('must be unique')) {
      console.log('ℹ️  "orders" collection already exists, skipping...');
      return null;
    }
    console.error('❌ Failed to create "orders" collection:', error.message);
    throw error;
  }
}

// Create Enrollments Collection
async function createEnrollmentsCollection() {
  console.log('\n📦 Creating "enrollments" collection...');
  
  const schema = {
    name: 'enrollments',
    type: 'base',
    schema: [
      {
        name: 'studentName',
        type: 'text',
        required: true,
      },
      {
        name: 'studentEmail',
        type: 'email',
        required: true,
      },
      {
        name: 'studentPhone',
        type: 'text',
        required: true,
      },
      {
        name: 'batchId',
        type: 'text',
        required: false,
      },
      {
        name: 'courseType',
        type: 'select',
        required: true,
        options: {
          maxSelect: 1,
          values: ['batch', 'mastery-kit', 'demo'],
        },
      },
      {
        name: 'courseName',
        type: 'text',
        required: false,
      },
      {
        name: 'orderId',
        type: 'text',
        required: false,
      },
      {
        name: 'status',
        type: 'select',
        required: true,
        options: {
          maxSelect: 1,
          values: ['pending', 'active', 'completed', 'cancelled'],
        },
      },
      {
        name: 'enrollmentDate',
        type: 'date',
        required: true,
      },
      {
        name: 'courseDetails',
        type: 'json',
        required: false,
        options: {
          maxSize: 2000000,
        },
      },
    ],
    listRule: '@request.auth.id != ""',
    viewRule: '@request.auth.id != ""',
    createRule: '',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
  };

  try {
    const response = await makeRequest('POST', '/api/collections', schema);
    console.log('✅ "enrollments" collection created successfully!');
    return response;
  } catch (error) {
    if (error.message.includes('already exists') || error.message.includes('must be unique')) {
      console.log('ℹ️  "enrollments" collection already exists, skipping...');
      return null;
    }
    console.error('❌ Failed to create "enrollments" collection:', error.message);
    throw error;
  }
}

// Create Teacher Applications Collection
async function createTeacherApplicationsCollection() {
  console.log('\n📦 Creating "teacher_applications" collection...');
  
  const schema = {
    name: 'teacher_applications',
    type: 'base',
    schema: [
      {
        name: 'fullName',
        type: 'text',
        required: true,
      },
      {
        name: 'contactNo',
        type: 'text',
        required: true,
      },
      {
        name: 'email',
        type: 'email',
        required: true,
      },
      {
        name: 'preferredLanguage',
        type: 'text',
        required: false,
      },
      {
        name: 'qualification',
        type: 'text',
        required: false,
      },
      {
        name: 'teachingExperience',
        type: 'text',
        required: false,
      },
      {
        name: 'aboutYourself',
        type: 'text',
        required: false,
      },
      {
        name: 'howDidYouHear',
        type: 'text',
        required: false,
      },
      {
        name: 'cv',
        type: 'file',
        required: true,
        options: {
          maxSelect: 1,
          maxSize: 10485760, // 10MB
          mimeTypes: [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          ],
        },
      },
    ],
    listRule: '@request.auth.id != ""',
    viewRule: '@request.auth.id != ""',
    createRule: '',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
  };

  try {
    const response = await makeRequest('POST', '/api/collections', schema);
    console.log('✅ "teacher_applications" collection created successfully!');
    return response;
  } catch (error) {
    if (error.message.includes('already exists') || error.message.includes('must be unique')) {
      console.log('ℹ️  "teacher_applications" collection already exists, skipping...');
      return null;
    }
    console.error('❌ Failed to create "teacher_applications" collection:', error.message);
    throw error;
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting PocketBase Collections Setup for The Language Network\n');
  console.log(`📍 PocketBase URL: ${POCKETBASE_URL}\n`);

  try {
    // Step 1: Authenticate
    const authenticated = await authenticateAdmin();
    if (!authenticated) {
      console.error('\n❌ Setup failed: Could not authenticate as admin');
      process.exit(1);
    }

    // Step 2: Create collections
    await createOrdersCollection();
    await createEnrollmentsCollection();
    await createTeacherApplicationsCollection();

    console.log('\n✨ Setup completed successfully!');
    console.log('\n📊 Summary:');
    console.log('   - orders collection: Ready for payment processing');
    console.log('   - enrollments collection: Ready for student tracking');
    console.log('   - teacher_applications collection: Ready for CV uploads');
    console.log('\n🎉 All collections are ready to use!');
    
  } catch (error) {
    console.error('\n💥 Setup failed with error:', error.message);
    process.exit(1);
  }
}

// Run the script
main();

