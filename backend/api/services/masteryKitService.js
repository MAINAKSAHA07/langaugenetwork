import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090');

/**
 * Check if user has purchased a specific mastery kit
 */
export async function checkUserAccess(userId, masteryKitId) {
    try {
        const purchases = await pb.collection('mastery_kit_purchases').getFullList({
            filter: `user="${userId}" && mastery_kit="${masteryKitId}" && payment_status="completed"`,
        });

        return purchases.length > 0;
    } catch (error) {
        console.error('Error checking user access:', error);
        return false;
    }
}

/**
 * Get all mastery kits purchased by a user
 */
export async function getUserMasteryKits(userId) {
    try {
        const purchases = await pb.collection('mastery_kit_purchases').getFullList({
            filter: `user="${userId}" && payment_status="completed"`,
            expand: 'mastery_kit',
        });

        return purchases.map(purchase => ({
            id: purchase.expand.mastery_kit.id,
            title: purchase.expand.mastery_kit.title,
            language: purchase.expand.mastery_kit.language,
            description: purchase.expand.mastery_kit.description,
            thumbnail: purchase.expand.mastery_kit.thumbnail,
            purchaseDate: purchase.purchase_date,
        }));
    } catch (error) {
        console.error('Error fetching user mastery kits:', error);
        throw error;
    }
}

/**
 * Get mastery kit details with files (only if user has access)
 */
export async function getMasteryKitContent(userId, masteryKitId) {
    try {
        // Check if user has access
        const hasAccess = await checkUserAccess(userId, masteryKitId);

        if (!hasAccess) {
            throw new Error('Access denied: User has not purchased this mastery kit');
        }

        // Fetch mastery kit with files
        const masteryKit = await pb.collection('mastery_kits').getOne(masteryKitId);

        // Generate file URLs (PocketBase automatically handles S3 presigned URLs)
        const fileUrls = masteryKit.files.map(filename => {
            return pb.files.getUrl(masteryKit, filename, {
                // Optional: Add token for additional security
                token: pb.authStore.token,
            });
        });

        return {
            id: masteryKit.id,
            title: masteryKit.title,
            language: masteryKit.language,
            description: masteryKit.description,
            files: fileUrls,
            thumbnail: pb.files.getUrl(masteryKit, masteryKit.thumbnail),
        };
    } catch (error) {
        console.error('Error fetching mastery kit content:', error);
        throw error;
    }
}

/**
 * Record a mastery kit purchase
 */
export async function recordPurchase(userId, masteryKitId, transactionId) {
    try {
        const purchase = await pb.collection('mastery_kit_purchases').create({
            user: userId,
            mastery_kit: masteryKitId,
            purchase_date: new Date().toISOString(),
            payment_status: 'completed',
            transaction_id: transactionId,
        });

        return purchase;
    } catch (error) {
        console.error('Error recording purchase:', error);
        throw error;
    }
}

/**
 * Get all available mastery kits (for browsing/purchasing)
 */
export async function getAllMasteryKits() {
    try {
        const kits = await pb.collection('mastery_kits').getFullList({
            sort: '-created',
        });

        return kits.map(kit => ({
            id: kit.id,
            title: kit.title,
            language: kit.language,
            description: kit.description,
            price: kit.price,
            thumbnail: pb.files.getUrl(kit, kit.thumbnail),
        }));
    } catch (error) {
        console.error('Error fetching mastery kits:', error);
        throw error;
    }
}

/**
 * Admin: Upload mastery kit files to S3 via PocketBase
 */
export async function uploadMasteryKitFiles(masteryKitData, files) {
    try {
        // Authenticate as admin
        await pb.admins.authWithPassword(
            process.env.POCKETBASE_ADMIN_EMAIL,
            process.env.POCKETBASE_ADMIN_PASSWORD
        );

        const formData = new FormData();
        formData.append('title', masteryKitData.title);
        formData.append('language', masteryKitData.language);
        formData.append('description', masteryKitData.description);
        formData.append('price', masteryKitData.price);

        // Append files (PocketBase will upload to S3)
        files.forEach((file, index) => {
            formData.append('files', file);
        });

        if (masteryKitData.thumbnail) {
            formData.append('thumbnail', masteryKitData.thumbnail);
        }

        const record = await pb.collection('mastery_kits').create(formData);
        return record;
    } catch (error) {
        console.error('Error uploading mastery kit:', error);
        throw error;
    }
}

export default {
    checkUserAccess,
    getUserMasteryKits,
    getMasteryKitContent,
    recordPurchase,
    getAllMasteryKits,
    uploadMasteryKitFiles,
};
