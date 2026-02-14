import PocketBase from 'pocketbase';

const pb = new PocketBase('http://3.101.63.121:8098');

async function revokeAllAccess() {
    try {
        console.log('================================================================================');
        console.log('🗑️  REVOKE ALL ACCESS');
        console.log('================================================================================\n');

        console.log('🔐 Authenticating as admin...');
        await pb.admins.authWithPassword('mainaksaha0807@gmail.com', '8104760831');
        console.log('✅ Authenticated\n');

        // Get all purchases
        const purchases = await pb.collection('mastery_kit_purchases').getFullList({
            expand: 'user,mastery_kit'
        });

        console.log(`📊 Found ${purchases.length} access grants\n`);

        if (purchases.length === 0) {
            console.log('✅ No access grants to revoke\n');
            return;
        }

        console.log('🗑️  Revoking all access...\n');

        for (const purchase of purchases) {
            const userEmail = purchase.expand?.user?.email || 'Unknown';
            const kitTitle = purchase.expand?.mastery_kit?.title || 'Unknown';

            await pb.collection('mastery_kit_purchases').delete(purchase.id);
            console.log(`   ✅ Revoked: ${userEmail} - ${kitTitle}`);
        }

        console.log('\n================================================================================');
        console.log(`✅ Revoked ${purchases.length} access grants`);
        console.log('================================================================================\n');

    } catch (error) {
        console.error('\n❌ Error:', error.message);
    }
}

revokeAllAccess();
