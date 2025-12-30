/**
 * Contact Service
 * Handles contact form submissions
 */

import pb from '../../src/api/pocketbase.js';

class ContactService {
    constructor() {
        this.collection = 'contact_submissions';
    }

    /**
     * Get all contact submissions
     * @param {Object} options - Query options
     * @returns {Promise<Object>} List of contact submissions
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
            throw new Error(`Failed to fetch contact submissions: ${error.message}`);
        }
    }

    /**
     * Get a single contact submission by ID
     * @param {string} id - Contact submission ID
     * @returns {Promise<Object>} Contact submission record
     */
    async getById(id) {
        try {
            const contact = await pb.collection(this.collection).getOne(id);
            return contact;
        } catch (error) {
            throw new Error(`Failed to fetch contact submission: ${error.message}`);
        }
    }

    /**
     * Create a new contact submission
     * @param {Object} data - Contact form data
     * @returns {Promise<Object>} Created contact submission
     */
    async create(data) {
        try {
            const contact = await pb.collection(this.collection).create(data);
            return contact;
        } catch (error) {
            throw new Error(`Failed to create contact submission: ${error.message}`);
        }
    }

    /**
     * Delete a contact submission
     * @param {string} id - Contact submission ID
     * @returns {Promise<boolean>} Success status
     */
    async delete(id) {
        try {
            await pb.collection(this.collection).delete(id);
            return true;
        } catch (error) {
            throw new Error(`Failed to delete contact submission: ${error.message}`);
        }
    }

    /**
     * Get contact statistics
     * @returns {Promise<Object>} Contact statistics
     */
    async getStats() {
        try {
            const total = await pb.collection(this.collection).getList(1, 1);
            return {
                total: total.totalItems,
            };
        } catch (error) {
            throw new Error(`Failed to fetch contact statistics: ${error.message}`);
        }
    }
}

export default new ContactService();
