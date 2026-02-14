import PocketBase from 'pocketbase';
import fs from 'fs';
import path from 'path';

const pb = new PocketBase('http://3.101.63.121:8098');

// Admin credentials
const ADMIN_EMAIL = 'mainaksaha0807@gmail.com';
const ADMIN_PASSWORD = '8104760831';

const NOVELS_DIR = '/Users/mainaksaha/Desktop/MASTERS/Project/TLN/frenchmastery/Novels, audiobooks & songs';
const B2_VIDEO_FILE = '/Users/mainaksaha/Desktop/MASTERS/Project/TLN/frenchmastery/B2/French B2 Practice Videos.zip';

// Supported file extensions
const SUPPORTED_EXTENSIONS = ['.pdf', '.mp3', '.mp4', '.zip', '.epub', '.docx', '.txt', '.mobi'];

/**
 * Recursively find all files in a directory
 */
function findAllFiles(dir, fileList = []) {
    try {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const filePath = path.join(dir, file);
            try {
                const stat = fs.statSync(filePath);

                if (stat.isDirectory()) {
                    findAllFiles(filePath, fileList);
                } else {
                    const ext = path.extname(file).toLowerCase();
                    if (SUPPORTED_EXTENSIONS.includes(ext) && !file.startsWith('.')) {
                        fileList.push(filePath);
                    }
                }
            } catch (err) {
                console.log(`   ⚠️  Skipping: ${file} (${err.message})`);
            }
        });
    } catch (err) {
        console.log(`   ⚠️  Cannot read directory: ${dir}`);
    }

    return fileList;
}

async function deleteOldNovelsKit() {
    console.log('🗑️  Deleting old Novels & Media kit...\n');

    try {
        const kits = await pb.collection('mastery_kits').getFullList();
        const novelsKit = kits.find(k => k.title.includes('Novels'));

        if (novelsKit) {
            // Delete associated purchases first
            const purchases = await pb.collection('mastery_kit_purchases').getFullList({
                filter: `mastery_kit="${novelsKit.id}"`
            });

            for (const purchase of purchases) {
                await pb.collection('mastery_kit_purchases').delete(purchase.id);
            }
            console.log(`   Deleted ${purchases.length} purchase records`);

            // Delete the kit
            await pb.collection('mastery_kits').delete(novelsKit.id);
            console.log(`   ✅ Deleted: ${novelsKit.title}\n`);
        } else {
            console.log('   No existing Novels kit found\n');
        }
    } catch (error) {
        console.error('   Error:', error.message);
    }
}

async function uploadNovelsKit() {
    console.log('================================================================================');
    console.log('📤 UPLOADING NOVELS & MEDIA KIT (ALL FILES)');
    console.log('================================================================================\n');

    console.log(`📂 Scanning directory: ${NOVELS_DIR}`);

    if (!fs.existsSync(NOVELS_DIR)) {
        console.log('❌ Directory not found!');
        return null;
    }

    // Find all files recursively
    const files = findAllFiles(NOVELS_DIR);
    console.log(`   Found ${files.length} total files\n`);

    if (files.length === 0) {
        console.log('❌ No files found!');
        return null;
    }

    // Create FormData
    const formData = new FormData();
    formData.append('title', 'French Mastery Kit - Novels & Media');
    formData.append('language', 'french');
    formData.append('description', 'French novels, audiobooks, and songs for immersive learning - Complete collection');
    formData.append('price', 999);

    // Add files to FormData
    console.log('📦 Preparing files for upload:\n');
    let uploadedCount = 0;
    let totalSize = 0;

    for (const filePath of files) {
        try {
            const fileName = path.basename(filePath);
            const fileBuffer = fs.readFileSync(filePath);
            const fileSize = fileBuffer.length / (1024 * 1024);
            totalSize += fileSize;

            const blob = new Blob([fileBuffer]);
            formData.append('files', blob, fileName);

            uploadedCount++;
            console.log(`   ${uploadedCount}/${files.length} ✓ ${fileName} (${fileSize.toFixed(2)} MB)`);
        } catch (error) {
            console.error(`   ✗ Failed: ${path.basename(filePath)} - ${error.message}`);
        }
    }

    console.log(`\n   📊 Total size: ${totalSize.toFixed(2)} MB`);
    console.log(`\n🚀 Uploading to S3 via PocketBase...`);

    try {
        const record = await pb.collection('mastery_kits').create(formData);
        console.log('\n✅ Upload successful!');
        console.log(`   ID: ${record.id}`);
        console.log(`   Files uploaded: ${record.files?.length || 0}`);
        return record;
    } catch (error) {
        console.error(`\n❌ Upload failed:`, error.message);
        return null;
    }
}

async function uploadB2Video() {
    console.log('\n================================================================================');
    console.log('📤 UPLOADING B2 LARGE VIDEO FILE');
    console.log('================================================================================\n');

    console.log(`📂 File: ${B2_VIDEO_FILE}`);

    if (!fs.existsSync(B2_VIDEO_FILE)) {
        console.log('❌ File not found!');
        return null;
    }

    const stat = fs.statSync(B2_VIDEO_FILE);
    const fileSizeMB = (stat.size / (1024 * 1024)).toFixed(2);
    console.log(`   Size: ${fileSizeMB} MB\n`);

    // Get B2 kit
    const kits = await pb.collection('mastery_kits').getFullList();
    const b2Kit = kits.find(k => k.title.includes('B2'));

    if (!b2Kit) {
        console.log('❌ B2 kit not found!');
        return null;
    }

    console.log(`   Found B2 kit: ${b2Kit.id}`);
    console.log(`   Current files: ${b2Kit.files?.length || 0}\n`);

    // Create FormData with existing data + new file
    const formData = new FormData();

    // Add the large video file
    console.log('📦 Preparing video file...');
    const fileBuffer = fs.readFileSync(B2_VIDEO_FILE);
    const blob = new Blob([fileBuffer]);
    formData.append('files', blob, 'French B2 Practice Videos.zip');
    console.log(`   ✓ File prepared (${fileSizeMB} MB)\n`);

    console.log('🚀 Uploading to S3 via PocketBase...');
    console.log('   ⏳ This may take several minutes for a 921 MB file...\n');

    try {
        const record = await pb.collection('mastery_kits').update(b2Kit.id, formData);
        console.log('✅ Upload successful!');
        console.log(`   Total files in B2 kit: ${record.files?.length || 0}`);
        return record;
    } catch (error) {
        console.error(`❌ Upload failed:`, error.message);
        console.log('\n💡 The file may be too large for a single upload.');
        console.log('   Consider splitting it into smaller parts or uploading via PocketBase admin panel.');
        return null;
    }
}

async function regrantAccess() {
    console.log('\n================================================================================');
    console.log('🔑 RE-GRANTING ACCESS TO UPDATED KITS');
    console.log('================================================================================\n');

    const USERS = ['mainaksaha0807@gmail.com', 'chokhanisiddhi@gmail.com'];

    const users = await pb.collection('users').getFullList();
    const kits = await pb.collection('mastery_kits').getFullList();
    const novelsKit = kits.find(k => k.title.includes('Novels'));

    if (!novelsKit) {
        console.log('⚠️  No Novels kit found to grant access\n');
        return;
    }

    console.log(`📦 Kit: ${novelsKit.title}\n`);

    for (const userEmail of USERS) {
        const user = users.find(u => u.email === userEmail);
        if (!user) continue;

        try {
            await pb.collection('mastery_kit_purchases').create({
                user: user.id,
                mastery_kit: novelsKit.id,
                purchase_date: new Date().toISOString(),
                payment_status: 'completed',
                transaction_id: `ADMIN_GRANT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                amount: novelsKit.price || 0
            });

            console.log(`   ✅ ${userEmail}`);
        } catch (error) {
            console.log(`   ⚠️  ${userEmail} - ${error.message}`);
        }
    }

    console.log('\n✅ Access re-granted\n');
}

async function main() {
    try {
        console.log('================================================================================');
        console.log('🔄 UPDATE NOVELS KIT & UPLOAD B2 VIDEO');
        console.log('================================================================================\n');

        // Authenticate
        console.log('🔐 Authenticating...');
        await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
        console.log('✅ Authenticated\n');

        // Delete old Novels kit
        await deleteOldNovelsKit();

        // Upload new Novels kit
        const novelsResult = await uploadNovelsKit();

        // Re-grant access
        if (novelsResult) {
            await regrantAccess();
        }

        // Upload B2 video
        await uploadB2Video();

        console.log('================================================================================');
        console.log('🎉 PROCESS COMPLETE');
        console.log('================================================================================\n');

    } catch (error) {
        console.error('\n❌ Fatal error:', error.message);
        process.exit(1);
    }
}

main();
