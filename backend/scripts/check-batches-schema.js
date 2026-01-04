import PocketBase from 'pocketbase';

const PB_URL = process.env.POCKETBASE_URL || 'http://127.0.0.1:8098';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'mainaksaha0807@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '8104760831';

const pb = new PocketBase(PB_URL);

async function checkBatchesSchema() {
  try {
    console.log('🔐 Authenticating as admin...');
    await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log('✅ Authenticated successfully!\n');

    // Get the batches collection
    console.log('📋 Checking batches collection schema...');
    const collections = await pb.collections.getList(1, 100);
    const batchesCollection = collections.items.find(col => col.name === 'batches');

    if (!batchesCollection) {
      console.log('❌ Batches collection not found!');
      return;
    }

    console.log('✅ Batches collection found!\n');
    console.log('📊 Collection Details:');
    console.log(`   Name: ${batchesCollection.name}`);
    console.log(`   Type: ${batchesCollection.type}`);
    console.log(`   System: ${batchesCollection.system}`);

    console.log('\n📝 Schema Fields:');
    batchesCollection.schema.forEach((field, index) => {
      console.log(`\n   ${index + 1}. ${field.name} (${field.type})`);
      console.log(`      Required: ${field.required ? 'Yes' : 'No'}`);
      if (field.options) {
        console.log(`      Options: ${JSON.stringify(field.options, null, 8)}`);
      }
    });

    console.log('\n🔒 Permissions:');
    console.log(`   List Rule: ${batchesCollection.listRule || '(empty)'}`);
    console.log(`   View Rule: ${batchesCollection.viewRule || '(empty)'}`);
    console.log(`   Create Rule: ${batchesCollection.createRule || '(empty)'}`);
    console.log(`   Update Rule: ${batchesCollection.updateRule || '(empty)'}`);
    console.log(`   Delete Rule: ${batchesCollection.deleteRule || '(empty)'}`);

    // Try to get a sample batch
    console.log('\n📦 Sample Batch Data:');
    try {
      const sample = await pb.collection('batches').getList(1, 1);
      if (sample.items.length > 0) {
        console.log(JSON.stringify(sample.items[0], null, 2));
      } else {
        console.log('   No batches found in collection');
      }
    } catch (err) {
      console.log(`   Error fetching sample: ${err.message}`);
    }

    // Try creating a test batch to see what fails
    console.log('\n🧪 Testing batch creation with minimal data...');
    const testData = {
      language: 'English',
      level: 'A1',
      mode: 'Online',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      schedule: 'Mon/Wed/Fri 6:00-7:30 PM',
      capacity: 15,
      enrolled: 0,
      price: 0,
      status: 'upcoming',
    };

    try {
      const result = await pb.collection('batches').create(testData);
      console.log('✅ Test batch created successfully!');
      console.log(`   ID: ${result.id}`);
      // Delete test batch
      await pb.collection('batches').delete(result.id);
      console.log('   Test batch deleted');
    } catch (error) {
      console.log('❌ Test batch creation failed!');
      console.log(`   Error: ${error.message}`);
      if (error.data && error.data.data) {
        console.log('\n   Field Errors:');
        Object.entries(error.data.data).forEach(([field, err]) => {
          console.log(`     ${field}: ${JSON.stringify(err)}`);
        });
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.data) {
      console.error('   Details:', JSON.stringify(error.data, null, 2));
    }
  }
}

checkBatchesSchema();

