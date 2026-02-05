import PocketBase from 'pocketbase';
import fs from 'fs';
import path from 'path';

// Configuration
const pb = new PocketBase('http://3.101.63.121:8098');
const BASE_DIR = '/Users/mainaksaha/Desktop/MASTERS/Project/TLN/frenchmastery';
const LEVEL_1_DIR = 'French Mastery Kit - Level 1'; // Updated path just in case, sticking to config

// Auth
const ADMIN_EMAIL = 'mainaksaha0807@gmail.com';
const ADMIN_PASSWORD = '8104760831';

async function uploadLevel1() {
    try {
        console.log('🔐 Authenticating...');
        await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);

        const kitInfo = {
            dir: 'French Mastery Kits ', // Note the trailing space from original config
            title: 'French Mastery Kit - Level 1',
            description: 'Comprehensive French learning materials for beginners and intermediate learners',
            price: 1499
        };

        const kitDir = path.join(BASE_DIR, kitInfo.dir);
        console.log(`📂 Reading files from: ${kitDir}`);

        // Get files
        let filesToUpload = [];
        const files = fs.readdirSync(kitDir);
        for (const file of files) {
            const fullPath = path.join(kitDir, file);
            if (fs.statSync(fullPath).isFile() && !file.startsWith('.')) {
                filesToUpload.push(fullPath);
            }
        }

        console.log(`Found ${filesToUpload.length} files. Uploading...`);

        const formData = new FormData();
        formData.append('title', kitInfo.title);
        formData.append('language', 'french');
        formData.append('description', kitInfo.description);
        formData.append('price', kitInfo.price);

        for (const filePath of filesToUpload) {
            const fileName = path.basename(filePath);
            const fileBuffer = fs.readFileSync(filePath);
            const blob = new Blob([fileBuffer]);
            formData.append('files', blob, fileName);
            console.log(` - Prepared: ${fileName}`);
        }

        console.log('🚀 Sending to PocketBase (this will take time for 2GB)...');
        const record = await pb.collection('mastery_kits').create(formData);

        console.log('✅ Success! Level 1 uploaded.');
        console.log('ID:', record.id);

    } catch (error) {
        console.error('❌ Failed:', error);
    }
}

uploadLevel1();
