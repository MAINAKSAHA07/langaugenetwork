import PocketBase from 'pocketbase';

const pb = new PocketBase('http://3.101.63.121:8098');

// Admin credentials
const ADMIN_EMAIL = 'mainaksaha0807@gmail.com';
const ADMIN_PASSWORD = '8104760831';

async function fixAPIRules() {
    try {
        console.log('🔐 Authenticating with PocketBase...');
        await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
        console.log('✅ Authentication successful!\n');

        // Get all collections
        const collections = await pb.collections.getFullList();

        // Fix mastery_kits collection - ONLY authenticated users can view
        const kitsCollection = collections.find(c => c.name === 'mastery_kits');

        if (kitsCollection) {
            console.log('🔧 Updating mastery_kits API rules...');

            await pb.collections.update(kitsCollection.id, {
                listRule: '@request.auth.id != ""',  // MUST be logged in to list
                viewRule: '@request.auth.id != ""',  // MUST be logged in to view
                createRule: null, // Only admins can create
                updateRule: null, // Only admins can update
                deleteRule: null  // Only admins can delete
            });

            console.log('✅ mastery_kits now requires authentication!\n');
        }

        // Fix mastery_kit_purchases collection - users can only see their own
        const purchasesCollection = collections.find(c => c.name === 'mastery_kit_purchases');

        if (purchasesCollection) {
            console.log('🔧 Updating mastery_kit_purchases API rules...');

            await pb.collections.update(purchasesCollection.id, {
                listRule: '@request.auth.id != "" && user = @request.auth.id',  // Only see own purchases
                viewRule: '@request.auth.id != "" && user = @request.auth.id',  // Only see own purchases
                createRule: '@request.auth.id != ""', // Authenticated users can create (for purchases)
                updateRule: null, // Only admins can update
                deleteRule: null  // Only admins can delete
            });

            console.log('✅ mastery_kit_purchases now properly restricted!\n');
        }

        console.log('🎉 All API rules fixed!');
        console.log('\n⚠️  IMPORTANT: Users MUST now login to see any mastery kits.');
        console.log('Files are now properly protected and require authentication.');

    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.response) {
            console.error('Response:', JSON.stringify(error.response, null, 2));
        }
    }
}

fixAPIRules();
