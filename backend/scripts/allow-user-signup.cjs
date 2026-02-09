/**
 * Allow self-registration on PocketBase users (auth) collection.
 * Sets createRule to "" so anyone can create a user account.
 *
 * Run from language-network/backend:
 *   node scripts/allow-user-signup.cjs
 */

const PocketBase = require('pocketbase/cjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const PB_URL = (process.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8098').replace(/\/_\/$/, '');
const ADMIN_EMAIL = process.env.pocketbase_admin;
const ADMIN_PASSWORD = process.env.pocketbase_password;

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

  const collections = await pb.collections.getFullList();
  const usersColl = collections.find((c) => c.name === 'users');
  if (!usersColl) {
    console.error('❌ Users collection not found.');
    process.exit(1);
  }

  // Allow anyone to create a user (self-registration)
  const prevCreate = usersColl.createRule;
  usersColl.createRule = '';
  // Users should only list/view their own record (optional; PB default often allows own record)
  usersColl.listRule = usersColl.listRule ?? 'id = @request.auth.id';
  usersColl.viewRule = usersColl.viewRule ?? 'id = @request.auth.id';

  await pb.collections.update(usersColl.id, {
    createRule: usersColl.createRule,
    listRule: usersColl.listRule,
    viewRule: usersColl.viewRule,
  });

  console.log('✅ Users collection updated for self-registration.');
  if (prevCreate !== '') console.log('   createRule was:', prevCreate || '(empty)', '→ now: (empty = anyone can sign up)');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
