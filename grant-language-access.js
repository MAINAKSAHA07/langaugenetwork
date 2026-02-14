import PocketBase from 'pocketbase';

const pb = new PocketBase('http://3.101.63.121:8098');

// Configuration - Change these as needed
const TARGET_USER_EMAIL = 'mainaksaha0807@gmail.com'; // User to grant access to
const TARGET_LANGUAGE = 'french'; // Language to grant: 'french', 'english', or 'german'

async function grantLanguageAccess() {
    try {
        console.log('================================================================================');
        console.log('🔑 GRANT LANGUAGE-SPECIFIC ACCESS');
        console.log('================================================================================\n');

        console.log('🔐 Authenticating as admin...');
        await pb.admins.authWithPassword('mainaksaha0807@gmail.com', '8104760831');
        console.log('✅ Authenticated\n');

        // Find the user
        const users = await pb.collection('users').getFullList({
            filter: `email="${TARGET_USER_EMAIL}"`
        });

        if (users.length === 0) {
            console.log(`❌ User not found: ${TARGET_USER_EMAIL}`);
            return;
        }

        const user = users[0];
        console.log(`👤 User: ${user.email} (${user.name || 'No name'})\n`);

        // Get all kits for the target language
        const allKits = await pb.collection('mastery_kits').getFullList({
            filter: `language="${TARGET_LANGUAGE}"`,
            sort: 'title'
        });

        if (allKits.length === 0) {
            console.log(`❌ No kits found for language: ${TARGET_LANGUAGE}`);
            return;
        }

        console.log(`📦 Found ${allKits.length} ${TARGET_LANGUAGE.toUpperCase()} kits:\n`);
        allKits.forEach((kit, i) => {
            console.log(`   ${i + 1}. ${kit.title} (${kit.files?.length || 0} files)`);
        });
        console.log('');

        // Check existing access
        const existingPurchases = await pb.collection('mastery_kit_purchases').getFullList({
            filter: `user="${user.id}" && payment_status="completed"`
        });
        const existingKitIds = new Set(existingPurchases.map(p => p.mastery_kit));

        // Grant access to language kits
        let granted = 0;
        let skipped = 0;

        console.log(`🚀 Granting ${TARGET_LANGUAGE.toUpperCase()} access...\n`);

        for (const kit of allKits) {
            if (existingKitIds.has(kit.id)) {
                console.log(`   ⏭️  Already has: ${kit.title}`);
                skipped++;
                continue;
            }

            await pb.collection('mastery_kit_purchases').create({
                user: user.id,
                mastery_kit: kit.id,
                purchase_date: new Date().toISOString(),
                payment_status: 'completed',
                transaction_id: `ADMIN_${TARGET_LANGUAGE.toUpperCase()}_${Date.now()}_${granted}`,
                amount: kit.price || 0
            });

            console.log(`   ✅ Granted: ${kit.title}`);
            granted++;
        }

        console.log('\n================================================================================');
        console.log('📊 SUMMARY');
        console.log('================================================================================\n');
        console.log(`User: ${user.email}`);
        console.log(`Language: ${TARGET_LANGUAGE.toUpperCase()}`);
        console.log(`Kits granted: ${granted}`);
        console.log(`Already had: ${skipped}`);
        console.log(`Total ${TARGET_LANGUAGE.toUpperCase()} access: ${granted + skipped}/${allKits.length}`);
        console.log('\n✅ Done!\n');

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        if (error.response) {
            console.error('Response:', error.response);
        }
    }
}

grantLanguageAccess();
