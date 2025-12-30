/**
 * Demo Service
 * Handles demo registration submissions
 */

import pb from '../../src/api/pocketbase.js';

class DemoService {
    constructor() {
        this.collection = 'demo_registrations';
    }

    /**
     * Get all demo registrations
     * @param {Object} options - Query options
     * @returns {Promise<Object>} List of demo registrations
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
            throw new Error(`Failed to fetch demo registrations: ${error.message}`);
        }
    }

    /**
     * Get a single demo registration by ID
     * @param {string} id - Demo registration ID
     * @returns {Promise<Object>} Demo registration record
     */
    async getById(id) {
        try {
            const demo = await pb.collection(this.collection).getOne(id);
            return demo;
        } catch (error) {
            throw new Error(`Failed to fetch demo registration: ${error.message}`);
        }
    }

    /**
     * Create a new demo registration
     * @param {Object} data - Demo registration data
     * @returns {Promise<Object>} Created demo registration
     */
    async create(data) {
        try {
            const demo = await pb.collection(this.collection).create(data);
            return demo;
        } catch (error) {
            throw new Error(`Failed to create demo registration: ${error.message}`);
        }
    }

    /**
     * Delete a demo registration
     * @param {string} id - Demo registration ID
     * @returns {Promise<boolean>} Success status
     */
    async delete(id) {
        try {
            await pb.collection(this.collection).delete(id);
            return true;
        } catch (error) {
            throw new Error(`Failed to delete demo registration: ${error.message}`);
        }
    }

    /**
     * Get demo statistics
     * @returns {Promise<Object>} Demo statistics
     */
    async getStats() {
        try {
            const total = await pb.collection(this.collection).getList(1, 1);
            return {
                total: total.totalItems,
            };
        } catch (error) {
            throw new Error(`Failed to fetch demo statistics: ${error.message}`);
        }
    }
}

export default new DemoService();
