import PocketBase from 'pocketbase';

const pb = new PocketBase('http://3.101.63.121:8098');

// Admin credentials
const ADMIN_EMAIL = 'mainaksaha0807@gmail.com';
const ADMIN_PASSWORD = '8104760831';

async function checkAndFixCollections() {
    try {
        console.log('🔐 Authenticating with PocketBase...');
        await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
        console.log('✅ Authentication successful!\n');

        // Get all collections
        const collections = await pb.collections.getFullList();

        // Check mastery_kit_purchases collection
        const purchasesCollection = collections.find(c => c.name === 'mastery_kit_purchases');

        if (purchasesCollection) {
            console.log('📋 mastery_kit_purchases collection found!');
            console.log('Current schema:');
            console.log(JSON.stringify(purchasesCollection.schema, null, 2));
            console.log('\n');

            // Update the collection with correct API rules
            console.log('🔧 Updating API rules...');

            await pb.collections.update(purchasesCollection.id, {
                listRule: '@request.auth.id != ""',  // Allow authenticated users to list
                viewRule: '@request.auth.id != ""',  // Allow authenticated users to view
                createRule: '@request.auth.id != ""', // Allow authenticated users to create
                updateRule: null, // Only admins can update
                deleteRule: null  // Only admins can delete
            });

            console.log('✅ API rules updated for mastery_kit_purchases!\n');
        }

        // Check mastery_kits collection
        const kitsCollection = collections.find(c => c.name === 'mastery_kits');

        if (kitsCollection) {
            console.log('📋 mastery_kits collection found!');

            // Update the collection with correct API rules
            console.log('🔧 Updating API rules...');

            await pb.collections.update(kitsCollection.id, {
                listRule: '', // Allow everyone to list (public browsing)
                viewRule: '', // Allow everyone to view (public browsing)
                createRule: null, // Only admins can create
                updateRule: null, // Only admins can update
                deleteRule: null  // Only admins can delete
            });

            console.log('✅ API rules updated for mastery_kits!\n');
        }

        console.log('🎉 All API rules configured successfully!');
        console.log('\nNOTE: Admins bypass all API rules automatically.');

    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.response) {
            console.error('Response:', JSON.stringify(error.response, null, 2));
        }
    }
}

checkAndFixCollections();
