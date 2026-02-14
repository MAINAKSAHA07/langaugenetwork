import PocketBase from 'pocketbase';
import fs from 'fs';
import path from 'path';

const pb = new PocketBase('http://3.101.63.121:8098');

// Admin credentials
const ADMIN_EMAIL = 'mainaksaha0807@gmail.com';
const ADMIN_PASSWORD = '8104760831';

const A1_DIR = '/Users/mainaksaha/Desktop/MASTERS/Project/TLN/frenchmastery/A1';

// Supported file extensions
const SUPPORTED_EXTENSIONS = ['.pdf', '.mp3', '.mp4', '.zip', '.epub', '.docx', '.txt'];

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

async function uploadA1Kit() {
    try {
        console.log('================================================================================');
        console.log('📤 UPLOADING A1 MASTERY KIT');
        console.log('================================================================================\n');

        // Authenticate
        console.log('🔐 Authenticating...');
        await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
        console.log('✅ Authenticated\n');

        console.log(`📂 Scanning directory: ${A1_DIR}`);

        if (!fs.existsSync(A1_DIR)) {
            console.log('❌ Directory not found!');
            return;
        }

        // Find all files recursively
        const files = findAllFiles(A1_DIR);
        console.log(`   Found ${files.length} total files\n`);

        if (files.length === 0) {
            console.log('❌ No files found!');
            return;
        }

        // Create FormData
        const formData = new FormData();
        formData.append('title', 'French Mastery Kit - A1 Level');
        formData.append('language', 'french');
        formData.append('description', 'Complete A1 level French learning materials for absolute beginners with exercises, audio, and video content');
        formData.append('price', 1499);

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
                console.error(`   ✗ Failed: ${path.basename(filePath)}`);
            }
        }

        console.log(`\n   📊 Total size: ${totalSize.toFixed(2)} MB`);
        console.log(`\n🚀 Uploading to S3 via PocketBase...`);
        console.log('   ⏳ This may take several minutes...\n');

        const record = await pb.collection('mastery_kits').create(formData);

        console.log('✅ Upload successful!');
        console.log(`   ID: ${record.id}`);
        console.log(`   Files uploaded: ${record.files?.length || 0}`);

        // Grant access to users
        console.log('\n🔑 Granting access to users...\n');

        const users = await pb.collection('users').getFullList();
        const usersToGrant = ['mainaksaha0807@gmail.com', 'chokhanisiddhi@gmail.com'];

        for (const email of usersToGrant) {
            const user = users.find(u => u.email === email);
            if (!user) continue;

            try {
                await pb.collection('mastery_kit_purchases').create({
                    user: user.id,
                    mastery_kit: record.id,
                    purchase_date: new Date().toISOString(),
                    payment_status: 'completed',
                    transaction_id: `ADMIN_GRANT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    amount: record.price || 0
                });

                console.log(`   ✅ ${email}`);
            } catch (error) {
                console.log(`   ⚠️  ${email} - ${error.message}`);
            }
        }

        console.log('\n================================================================================');
        console.log('🎉 A1 KIT UPLOAD COMPLETE');
        console.log('================================================================================\n');

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        if (error.response) {
            console.error('Response:', JSON.stringify(error.response, null, 2));
        }
    }
}

uploadA1Kit();
