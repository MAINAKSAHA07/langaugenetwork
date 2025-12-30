/**
 * Batch Service
 * Handles all database operations for batches
 */

import pb from '../../src/api/pocketbase.js';

class BatchService {
    constructor() {
        this.collection = 'batches';
    }

    /**
     * Get all batches with optional filtering
     * @param {Object} options - Query options (filter, sort, page, perPage)
     * @returns {Promise<Object>} List of batches with pagination
     */
    async getAll(options = {}) {
        const {
            filter = '',
            sort = '-startDate',
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
            throw new Error(`Failed to fetch batches: ${error.message}`);
        }
    }

    /**
     * Get a single batch by ID
     * @param {string} id - Batch ID
     * @returns {Promise<Object>} Batch record
     */
    async getById(id) {
        try {
            const batch = await pb.collection(this.collection).getOne(id);
            return batch;
        } catch (error) {
            throw new Error(`Failed to fetch batch: ${error.message}`);
        }
    }

    /**
     * Create a new batch
     * @param {Object} data - Batch data
     * @returns {Promise<Object>} Created batch record
     */
    async create(data) {
        try {
            const batch = await pb.collection(this.collection).create(data);
            return batch;
        } catch (error) {
            throw new Error(`Failed to create batch: ${error.message}`);
        }
    }

    /**
     * Update an existing batch
     * @param {string} id - Batch ID
     * @param {Object} data - Updated batch data
     * @returns {Promise<Object>} Updated batch record
     */
    async update(id, data) {
        try {
            const batch = await pb.collection(this.collection).update(id, data);
            return batch;
        } catch (error) {
            throw new Error(`Failed to update batch: ${error.message}`);
        }
    }

    /**
     * Delete a batch
     * @param {string} id - Batch ID
     * @returns {Promise<boolean>} Success status
     */
    async delete(id) {
        try {
            await pb.collection(this.collection).delete(id);
            return true;
        } catch (error) {
            throw new Error(`Failed to delete batch: ${error.message}`);
        }
    }

    /**
     * Get batches by status
     * @param {string} status - Batch status (upcoming, ongoing, completed, cancelled)
     * @param {Object} options - Additional query options
     * @returns {Promise<Object>} Filtered batches
     */
    async getByStatus(status, options = {}) {
        const filter = `status = "${status}"`;
        return this.getAll({ ...options, filter });
    }

    /**
     * Get batches by language
     * @param {string} language - Language name
     * @param {Object} options - Additional query options
     * @returns {Promise<Object>} Filtered batches
     */
    async getByLanguage(language, options = {}) {
        const filter = `language = "${language}"`;
        return this.getAll({ ...options, filter });
    }

    /**
     * Get upcoming batches
     * @param {Object} options - Additional query options
     * @returns {Promise<Object>} Upcoming batches
     */
    async getUpcoming(options = {}) {
        return this.getByStatus('upcoming', options);
    }

    /**
     * Get batches with available seats
     * @param {Object} options - Additional query options
     * @returns {Promise<Object>} Batches with available seats
     */
    async getAvailable(options = {}) {
        const filter = 'enrolled < capacity && status = "upcoming"';
        return this.getAll({ ...options, filter });
    }

    /**
     * Get batch statistics
     * @returns {Promise<Object>} Batch statistics
     */
    async getStats() {
        try {
            const [total, upcoming, ongoing, completed] = await Promise.all([
                pb.collection(this.collection).getList(1, 1),
                pb.collection(this.collection).getList(1, 1, { filter: 'status = "upcoming"' }),
                pb.collection(this.collection).getList(1, 1, { filter: 'status = "ongoing"' }),
                pb.collection(this.collection).getList(1, 1, { filter: 'status = "completed"' }),
            ]);

            return {
                total: total.totalItems,
                upcoming: upcoming.totalItems,
                ongoing: ongoing.totalItems,
                completed: completed.totalItems,
            };
        } catch (error) {
            throw new Error(`Failed to fetch batch statistics: ${error.message}`);
        }
    }
}

export default new BatchService();
