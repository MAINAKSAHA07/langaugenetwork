import PocketBase from 'pocketbase';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pb = new PocketBase('http://3.101.63.121:8098');

// German A2 Kit Directory
const GERMAN_A2_DIR = '/Users/mainaksaha/Desktop/MASTERS/Project/TLN/Germanmastery/German A2 Mastery Kit';

async function uploadGermanA2Kit() {
    try {
        console.log('================================================================================');
        console.log('🇩🇪 UPLOADING GERMAN A2 MASTERY KIT');
        console.log('================================================================================\n');

        // Authenticate as admin
        console.log('🔐 Authenticating as admin...');
        await pb.admins.authWithPassword('mainaksaha0807@gmail.com', '8104760831');
        console.log('✅ Authenticated\n');

        // Check if German A2 kit already exists
        const existingKits = await pb.collection('mastery_kits').getFullList({
            filter: 'language="german" && title~"A2"'
        });

        let kitRecord;

        if (existingKits.length > 0) {
            kitRecord = existingKits[0];
            console.log(`📦 Found existing German A2 kit: ${kitRecord.id}`);
            console.log(`   Current files: ${kitRecord.files?.length || 0}\n`);
        } else {
            // Create new German A2 kit
            console.log('📦 Creating new German A2 Mastery Kit...');
            kitRecord = await pb.collection('mastery_kits').create({
                title: 'German Mastery Kit - A2 Level',
                description: 'Complete German A2 learning kit with classwork, exercises, and answer key aligned with Goethe-Zertifikat A2',
                language: 'german',
                level: 'A2',
                price: 999,
                files: []
            });
            console.log(`✅ Created kit: ${kitRecord.id}\n`);
        }

        // Get all PDF files from the directory
        const files = fs.readdirSync(GERMAN_A2_DIR).filter(file =>
            file.endsWith('.pdf') && !file.startsWith('.')
        );

        console.log(`📁 Found ${files.length} PDF files to upload:\n`);
        files.forEach((file, i) => {
            const stats = fs.statSync(path.join(GERMAN_A2_DIR, file));
            const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
            console.log(`   ${i + 1}. ${file} (${sizeMB} MB)`);
        });
        console.log('');

        // Upload files
        console.log('🚀 Uploading files...\n');
        const formData = new FormData();

        for (const file of files) {
            const filePath = path.join(GERMAN_A2_DIR, file);
            const stats = fs.statSync(filePath);
            const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

            console.log(`   📤 Uploading: ${file} (${sizeMB} MB)...`);

            try {
                const fileBuffer = fs.readFileSync(filePath);
                const blob = new Blob([fileBuffer], { type: 'application/pdf' });
                formData.append('files', blob, file);
                console.log(`   ✅ Added to upload queue`);
            } catch (err) {
                console.log(`   ❌ Error reading file: ${err.message}`);
            }
        }

        // Update the kit with all files
        console.log('\n📤 Uploading all files to PocketBase...');
        const updatedKit = await pb.collection('mastery_kits').update(kitRecord.id, formData);

        console.log('\n================================================================================');
        console.log('📊 UPLOAD SUMMARY');
        console.log('================================================================================\n');
        console.log(`Kit ID: ${updatedKit.id}`);
        console.log(`Title: ${updatedKit.title}`);
        console.log(`Language: ${updatedKit.language.toUpperCase()}`);
        console.log(`Level: ${updatedKit.level}`);
        console.log(`Price: ₹${updatedKit.price}`);
        console.log(`Total Files: ${updatedKit.files?.length || 0}`);
        console.log('');

        if (updatedKit.files && updatedKit.files.length > 0) {
            console.log('📁 Uploaded Files:');
            updatedKit.files.forEach((file, i) => {
                console.log(`   ${i + 1}. ${file}`);
            });
        }

        console.log('\n✅ German A2 Mastery Kit uploaded successfully!\n');

        // Now grant access to existing users
        console.log('================================================================================');
        console.log('🔑 GRANTING ACCESS TO USERS');
        console.log('================================================================================\n');

        const usersToGrant = [
            'mainaksaha0807@gmail.com',
            'chokhanisiddhi@gmail.com'
        ];

        for (const email of usersToGrant) {
            try {
                const users = await pb.collection('users').getFullList({
                    filter: `email="${email}"`
                });

                if (users.length === 0) {
                    console.log(`⏭️  User not found: ${email}`);
                    continue;
                }

                const user = users[0];

                // Check if already has access
                const existing = await pb.collection('mastery_kit_purchases').getFullList({
                    filter: `user="${user.id}" && mastery_kit="${updatedKit.id}"`
                });

                if (existing.length > 0) {
                    console.log(`⏭️  ${email} already has access`);
                    continue;
                }

                // Grant access
                await pb.collection('mastery_kit_purchases').create({
                    user: user.id,
                    mastery_kit: updatedKit.id,
                    purchase_date: new Date().toISOString(),
                    payment_status: 'completed',
                    transaction_id: `ADMIN_GERMAN_A2_${Date.now()}`,
                    amount: updatedKit.price
                });

                console.log(`✅ Granted access to: ${email}`);
            } catch (err) {
                console.log(`❌ Error granting access to ${email}: ${err.message}`);
            }
        }

        console.log('\n🎉 All done!\n');

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        if (error.response) {
            console.error('Response:', error.response);
        }
        process.exit(1);
    }
}

uploadGermanA2Kit();
