/**
 * Ensure mastery_kits and mastery_kit_purchases collections + fields exist.
 *
 * This script is SAFE to run on an existing PocketBase instance:
 * - If a collection is missing, it will be created.
 * - If it exists, required fields and API rules will be merged/updated.
 *
 * Usage (from language-network/backend):
 *   node scripts/ensure-mastery-kits-schema.cjs
 */

const PocketBase = require('pocketbase/cjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const PB_URL = (process.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8098').replace(/\/_\/$/, '');
const ADMIN_EMAIL = process.env.pocketbase_admin;
const ADMIN_PASSWORD = process.env.pocketbase_password;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('❌ Missing pocketbase_admin / pocketbase_password in .env');
  process.exit(1);
}

async function main() {
  const pb = new PocketBase(PB_URL);

  try {
    console.log('🔐 Authenticating as PocketBase admin…');
    await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log('✅ Admin auth OK\n');

    const collections = await pb.collections.getFullList();
    const byName = Object.fromEntries(collections.map((c) => [c.name, c]));

    // --- 1) mastery_kits ---------------------------------------------------
    const masteryKitsBase = {
      name: 'mastery_kits',
      type: 'base',
      schema: [],
      listRule: '',
      viewRule: '',
      createRule: '@request.auth.id != ""',
      updateRule: '@request.auth.id != ""',
      deleteRule: '@request.auth.id != ""',
    };

    const masteryKitFields = [
      { name: 'title', type: 'text', required: true },
      { name: 'language', type: 'text', required: false },
      { name: 'description', type: 'text', required: false },
      { name: 'price', type: 'number', required: false },
      { name: 'files', type: 'file', required: false },
      { name: 'thumbnail', type: 'file', required: false },
    ];

    if (!byName.mastery_kits) {
      console.log('📦 Creating mastery_kits collection…');
      masteryKitsBase.schema = masteryKitFields;
      await pb.collections.create(masteryKitsBase);
      console.log('✅ mastery_kits created\n');
    } else {
      console.log('ℹ️ mastery_kits exists – ensuring fields & rules…');
      const coll = byName.mastery_kits;
      const existingFields = Object.fromEntries(coll.schema.map((f) => [f.name, f]));

      // Merge fields (add if missing)
      for (const f of masteryKitFields) {
        if (!existingFields[f.name]) {
          coll.schema.push({
            name: f.name,
            type: f.type,
            required: f.required,
            options: f.options || {},
          });
          console.log(`  ➕ added field mastery_kits.${f.name}`);
        }
      }

      // Ensure rules (don't loosen if already stricter)
      coll.listRule = coll.listRule ?? '';
      coll.viewRule = coll.viewRule ?? '';
      coll.createRule = coll.createRule || '@request.auth.id != ""';
      coll.updateRule = coll.updateRule || '@request.auth.id != ""';
      coll.deleteRule = coll.deleteRule || '@request.auth.id != ""';

      await pb.collections.update(coll.id, coll);
      console.log('✅ mastery_kits schema updated\n');
    }

    // --- 2) mastery_kit_purchases ------------------------------------------
    const purchasesBase = {
      name: 'mastery_kit_purchases',
      type: 'base',
      schema: [],
      listRule: '@request.auth.id != "" && user = @request.auth.id',
      viewRule: '@request.auth.id != "" && user = @request.auth.id',
      createRule: '@request.auth.id != ""',
      updateRule: '@request.auth.id != ""',
      deleteRule: '@request.auth.id != ""',
    };

    const purchaseFields = [
      {
        name: 'user',
        type: 'relation',
        required: true,
        options: {
          collectionId: '_pb_users_auth_',
          cascadeDelete: false,
          maxSelect: 1,
        },
      },
      {
        name: 'mastery_kit',
        type: 'relation',
        required: true,
        options: {
          // We rely on PocketBase to resolve by name via the admin UI if needed
          collectionId: byName.mastery_kits ? byName.mastery_kits.id : null,
          cascadeDelete: false,
          maxSelect: 1,
        },
      },
      { name: 'purchase_date', type: 'date', required: true },
      {
        name: 'payment_status',
        type: 'select',
        required: true,
        options: {
          maxSelect: 1,
          values: ['pending', 'completed', 'failed', 'refunded'],
        },
      },
      { name: 'transaction_id', type: 'text', required: false, options: { max: 200 } },
    ];

    if (!byName.mastery_kit_purchases) {
      console.log('📦 Creating mastery_kit_purchases collection…');
      purchasesBase.schema = purchaseFields;
      await pb.collections.create(purchasesBase);
      console.log('✅ mastery_kit_purchases created\n');
    } else {
      console.log('ℹ️ mastery_kit_purchases exists – ensuring fields & rules…');
      const coll = byName.mastery_kit_purchases;
      const existingFields = Object.fromEntries(coll.schema.map((f) => [f.name, f]));

      for (const f of purchaseFields) {
        if (!existingFields[f.name]) {
          coll.schema.push({
            name: f.name,
            type: f.type,
            required: f.required,
            options: f.options || {},
          });
          console.log(`  ➕ added field mastery_kit_purchases.${f.name}`);
        }
      }

      coll.listRule = '@request.auth.id != "" && user = @request.auth.id';
      coll.viewRule = '@request.auth.id != "" && user = @request.auth.id';
      coll.createRule = '@request.auth.id != ""';
      coll.updateRule = coll.updateRule || '@request.auth.id != ""';
      coll.deleteRule = coll.deleteRule || '@request.auth.id != ""';

      await pb.collections.update(coll.id, coll);
      console.log('✅ mastery_kit_purchases schema updated\n');
    }

    console.log('🎉 Mastery Kit collections & fields are ensured.');
  } catch (err) {
    console.error('❌ Failed to ensure mastery kit schema:', err);
    process.exit(1);
  }
}

main();

