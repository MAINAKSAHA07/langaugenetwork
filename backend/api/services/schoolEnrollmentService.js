/**
 * School Enrollment Service
 * Handles school enrollment form submissions
 */

import pb from '../../src/api/pocketbase.js';

class SchoolEnrollmentService {
    constructor() {
        this.collection = 'school_enrollments';
    }

    /**
     * Get all school enrollments
     * @param {Object} options - Query options
     * @returns {Promise<Object>} List of school enrollments
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
            throw new Error(`Failed to fetch school enrollments: ${error.message}`);
        }
    }

    /**
     * Get a single school enrollment by ID
     * @param {string} id - School enrollment ID
     * @returns {Promise<Object>} School enrollment record
     */
    async getById(id) {
        try {
            const enrollment = await pb.collection(this.collection).getOne(id);
            return enrollment;
        } catch (error) {
            throw new Error(`Failed to fetch school enrollment: ${error.message}`);
        }
    }

    /**
     * Create a new school enrollment
     * @param {Object} data - School enrollment form data
     * @returns {Promise<Object>} Created school enrollment
     */
    async create(data) {
        try {
            const enrollment = await pb.collection(this.collection).create(data);
            return enrollment;
        } catch (error) {
            throw new Error(`Failed to create school enrollment: ${error.message}`);
        }
    }

    /**
     * Update a school enrollment
     * @param {string} id - School enrollment ID
     * @param {Object} data - Updated data
     * @returns {Promise<Object>} Updated school enrollment
     */
    async update(id, data) {
        try {
            const enrollment = await pb.collection(this.collection).update(id, data);
            return enrollment;
        } catch (error) {
            throw new Error(`Failed to update school enrollment: ${error.message}`);
        }
    }

    /**
     * Delete a school enrollment
     * @param {string} id - School enrollment ID
     * @returns {Promise<boolean>} Success status
     */
    async delete(id) {
        try {
            await pb.collection(this.collection).delete(id);
            return true;
        } catch (error) {
            throw new Error(`Failed to delete school enrollment: ${error.message}`);
        }
    }

    /**
     * Get school enrollment statistics
     * @returns {Promise<Object>} School enrollment statistics
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
            throw new Error(`Failed to fetch school enrollment statistics: ${error.message}`);
        }
    }
}

export default new SchoolEnrollmentService();
