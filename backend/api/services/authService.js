/**
 * Authentication Service
 * Handles user authentication and authorization
 */

import pb from '../../src/api/pocketbase.js';

class AuthService {
    /**
     * Authenticate admin user
     * @param {string} email - Admin email
     * @param {string} password - Admin password
     * @returns {Promise<Object>} Authentication result with token
     */
    async loginAdmin(email, password) {
        try {
            const authData = await pb.admins.authWithPassword(email, password);
            return {
                token: authData.token,
                user: authData.admin,
                isAdmin: true,
            };
        } catch (error) {
            throw new Error(`Admin login failed: ${error.message}`);
        }
    }

    /**
     * Authenticate regular user
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise<Object>} Authentication result with token
     */
    async loginUser(email, password) {
        try {
            const authData = await pb.collection('users').authWithPassword(email, password);
            return {
                token: authData.token,
                user: authData.record,
                isAdmin: false,
            };
        } catch (error) {
            throw new Error(`User login failed: ${error.message}`);
        }
    }

    /**
     * Attempt login (tries admin first, then user)
     * @param {string} email - Email
     * @param {string} password - Password
     * @returns {Promise<Object>} Authentication result
     */
    async login(email, password) {
        try {
            // Try admin login first
            return await this.loginAdmin(email, password);
        } catch (adminError) {
            try {
                // Fallback to user login
                return await this.loginUser(email, password);
            } catch (userError) {
                throw new Error('Invalid email or password');
            }
        }
    }

    /**
     * Logout current user
     * @returns {void}
     */
    logout() {
        pb.authStore.clear();
    }

    /**
     * Check if user is authenticated
     * @returns {boolean} Authentication status
     */
    isAuthenticated() {
        return pb.authStore.isValid;
    }

    /**
     * Get current authenticated user
     * @returns {Object|null} Current user or null
     */
    getCurrentUser() {
        return pb.authStore.model;
    }

    /**
     * Get current auth token
     * @returns {string|null} Auth token or null
     */
    getToken() {
        return pb.authStore.token;
    }

    /**
     * Refresh authentication token
     * @returns {Promise<Object>} Refreshed auth data
     */
    async refreshAuth() {
        try {
            const authData = await pb.collection('users').authRefresh();
            return {
                token: authData.token,
                user: authData.record,
            };
        } catch (error) {
            throw new Error(`Failed to refresh authentication: ${error.message}`);
        }
    }

    /**
     * Request password reset
     * @param {string} email - User email
     * @returns {Promise<boolean>} Success status
     */
    async requestPasswordReset(email) {
        try {
            await pb.collection('users').requestPasswordReset(email);
            return true;
        } catch (error) {
            throw new Error(`Failed to request password reset: ${error.message}`);
        }
    }

    /**
     * Confirm password reset
     * @param {string} token - Reset token
     * @param {string} password - New password
     * @param {string} passwordConfirm - Password confirmation
     * @returns {Promise<boolean>} Success status
     */
    async confirmPasswordReset(token, password, passwordConfirm) {
        try {
            await pb.collection('users').confirmPasswordReset(token, password, passwordConfirm);
            return true;
        } catch (error) {
            throw new Error(`Failed to reset password: ${error.message}`);
        }
    }

    /**
     * Register new user
     * @param {Object} userData - User registration data
     * @returns {Promise<Object>} Created user record
     */
    async register(userData) {
        try {
            const user = await pb.collection('users').create(userData);
            return user;
        } catch (error) {
            throw new Error(`Registration failed: ${error.message}`);
        }
    }

    /**
     * Verify email
     * @param {string} token - Verification token
     * @returns {Promise<boolean>} Success status
     */
    async verifyEmail(token) {
        try {
            await pb.collection('users').confirmVerification(token);
            return true;
        } catch (error) {
            throw new Error(`Email verification failed: ${error.message}`);
        }
    }
}

export default new AuthService();
