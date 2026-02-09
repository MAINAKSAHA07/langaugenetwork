import pb from '../config/pocketbase';

/**
 * Get all mastery kits purchased by the current user
 */
export async function getUserMasteryKits(userId) {
    try {
        const purchases = await pb.collection('mastery_kit_purchases').getFullList({
            filter: `user="${userId}" && payment_status="completed"`,
            expand: 'mastery_kit',
            sort: '-purchase_date',
        });

        return purchases
            .map(purchase => {
                const kit = purchase.expand?.mastery_kit;
                if (!kit) return null;
                return {
                    id: kit.id,
                    title: kit.title,
                    language: kit.language,
                    description: kit.description,
                    thumbnail: kit.thumbnail
                        ? pb.files.getUrl(kit, kit.thumbnail)
                        : '/images/default-mastery-kit.png',
                    purchaseDate: purchase.purchase_date,
                    purchaseId: purchase.id,
                };
            })
            .filter(Boolean);
    } catch (error) {
        console.error('Error fetching user mastery kits:', error);
        throw new Error('Failed to load your mastery kits. Please try again.');
    }
}

/**
 * Get mastery kit content with files (only if user has purchased it)
 */
export async function getMasteryKitContent(userId, masteryKitId) {
    try {
        // First, verify the user has purchased this kit
        const purchases = await pb.collection('mastery_kit_purchases').getFullList({
            filter: `user="${userId}" && mastery_kit="${masteryKitId}" && payment_status="completed"`,
        });

        if (purchases.length === 0) {
            throw new Error('You do not have access to this mastery kit. Please purchase it first.');
        }

        // Fetch the mastery kit details
        const masteryKit = await pb.collection('mastery_kits').getOne(masteryKitId);

        // Generate file URLs
        // PocketBase automatically generates the correct URLs for S3 files
        const fileUrls = masteryKit.files?.map(filename => {
            // This generates the full URL to the file (either local or S3)
            return pb.files.getUrl(masteryKit, filename);
        }) || [];

        return {
            id: masteryKit.id,
            title: masteryKit.title,
            language: masteryKit.language,
            description: masteryKit.description,
            files: fileUrls,
            thumbnail: masteryKit.thumbnail
                ? pb.files.getUrl(masteryKit, masteryKit.thumbnail)
                : '/images/default-mastery-kit.png',
        };
    } catch (error) {
        console.error('Error fetching mastery kit content:', error);
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
            thumbnail: kit.thumbnail
                ? pb.files.getUrl(kit, kit.thumbnail)
                : '/images/default-mastery-kit.png',
        }));
    } catch (error) {
        console.error('Error fetching mastery kits:', error);
        throw new Error('Failed to load mastery kits. Please try again.');
    }
}

/**
 * Check if user has access to a specific mastery kit
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
 * Record a mastery kit purchase (called after successful payment)
 */
export async function recordPurchase(userId, masteryKitId, paymentData) {
    try {
        const purchase = await pb.collection('mastery_kit_purchases').create({
            user: userId,
            mastery_kit: masteryKitId,
            purchase_date: new Date().toISOString(),
            payment_status: 'completed',
            transaction_id: paymentData.transactionId,
        });

        return purchase;
    } catch (error) {
        console.error('Error recording purchase:', error);
        throw new Error('Failed to record your purchase. Please contact support.');
    }
}

/**
 * Admin: Create a new mastery kit with files
 */
export async function createMasteryKit(masteryKitData, files, thumbnailFile) {
    try {
        const formData = new FormData();
        formData.append('title', masteryKitData.title);
        formData.append('language', masteryKitData.language);
        formData.append('description', masteryKitData.description);
        formData.append('price', masteryKitData.price);

        // Append files (will be uploaded to S3 via PocketBase)
        files.forEach((file) => {
            formData.append('files', file);
        });

        if (thumbnailFile) {
            formData.append('thumbnail', thumbnailFile);
        }

        const record = await pb.collection('mastery_kits').create(formData);
        return record;
    } catch (error) {
        console.error('Error creating mastery kit:', error);
        throw new Error('Failed to create mastery kit. Please try again.');
    }
}

/**
 * Admin: Update mastery kit
 */
export async function updateMasteryKit(masteryKitId, updates) {
    try {
        const record = await pb.collection('mastery_kits').update(masteryKitId, updates);
        return record;
    } catch (error) {
        console.error('Error updating mastery kit:', error);
        throw new Error('Failed to update mastery kit. Please try again.');
    }
}

/**
 * Admin: Delete mastery kit
 */
export async function deleteMasteryKit(masteryKitId) {
    try {
        await pb.collection('mastery_kits').delete(masteryKitId);
        return true;
    } catch (error) {
        console.error('Error deleting mastery kit:', error);
        throw new Error('Failed to delete mastery kit. Please try again.');
    }
}

export default {
    getUserMasteryKits,
    getMasteryKitContent,
    getAllMasteryKits,
    checkUserAccess,
    recordPurchase,
    createMasteryKit,
    updateMasteryKit,
    deleteMasteryKit,
};
