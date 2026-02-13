import PocketBase from 'pocketbase';

const pb = new PocketBase('http://3.101.63.121:8098');

// Admin credentials
const ADMIN_EMAIL = 'mainaksaha0807@gmail.com';
const ADMIN_PASSWORD = '8104760831';

// Users to grant access
const USERS_TO_GRANT = [
    'mainaksaha0807@gmail.com',
    'chokhanisiddhi@gmail.com'
];

async function grantAccessToAll() {
    try {
        console.log('================================================================================');
        console.log('🔑 GRANTING ACCESS TO ALL MASTERY KITS');
        console.log('================================================================================\n');

        // Authenticate
        console.log('🔐 Authenticating...');
        await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
        console.log('✅ Authenticated\n');

        // Get all users
        console.log('👥 Fetching users...');
        const allUsers = await pb.collection('users').getFullList();
        const usersToGrant = allUsers.filter(u => USERS_TO_GRANT.includes(u.email));

        console.log(`   Found ${usersToGrant.length} users to grant access:\n`);
        usersToGrant.forEach(u => console.log(`   - ${u.email}`));
        console.log('');

        // Get all mastery kits
        console.log('📦 Fetching mastery kits...');
        const kits = await pb.collection('mastery_kits').getFullList();
        console.log(`   Found ${kits.length} mastery kits:\n`);
        kits.forEach(k => console.log(`   - ${k.title}`));
        console.log('');

        // Grant access to each user for each kit
        console.log('🚀 Granting access...\n');
        let grantCount = 0;

        for (const user of usersToGrant) {
            console.log(`📝 Granting access for: ${user.email}`);

            for (const kit of kits) {
                try {
                    await pb.collection('mastery_kit_purchases').create({
                        user: user.id,
                        mastery_kit: kit.id,
                        purchase_date: new Date().toISOString(),
                        payment_status: 'completed',
                        transaction_id: `ADMIN_GRANT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                        amount: kit.price || 0
                    });

                    console.log(`   ✅ ${kit.title}`);
                    grantCount++;
                } catch (error) {
                    console.log(`   ❌ Failed: ${kit.title} - ${error.message}`);
                }
            }
            console.log('');
        }

        console.log('================================================================================');
        console.log('📊 SUMMARY');
        console.log('================================================================================\n');
        console.log(`✅ Total access grants created: ${grantCount}`);
        console.log(`👥 Users granted access: ${usersToGrant.length}`);
        console.log(`📦 Kits available: ${kits.length}`);
        console.log(`🎯 Expected grants: ${usersToGrant.length * kits.length}`);

        console.log('\n🎉 Access granted successfully!');
        console.log('================================================================================\n');

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        if (error.response) {
            console.error('Response:', JSON.stringify(error.response, null, 2));
        }
    }
}

grantAccessToAll();
