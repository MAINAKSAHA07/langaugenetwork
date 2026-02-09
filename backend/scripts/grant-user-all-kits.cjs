/**
 * Grant one user access to ALL mastery kits in PocketBase.
 * Use this so a user sees every kit (and all books on S3), not just one.
 *
 * Usage (from language-network/backend):
 *   node scripts/grant-user-all-kits.cjs <user-email>
 *
 * Example:
 *   node scripts/grant-user-all-kits.cjs customer@example.com
 */

const PocketBase = require('pocketbase/cjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const PB_URL = (process.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8098').replace(/\/_\/$/, '');
const ADMIN_EMAIL = process.env.pocketbase_admin;
const ADMIN_PASSWORD = process.env.pocketbase_password;

const userEmail = process.argv[2];
if (!userEmail) {
  console.error('Usage: node scripts/grant-user-all-kits.cjs <user-email>');
  process.exit(1);
}

async function main() {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('❌ Set pocketbase_admin and pocketbase_password in .env');
    process.exit(1);
  }

  const pb = new PocketBase(PB_URL);
  try {
    await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
  } catch (e) {
    console.error('❌ Admin auth failed:', e.message);
    process.exit(1);
  }

  // Find user by email
  const users = await pb.collection('users').getFullList({ filter: `email="${userEmail}"` });
  if (!users.length) {
    console.error('❌ No user found with email:', userEmail);
    process.exit(1);
  }
  const user = users[0];
  console.log('✅ User:', user.email, '(id:', user.id + ')');

  const kits = await pb.collection('mastery_kits').getFullList({ sort: 'title' });
  if (!kits.length) {
    console.error('❌ No mastery kits found in PocketBase.');
    process.exit(1);
  }
  console.log('📦 Mastery kits in DB:', kits.length);

  const existing = await pb.collection('mastery_kit_purchases').getFullList({
    filter: `user="${user.id}" && payment_status="completed"`,
  });
  const existingKitIds = new Set(existing.map((p) => p.mastery_kit));

  let granted = 0;
  for (const kit of kits) {
    if (existingKitIds.has(kit.id)) {
      console.log('   ⏭️  Already has:', kit.title);
      continue;
    }
    await pb.collection('mastery_kit_purchases').create({
      user: user.id,
      mastery_kit: kit.id,
      purchase_date: new Date().toISOString(),
      payment_status: 'completed',
      transaction_id: `SCRIPT-ALL-KITS-${Date.now()}-${granted}`,
    });
    console.log('   ✅ Granted:', kit.title);
    granted++;
  }

  console.log('\n🎉 Done. Granted access to', granted, 'new kit(s). User now has', existingKitIds.size + granted, 'kit(s) in total.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
