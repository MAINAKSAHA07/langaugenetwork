import PocketBase from 'pocketbase';
import fs from 'fs';
import path from 'path';

const pb = new PocketBase('http://3.101.63.121:8098');

// Admin credentials
const ADMIN_EMAIL = 'mainaksaha0807@gmail.com';
const ADMIN_PASSWORD = '8104760831';

const B2_DIR = '/Users/mainaksaha/Desktop/MASTERS/Project/TLN/frenchmastery/B2';
const VIDEO_PARTS = [
    'French B2 Practice Videos - Part 1.zip',
    'French B2 Practice Videos - Part 2.zip'
];

async function uploadB2VideoParts() {
    try {
        console.log('================================================================================');
        console.log('📤 UPLOADING B2 VIDEO PARTS TO S3');
        console.log('================================================================================\n');

        // Authenticate
        console.log('🔐 Authenticating...');
        await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
        console.log('✅ Authenticated\n');

        // Get B2 kit
        const kits = await pb.collection('mastery_kits').getFullList();
        const b2Kit = kits.find(k => k.title.includes('B2'));

        if (!b2Kit) {
            console.log('❌ B2 kit not found!');
            return;
        }

        console.log(`📦 Found B2 kit: ${b2Kit.id}`);
        console.log(`   Current files: ${b2Kit.files?.length || 0}\n`);

        // Upload each part
        for (let i = 0; i < VIDEO_PARTS.length; i++) {
            const partName = VIDEO_PARTS[i];
            const partPath = path.join(B2_DIR, partName);

            console.log(`\n📤 Uploading Part ${i + 1}/${VIDEO_PARTS.length}: ${partName}`);

            if (!fs.existsSync(partPath)) {
                console.log(`   ❌ File not found: ${partPath}`);
                continue;
            }

            const stat = fs.statSync(partPath);
            const fileSizeMB = (stat.size / (1024 * 1024)).toFixed(2);
            console.log(`   Size: ${fileSizeMB} MB`);

            // Create FormData
            const formData = new FormData();
            const fileBuffer = fs.readFileSync(partPath);
            const blob = new Blob([fileBuffer]);
            formData.append('files', blob, partName);

            console.log(`   🚀 Uploading to S3...`);

            try {
                const record = await pb.collection('mastery_kits').update(b2Kit.id, formData);
                console.log(`   ✅ Upload successful!`);
                console.log(`   Total files in B2 kit: ${record.files?.length || 0}`);
            } catch (error) {
                console.error(`   ❌ Upload failed: ${error.message}`);
            }

            // Wait 2 seconds between uploads
            if (i < VIDEO_PARTS.length - 1) {
                console.log(`   ⏸️  Waiting 2 seconds before next part...`);
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        console.log('\n================================================================================');
        console.log('🎉 ALL PARTS UPLOADED');
        console.log('================================================================================\n');

        // Final status
        const updatedKit = await pb.collection('mastery_kits').getOne(b2Kit.id);
        console.log(`✅ B2 Kit final status:`);
        console.log(`   Total files: ${updatedKit.files?.length || 0}`);
        console.log(`   Title: ${updatedKit.title}`);
        console.log('');

    } catch (error) {
        console.error('\n❌ Error:', error.message);
    }
}

uploadB2VideoParts();
