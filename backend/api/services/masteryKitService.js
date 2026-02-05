import PocketBase from 'pocketbase';

// Backend PocketBase client
// NOTE:
// - In production, always set POCKETBASE_URL to your HTTPS PocketBase instance
// - This service is intended to be called from secured backend routes only
const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090');

/**
 * Ensure PocketBase is authenticated for the current request.
 * Prefer passing a user or admin auth token rather than trusting userId alone.
 */
export function applyAuthToken(authToken) {
    if (authToken) {
        pb.authStore.save(authToken, null);
    } else {
        pb.authStore.clear();
    }
}

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

        return purchases.map(purchase => {
            const kit = purchase.expand?.mastery_kit;

            if (!kit) return null;

            return {
                id: kit.id,
                title: kit.title,
                language: kit.language,
                description: kit.description,
                // Generate a full, secure URL for thumbnails (works with S3/private storage)
                thumbnail: kit.thumbnail
                    ? pb.files.getUrl(kit, kit.thumbnail)
                    : '/images/default-mastery-kit.png',
                purchaseDate: purchase.purchase_date,
            };
        }).filter(Boolean);
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
        const fileUrls = (masteryKit.files || []).map((filename) =>
            pb.files.getUrl(masteryKit, filename, {
                // Include auth token when present so PocketBase
                // can enforce per-user access before issuing presigned URLs.
                token: pb.authStore.token,
            })
        );

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
    applyAuthToken,
    checkUserAccess,
    getUserMasteryKits,
    getMasteryKitContent,
    recordPurchase,
    getAllMasteryKits,
    uploadMasteryKitFiles,
};
