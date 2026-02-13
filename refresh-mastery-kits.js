import PocketBase from 'pocketbase';
import fs from 'fs';
import path from 'path';

const pb = new PocketBase('http://3.101.63.121:8098');

// Admin credentials
const ADMIN_EMAIL = 'mainaksaha0807@gmail.com';
const ADMIN_PASSWORD = '8104760831';

// New kit configurations
const NEW_KITS = [
    {
        dir: '/Users/mainaksaha/Desktop/MASTERS/Project/TLN/frenchmastery/A2',
        title: 'French Mastery Kit - A2 Level',
        description: 'Complete A2 level French learning materials with exercises, audio, and video content',
        language: 'french',
        price: 1799
    },
    {
        dir: '/Users/mainaksaha/Desktop/MASTERS/Project/TLN/frenchmastery/B1',
        title: 'French Mastery Kit - B1 Level',
        description: 'Comprehensive B1 level French materials for intermediate learners',
        language: 'french',
        price: 2199
    },
    {
        dir: '/Users/mainaksaha/Desktop/MASTERS/Project/TLN/frenchmastery/B2',
        title: 'French Mastery Kit - B2 Level',
        description: 'Advanced B2 level French learning resources and practice materials',
        language: 'french',
        price: 2499
    },
    {
        dir: '/Users/mainaksaha/Desktop/MASTERS/Project/TLN/frenchmastery/FREEBIES',
        title: 'French Mastery Kit - Free Resources',
        description: 'Free French learning resources, tips, and bonus materials',
        language: 'french',
        price: 0
    },
    {
        dir: '/Users/mainaksaha/Desktop/MASTERS/Project/TLN/frenchmastery/Novels, audiobooks & songs',
        title: 'French Mastery Kit - Novels & Media',
        description: 'French novels, audiobooks, and songs for immersive learning',
        language: 'french',
        price: 999
    }
];

// Supported file extensions
const SUPPORTED_EXTENSIONS = ['.pdf', '.mp3', '.mp4', '.zip', '.epub', '.docx', '.txt'];

/**
 * Recursively find all files in a directory
 */
function findAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            findAllFiles(filePath, fileList);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (SUPPORTED_EXTENSIONS.includes(ext) && !file.startsWith('.')) {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
}

async function deleteAllPurchases() {
    console.log('🗑️  Deleting all purchase records first...\n');

    try {
        const purchases = await pb.collection('mastery_kit_purchases').getFullList();

        for (const purchase of purchases) {
            await pb.collection('mastery_kit_purchases').delete(purchase.id);
        }

        console.log(`✅ Deleted ${purchases.length} purchase records\n`);
    } catch (error) {
        console.error('Error deleting purchases:', error.message);
        throw error;
    }
}

async function deleteAllExistingKits() {
    console.log('🗑️  Deleting all existing mastery kits...\n');

    try {
        const existingKits = await pb.collection('mastery_kits').getFullList();

        for (const kit of existingKits) {
            console.log(`   Deleting: ${kit.title} (${kit.files?.length || 0} files)`);
            await pb.collection('mastery_kits').delete(kit.id);
        }

        console.log(`\n✅ Deleted ${existingKits.length} existing kits\n`);
    } catch (error) {
        console.error('Error deleting kits:', error.message);
        throw error;
    }
}

async function uploadKit(kitConfig) {
    console.log(`\n📤 Uploading: ${kitConfig.title}`);
    console.log(`   Directory: ${kitConfig.dir}`);

    // Check if directory exists
    if (!fs.existsSync(kitConfig.dir)) {
        console.log(`   ⚠️  Directory not found, skipping...`);
        return null;
    }

    // Find all files recursively
    const files = findAllFiles(kitConfig.dir);
    console.log(`   Found ${files.length} files`);

    if (files.length === 0) {
        console.log(`   ⚠️  No files found, skipping...`);
        return null;
    }

    // Create FormData
    const formData = new FormData();
    formData.append('title', kitConfig.title);
    formData.append('language', kitConfig.language);
    formData.append('description', kitConfig.description);
    formData.append('price', kitConfig.price);

    // Add files to FormData
    let uploadedCount = 0;
    for (const filePath of files) {
        try {
            const fileName = path.basename(filePath);
            const fileBuffer = fs.readFileSync(filePath);
            const fileSize = (fileBuffer.length / (1024 * 1024)).toFixed(2);

            const blob = new Blob([fileBuffer]);
            formData.append('files', blob, fileName);

            uploadedCount++;
            console.log(`   ${uploadedCount}/${files.length} ✓ ${fileName} (${fileSize} MB)`);
        } catch (error) {
            console.error(`   ✗ Failed to add file: ${path.basename(filePath)}`);
        }
    }

    // Upload to PocketBase
    console.log(`\n   🚀 Uploading to S3 via PocketBase...`);
    try {
        const record = await pb.collection('mastery_kits').create(formData);
        console.log(`   ✅ Upload successful!`);
        console.log(`   ID: ${record.id}`);
        console.log(`   Files uploaded: ${record.files?.length || 0}`);
        return record;
    } catch (error) {
        console.error(`   ❌ Upload failed:`, error.message);
        return null;
    }
}

async function main() {
    try {
        console.log('================================================================================');
        console.log('🔄 MASTERY KIT REFRESH PROCESS');
        console.log('================================================================================\n');

        // Authenticate
        console.log('🔐 Authenticating...');
        await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
        console.log('✅ Authenticated\n');

        // Delete purchases first (to avoid foreign key constraints)
        await deleteAllPurchases();

        // Delete all existing kits
        await deleteAllExistingKits();

        // Upload new kits
        console.log('================================================================================');
        console.log('📦 UPLOADING NEW KITS');
        console.log('================================================================================');

        const results = [];
        for (const kitConfig of NEW_KITS) {
            const result = await uploadKit(kitConfig);
            results.push(result);

            // Wait 2 seconds between uploads
            if (result) {
                console.log('   ⏸️  Waiting 2 seconds before next upload...\n');
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        // Summary
        console.log('\n================================================================================');
        console.log('📊 UPLOAD SUMMARY');
        console.log('================================================================================\n');

        const successful = results.filter(r => r !== null);
        console.log(`✅ Successfully uploaded: ${successful.length}/${NEW_KITS.length} kits`);
        console.log(`📁 Total files: ${successful.reduce((sum, r) => sum + (r.files?.length || 0), 0)}`);

        console.log('\n📋 Uploaded Kits:');
        successful.forEach((kit, i) => {
            console.log(`${i + 1}. ${kit.title} - ${kit.files?.length || 0} files`);
        });

        console.log('\n⚠️  NOTE: All previous purchase records were deleted.');
        console.log('   You will need to re-grant access to users via the admin panel.');

        console.log('\n🎉 Process complete!');
        console.log('================================================================================\n');

    } catch (error) {
        console.error('\n❌ Fatal error:', error.message);
        process.exit(1);
    }
}

main();
