/**
 * College Enrollment Service
 * Handles college enrollment form submissions
 */

import pb from '../../src/api/pocketbase.js';

class CollegeEnrollmentService {
    constructor() {
        this.collection = 'college_enrollments';
    }

    /**
     * Get all college enrollments
     * @param {Object} options - Query options
     * @returns {Promise<Object>} List of college enrollments
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
            throw new Error(`Failed to fetch college enrollments: ${error.message}`);
        }
    }

    /**
     * Get a single college enrollment by ID
     * @param {string} id - College enrollment ID
     * @returns {Promise<Object>} College enrollment record
     */
    async getById(id) {
        try {
            const enrollment = await pb.collection(this.collection).getOne(id);
            return enrollment;
        } catch (error) {
            throw new Error(`Failed to fetch college enrollment: ${error.message}`);
        }
    }

    /**
     * Create a new college enrollment
     * @param {Object} data - College enrollment form data
     * @returns {Promise<Object>} Created college enrollment
     */
    async create(data) {
        try {
            const enrollment = await pb.collection(this.collection).create(data);
            return enrollment;
        } catch (error) {
            throw new Error(`Failed to create college enrollment: ${error.message}`);
        }
    }

    /**
     * Update a college enrollment
     * @param {string} id - College enrollment ID
     * @param {Object} data - Updated data
     * @returns {Promise<Object>} Updated college enrollment
     */
    async update(id, data) {
        try {
            const enrollment = await pb.collection(this.collection).update(id, data);
            return enrollment;
        } catch (error) {
            throw new Error(`Failed to update college enrollment: ${error.message}`);
        }
    }

    /**
     * Delete a college enrollment
     * @param {string} id - College enrollment ID
     * @returns {Promise<boolean>} Success status
     */
    async delete(id) {
        try {
            await pb.collection(this.collection).delete(id);
            return true;
        } catch (error) {
            throw new Error(`Failed to delete college enrollment: ${error.message}`);
        }
    }

    /**
     * Get college enrollment statistics
     * @returns {Promise<Object>} College enrollment statistics
     */
    async getStats() {
        try {
            const total = await pb.collection(this.collection).getList(1, 1);
            const newEnrollments = await pb.collection(this.collection).getList(1, 1, {
                filter: 'status = "new"',
            });
            const contacted = await pb.collection(this.collection).getList(1, 1, {
                filter: 'status = "contacted"',
            });
            const proposalSent = await pb.collection(this.collection).getList(1, 1, {
                filter: 'status = "proposal_sent"',
            });
            const closed = await pb.collection(this.collection).getList(1, 1, {
                filter: 'status = "closed"',
            });

            return {
                total: total.totalItems,
                new: newEnrollments.totalItems,
                contacted: contacted.totalItems,
                proposalSent: proposalSent.totalItems,
                closed: closed.totalItems,
            };
        } catch (error) {
            throw new Error(`Failed to fetch college enrollment statistics: ${error.message}`);
        }
    }
}

export default new CollegeEnrollmentService();
