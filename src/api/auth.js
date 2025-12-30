import pb from './pocketbase';

/**
 * Login user
 */
export const login = async (email, password) => {
  try {
    const authData = await pb.collection('users').authWithPassword(email, password);
    return { success: true, user: authData.record, token: authData.token };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Logout user
 */
export const logout = () => {
  pb.authStore.clear();
};

/**
 * Register new user
 */
export const register = async (userData) => {
  try {
    const record = await pb.collection('users').create({
      ...userData,
      emailVisibility: true,
    });

    // Auto-login after registration
    await pb.collection('users').authWithPassword(userData.email, userData.password);

    return { success: true, user: record };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get current user
 */
export const getCurrentUser = () => {
  return pb.authStore.model;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return pb.authStore.isValid;
};
