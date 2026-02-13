import PocketBase from 'pocketbase';
import fs from 'fs';
import path from 'path';

const pb = new PocketBase('http://3.101.63.121:8098');

// Admin credentials
const ADMIN_EMAIL = 'mainaksaha0807@gmail.com';
const ADMIN_PASSWORD = '8104760831';

const B2_DIR = '/Users/mainaksaha/Desktop/MASTERS/Project/TLN/frenchmastery/B2';
const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB limit

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

async function uploadB2Kit() {
    try {
        console.log('================================================================================');
        console.log('📤 UPLOADING B2 KIT (WITHOUT LARGE VIDEO)');
        console.log('================================================================================\n');

        // Authenticate
        console.log('🔐 Authenticating...');
        await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
        console.log('✅ Authenticated\n');

        console.log(`📂 Scanning directory: ${B2_DIR}`);

        // Check if directory exists
        if (!fs.existsSync(B2_DIR)) {
            console.log('❌ Directory not found!');
            return;
        }

        // Find all files
        const allFiles = findAllFiles(B2_DIR);
        console.log(`   Found ${allFiles.length} total files\n`);

        // Filter out files larger than 500MB
        const validFiles = [];
        const skippedFiles = [];

        for (const filePath of allFiles) {
            const stat = fs.statSync(filePath);
            const fileSizeMB = stat.size / (1024 * 1024);

            if (stat.size <= MAX_FILE_SIZE) {
                validFiles.push(filePath);
            } else {
                skippedFiles.push({ path: filePath, size: fileSizeMB.toFixed(2) });
            }
        }

        console.log(`✅ Files to upload: ${validFiles.length}`);
        console.log(`⚠️  Files skipped (too large): ${skippedFiles.length}\n`);

        if (skippedFiles.length > 0) {
            console.log('Skipped files:');
            skippedFiles.forEach(f => {
                console.log(`   - ${path.basename(f.path)} (${f.size} MB)`);
            });
            console.log('');
        }

        if (validFiles.length === 0) {
            console.log('❌ No valid files to upload!');
            return;
        }

        // Create FormData
        const formData = new FormData();
        formData.append('title', 'French Mastery Kit - B2 Level');
        formData.append('language', 'french');
        formData.append('description', 'Advanced B2 level French learning resources and practice materials (Note: Large video files available separately)');
        formData.append('price', 2499);

        // Add files to FormData
        console.log('📦 Preparing files for upload:\n');
        let uploadedCount = 0;
        for (const filePath of validFiles) {
            const fileName = path.basename(filePath);
            const fileBuffer = fs.readFileSync(filePath);
            const fileSize = (fileBuffer.length / (1024 * 1024)).toFixed(2);

            const blob = new Blob([fileBuffer]);
            formData.append('files', blob, fileName);

            uploadedCount++;
            console.log(`   ${uploadedCount}/${validFiles.length} ✓ ${fileName} (${fileSize} MB)`);
        }

        // Upload to PocketBase
        console.log(`\n🚀 Uploading to S3 via PocketBase...`);
        const record = await pb.collection('mastery_kits').create(formData);

        console.log('\n✅ Upload successful!');
        console.log(`   ID: ${record.id}`);
        console.log(`   Files uploaded: ${record.files?.length || 0}`);

        console.log('\n================================================================================');
        console.log('🎉 B2 KIT UPLOAD COMPLETE');
        console.log('================================================================================\n');

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        if (error.response) {
            console.error('Response:', JSON.stringify(error.response, null, 2));
        }
    }
}

uploadB2Kit();
