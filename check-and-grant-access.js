import PocketBase from 'pocketbase';

const pb = new PocketBase('http://3.101.63.121:8098');

async function checkAndGrantAccess() {
    try {
        console.log('🔐 Authenticating as admin...');
        await pb.admins.authWithPassword('mainaksaha0807@gmail.com', '8104760831');
        console.log('✅ Authenticated\n');

        // Get all users
        const users = await pb.collection('users').getFullList();
        console.log(`👥 Found ${users.length} users:\n`);
        users.forEach(u => console.log(`   - ${u.email} (${u.name || 'No name'})`));

        // Get all kits
        const kits = await pb.collection('mastery_kits').getFullList({ sort: 'language,title' });
        console.log(`\n📦 Found ${kits.length} kits:\n`);

        const byLang = {};
        kits.forEach(k => {
            if (!byLang[k.language]) byLang[k.language] = [];
            byLang[k.language].push(k);
        });

        Object.entries(byLang).forEach(([lang, langKits]) => {
            console.log(`   ${lang.toUpperCase()}: ${langKits.length} kits`);
        });

        // Get all purchases
        const purchases = await pb.collection('mastery_kit_purchases').getFullList({
            expand: 'user,mastery_kit'
        });
        console.log(`\n🔑 Found ${purchases.length} access grants\n`);

        // Check access for each user
        console.log('📊 User Access Status:\n');
        for (const user of users) {
            const userPurchases = purchases.filter(p => p.user === user.id);
            console.log(`${user.email}:`);
            console.log(`   Total access: ${userPurchases.length} kits`);

            if (userPurchases.length === 0) {
                console.log('   ⚠️  NO ACCESS - Granting all kits...\n');

                // Grant access to all kits
                for (const kit of kits) {
                    await pb.collection('mastery_kit_purchases').create({
                        user: user.id,
                        mastery_kit: kit.id,
                        purchase_date: new Date().toISOString(),
                        payment_status: 'completed',
                        transaction_id: `ADMIN_GRANT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                        amount: kit.price || 0
                    });
                }
                console.log(`   ✅ Granted access to all ${kits.length} kits\n`);
            } else {
                console.log(`   ✅ Has access\n`);
            }
        }

        console.log('🎉 Done!\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

checkAndGrantAccess();
