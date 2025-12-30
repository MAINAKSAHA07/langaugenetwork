/**
 * Automated PocketBase Collection Setup
 * Creates all collections programmatically
 * Run: npm run pb:setup
 */

const { createAdminClient, collectionExists, getExistingCollections } = require('./admin-client.js');
const { collectionSchemas } = require('./collection-schemas.js');

async function setupCollections() {
  console.log('🚀 Starting automated collection setup...\n');

  let pb;
  try {
    // Authenticate as admin
    pb = await createAdminClient();

    // Get existing collections
    const existingCollections = await getExistingCollections(pb);
    console.log('📦 Existing collections:', existingCollections.join(', ') || 'None');
    console.log('');

    let created = 0;
    let skipped = 0;
    let failed = 0;

    // Create collections
    for (const schema of collectionSchemas) {
      const exists = await collectionExists(pb, schema.name);

      if (exists) {
        console.log(`⏭️  Skipping ${schema.name} (already exists)`);
        skipped++;
        continue;
      }

      try {
        console.log(`📝 Creating ${schema.name}...`);

        await pb.collections.create({
          name: schema.name,
          type: schema.type,
          schema: schema.schema,
          indexes: schema.indexes || [],
          listRule: schema.listRule,
          viewRule: schema.viewRule,
          createRule: schema.createRule,
          updateRule: schema.updateRule,
          deleteRule: schema.deleteRule,
        });

        console.log(`✅ Created ${schema.name}`);
        created++;
      } catch (error) {
        console.error(`❌ Failed to create ${schema.name}:`, error.message);
        if (error.response?.data) {
          console.error('Details:', JSON.stringify(error.response.data, null, 2));
        }
        failed++;
      }
      console.log('');
    }

    // Summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Setup Summary:');
    console.log(`   ✅ Created: ${created}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   ❌ Failed: ${failed}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    if (failed === 0) {
      console.log('🎉 All collections set up successfully!');
      console.log('\nNext steps:');
      console.log('  1. Run: npm run pb:seed (to add sample data)');
      console.log('  2. Visit: http://127.0.0.1:8098/_/ (to view admin panel)');
    } else {
      console.log('⚠️  Some collections failed to create. Please check the errors above.');
    }
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  setupCollections().catch(console.error);
}

module.exports = { setupCollections };

