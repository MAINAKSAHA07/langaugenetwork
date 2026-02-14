import PocketBase from 'pocketbase';
import fs from 'fs';
import path from 'path';

const pb = new PocketBase('http://3.101.63.121:8098');

// Admin credentials
const ADMIN_EMAIL = 'mainaksaha0807@gmail.com';
const ADMIN_PASSWORD = '8104760831';

// German mastery kit configurations
const GERMAN_KITS = [
    {
        dir: '/Users/mainaksaha/Desktop/MASTERS/Project/TLN/Germanmastery/German A1 Mastery Kit',
        title: 'German Mastery Kit - A1 Level',
        description: 'Complete A1 level German learning materials for absolute beginners with exercises and practice content',
        language: 'german',
        price: 1499
    },
    {
        dir: '/Users/mainaksaha/Desktop/MASTERS/Project/TLN/Germanmastery/German A2 Mastery Kit',
        title: 'German Mastery Kit - A2 Level',
        description: 'Complete A2 level German learning materials with exercises, audio, and practice content',
        language: 'german',
        price: 1799
    }
];

// Supported file extensions
const SUPPORTED_EXTENSIONS = ['.pdf', '.mp3', '.mp4', '.zip', '.epub', '.docx', '.txt', '.pptx'];

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
                console.log(`   ⚠️  Skipping: ${file}`);
            }
        });
    } catch (err) {
        console.log(`   ⚠️  Cannot read directory: ${dir}`);
    }

    return fileList;
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
            console.error(`   ✗ Failed to add file: ${path.basename(filePath)}`);
        }
    }

    console.log(`\n   📊 Total size: ${totalSize.toFixed(2)} MB`);
    console.log(`   🚀 Uploading to S3 via PocketBase...`);

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

async function grantAccessToGermanKits(kitRecords) {
    console.log('\n================================================================================');
    console.log('🔑 GRANTING ACCESS TO GERMAN KITS');
    console.log('================================================================================\n');

    const USERS = ['mainaksaha0807@gmail.com', 'chokhanisiddhi@gmail.com'];

    const users = await pb.collection('users').getFullList();

    let grantCount = 0;

    for (const userEmail of USERS) {
        const user = users.find(u => u.email === userEmail);
        if (!user) continue;

        console.log(`📝 Granting access for: ${userEmail}`);

        for (const kit of kitRecords) {
            if (!kit) continue;

            try {
                await pb.collection('mastery_kit_purchases').create({
                    user: user.id,
                    mastery_kit: kit.id,
                    purchase_date: new Date().toISOString(),
                    payment_status: 'completed',
                    transaction_id: `ADMIN_GRANT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    amount: kit.price || 0
                });

                console.log(`   ✅ ${kit.title}`);
                grantCount++;
            } catch (error) {
                console.log(`   ⚠️  ${kit.title} - ${error.message}`);
            }
        }
        console.log('');
    }

    console.log(`✅ Total access grants created: ${grantCount}\n`);
}

async function main() {
    try {
        console.log('================================================================================');
        console.log('📦 UPLOADING GERMAN MASTERY KITS');
        console.log('================================================================================\n');

        // Authenticate
        console.log('🔐 Authenticating...');
        await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
        console.log('✅ Authenticated\n');

        console.log('================================================================================');
        console.log('📤 UPLOADING KITS');
        console.log('================================================================================');

        const results = [];
        for (const kitConfig of GERMAN_KITS) {
            const result = await uploadKit(kitConfig);
            results.push(result);

            // Wait 2 seconds between uploads
            if (result) {
                console.log('   ⏸️  Waiting 2 seconds before next upload...\n');
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        // Grant access to users
        const successful = results.filter(r => r !== null);
        if (successful.length > 0) {
            await grantAccessToGermanKits(successful);
        }

        // Summary
        console.log('================================================================================');
        console.log('📊 UPLOAD SUMMARY');
        console.log('================================================================================\n');

        console.log(`✅ Successfully uploaded: ${successful.length}/${GERMAN_KITS.length} kits`);
        console.log(`📁 Total files: ${successful.reduce((sum, r) => sum + (r.files?.length || 0), 0)}`);

        console.log('\n📋 Uploaded Kits:');
        successful.forEach((kit, i) => {
            console.log(`${i + 1}. ${kit.title} - ${kit.files?.length || 0} files`);
        });

        console.log('\n🎉 Process complete!');
        console.log('================================================================================\n');

    } catch (error) {
        console.error('\n❌ Fatal error:', error.message);
        process.exit(1);
    }
}

main();
