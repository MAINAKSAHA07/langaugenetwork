/**
 * Blog Service
 * Handles all database operations for blogs
 */

import pb from '../../src/api/pocketbase.js';

class BlogService {
    constructor() {
        this.collection = 'blogs';
    }

    /**
     * Get all blogs with optional filtering
     * @param {Object} options - Query options (filter, sort, page, perPage)
     * @returns {Promise<Object>} List of blogs with pagination
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
            throw new Error(`Failed to fetch blogs: ${error.message}`);
        }
    }

    /**
     * Get a single blog by ID
     * @param {string} id - Blog ID
     * @returns {Promise<Object>} Blog record
     */
    async getById(id) {
        try {
            const blog = await pb.collection(this.collection).getOne(id);
            return blog;
        } catch (error) {
            throw new Error(`Failed to fetch blog: ${error.message}`);
        }
    }

    /**
     * Get a blog by slug
     * @param {string} slug - Blog slug
     * @returns {Promise<Object>} Blog record
     */
    async getBySlug(slug) {
        try {
            const result = await pb.collection(this.collection).getList(1, 1, {
                filter: `slug = "${slug}"`,
            });

            if (result.items.length === 0) {
                throw new Error('Blog not found');
            }

            return result.items[0];
        } catch (error) {
            throw new Error(`Failed to fetch blog: ${error.message}`);
        }
    }

    /**
     * Create a new blog
     * @param {FormData} formData - Blog data with file upload
     * @returns {Promise<Object>} Created blog record
     */
    async create(formData) {
        try {
            const blog = await pb.collection(this.collection).create(formData);
            return blog;
        } catch (error) {
            throw new Error(`Failed to create blog: ${error.message}`);
        }
    }

    /**
     * Update an existing blog
     * @param {string} id - Blog ID
     * @param {FormData|Object} data - Updated blog data
     * @returns {Promise<Object>} Updated blog record
     */
    async update(id, data) {
        try {
            const blog = await pb.collection(this.collection).update(id, data);
            return blog;
        } catch (error) {
            throw new Error(`Failed to update blog: ${error.message}`);
        }
    }

    /**
     * Delete a blog
     * @param {string} id - Blog ID
     * @returns {Promise<boolean>} Success status
     */
    async delete(id) {
        try {
            await pb.collection(this.collection).delete(id);
            return true;
        } catch (error) {
            throw new Error(`Failed to delete blog: ${error.message}`);
        }
    }

    /**
     * Get published blogs
     * @param {Object} options - Additional query options
     * @returns {Promise<Object>} Published blogs
     */
    async getPublished(options = {}) {
        const filter = 'published = true';
        return this.getAll({ ...options, filter });
    }

    /**
     * Get draft blogs
     * @param {Object} options - Additional query options
     * @returns {Promise<Object>} Draft blogs
     */
    async getDrafts(options = {}) {
        const filter = 'published = false';
        return this.getAll({ ...options, filter });
    }

    /**
     * Get blogs by category
     * @param {string} category - Blog category
     * @param {Object} options - Additional query options
     * @returns {Promise<Object>} Filtered blogs
     */
    async getByCategory(category, options = {}) {
        const filter = `category = "${category}"`;
        return this.getAll({ ...options, filter });
    }

    /**
     * Get blogs by tag
     * @param {string} tag - Blog tag
     * @param {Object} options - Additional query options
     * @returns {Promise<Object>} Filtered blogs
     */
    async getByTag(tag, options = {}) {
        const filter = `tags ~ "${tag}"`;
        return this.getAll({ ...options, filter });
    }

    /**
     * Toggle blog publish status
     * @param {string} id - Blog ID
     * @param {boolean} published - New publish status
     * @returns {Promise<Object>} Updated blog record
     */
    async togglePublish(id, published) {
        try {
            const updateData = {
                published,
                publishedAt: published ? new Date().toISOString() : null,
            };
            return this.update(id, updateData);
        } catch (error) {
            throw new Error(`Failed to toggle publish status: ${error.message}`);
        }
    }

    /**
     * Get blog statistics
     * @returns {Promise<Object>} Blog statistics
     */
    async getStats() {
        try {
            const [total, published, drafts] = await Promise.all([
                pb.collection(this.collection).getList(1, 1),
                pb.collection(this.collection).getList(1, 1, { filter: 'published = true' }),
                pb.collection(this.collection).getList(1, 1, { filter: 'published = false' }),
            ]);

            return {
                total: total.totalItems,
                published: published.totalItems,
                drafts: drafts.totalItems,
            };
        } catch (error) {
            throw new Error(`Failed to fetch blog statistics: ${error.message}`);
        }
    }

    /**
     * Get file URL for blog featured image
     * @param {Object} blog - Blog record
     * @param {string} filename - Image filename
     * @returns {string} Image URL
     */
    getFileUrl(blog, filename) {
        return pb.files.getUrl(blog, filename);
    }
}

export default new BlogService();
