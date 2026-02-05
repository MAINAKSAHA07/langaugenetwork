import PocketBase from 'pocketbase';

const pb = new PocketBase('http://3.101.63.121:8098');

// Admin credentials
const ADMIN_EMAIL = 'mainaksaha0807@gmail.com';
const ADMIN_PASSWORD = '8104760831';

async function setupCollections() {
    try {
        console.log('🔐 Authenticating with PocketBase...');
        await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
        console.log('✅ Authentication successful!\n');

        // Check if mastery_kit_purchases collection exists
        const collections = await pb.collections.getFullList();
        const purchasesCollection = collections.find(c => c.name === 'mastery_kit_purchases');

        if (!purchasesCollection) {
            console.log('📋 Creating mastery_kit_purchases collection...');

            await pb.collections.create({
                name: 'mastery_kit_purchases',
                type: 'base',
                schema: [
                    {
                        name: 'user',
                        type: 'relation',
                        required: true,
                        options: {
                            collectionId: collections.find(c => c.name === 'users').id,
                            cascadeDelete: false,
                            minSelect: null,
                            maxSelect: 1,
                            displayFields: ['email']
                        }
                    },
                    {
                        name: 'mastery_kit',
                        type: 'relation',
                        required: true,
                        options: {
                            collectionId: collections.find(c => c.name === 'mastery_kits').id,
                            cascadeDelete: false,
                            minSelect: null,
                            maxSelect: 1,
                            displayFields: ['title']
                        }
                    },
                    {
                        name: 'purchase_date',
                        type: 'date',
                        required: true
                    },
                    {
                        name: 'payment_status',
                        type: 'select',
                        required: true,
                        options: {
                            maxSelect: 1,
                            values: ['pending', 'completed', 'failed', 'refunded']
                        }
                    },
                    {
                        name: 'transaction_id',
                        type: 'text',
                        required: false
                    },
                    {
                        name: 'amount',
                        type: 'number',
                        required: false
                    }
                ]
            });

            console.log('✅ mastery_kit_purchases collection created!\n');
        } else {
            console.log('✅ mastery_kit_purchases collection already exists!\n');
        }

        console.log('🎉 Setup complete!');

    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.response) {
            console.error('Response:', error.response);
        }
    }
}

setupCollections();
