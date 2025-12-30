/**
 * Newsletter Service
 * Handles newsletter subscriptions
 */

import pb from '../../src/api/pocketbase.js';

class NewsletterService {
    constructor() {
        this.collection = 'newsletter_subscribers';
    }

    /**
     * Get all newsletter subscribers
     * @param {Object} options - Query options
     * @returns {Promise<Object>} List of subscribers
     */
    async getAll(options = {}) {
        const {
            filter = '',
            sort = '-created',
            page = 1,
            perPage = 50,
        } = options;

        try {
            const result = await pb.collection(this.collection).getList(page, perPage, {
                filter,
                sort,
            });
            return result;
        } catch (error) {
            throw new Error(`Failed to fetch newsletter subscribers: ${error.message}`);
        }
    }

    /**
     * Get a single subscriber by ID
     * @param {string} id - Subscriber ID
     * @returns {Promise<Object>} Subscriber record
     */
    async getById(id) {
        try {
            const subscriber = await pb.collection(this.collection).getOne(id);
            return subscriber;
        } catch (error) {
            throw new Error(`Failed to fetch subscriber: ${error.message}`);
        }
    }

    /**
     * Subscribe to newsletter
     * @param {string} email - Subscriber email
     * @returns {Promise<Object>} Created subscriber record
     */
    async subscribe(email) {
        try {
            // Check if already subscribed
            const existing = await pb.collection(this.collection).getList(1, 1, {
                filter: `email = "${email}"`,
            });

            if (existing.items.length > 0) {
                throw new Error('Email already subscribed');
            }

            const subscriber = await pb.collection(this.collection).create({ email });
            return subscriber;
        } catch (error) {
            throw new Error(`Failed to subscribe: ${error.message}`);
        }
    }

    /**
     * Unsubscribe from newsletter
     * @param {string} email - Subscriber email
     * @returns {Promise<boolean>} Success status
     */
    async unsubscribe(email) {
        try {
            const result = await pb.collection(this.collection).getList(1, 1, {
                filter: `email = "${email}"`,
            });

            if (result.items.length === 0) {
                throw new Error('Email not found');
            }

            await pb.collection(this.collection).delete(result.items[0].id);
            return true;
        } catch (error) {
            throw new Error(`Failed to unsubscribe: ${error.message}`);
        }
    }

    /**
     * Delete a subscriber
     * @param {string} id - Subscriber ID
     * @returns {Promise<boolean>} Success status
     */
    async delete(id) {
        try {
            await pb.collection(this.collection).delete(id);
            return true;
        } catch (error) {
            throw new Error(`Failed to delete subscriber: ${error.message}`);
        }
    }

    /**
     * Get newsletter statistics
     * @returns {Promise<Object>} Newsletter statistics
     */
    async getStats() {
        try {
            const total = await pb.collection(this.collection).getList(1, 1);
            return {
                total: total.totalItems,
            };
        } catch (error) {
            throw new Error(`Failed to fetch newsletter statistics: ${error.message}`);
        }
    }
}

export default new NewsletterService();
