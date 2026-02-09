import React, { createContext, useContext, useState, useEffect } from 'react';
import pb from '../config/pocketbase';

/** Parse PocketBase ClientResponseError into a user-friendly message */
function parsePocketBaseError(error) {
    const data = error?.data;
    if (data?.message) return data.message;
    if (data?.data && typeof data.data === 'object') {
        const parts = [];
        for (const [field, messages] of Object.entries(data.data)) {
            if (Array.isArray(messages) && messages[0]) parts.push(`${field}: ${messages[0]}`);
            else if (typeof messages === 'string') parts.push(`${field}: ${messages}`);
        }
        if (parts.length) return parts.join('. ');
    }
    return error?.message || 'Something went wrong. Please try again.';
}

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const checkAuth = () => {
            if (pb.authStore.isValid) {
                setUser(pb.authStore.model);
            }
            setLoading(false);
        };

        checkAuth();

        // Listen for auth changes
        pb.authStore.onChange(() => {
            setUser(pb.authStore.model);
        });
    }, []);

    const login = async (email, password) => {
        try {
            const authData = await pb.collection('users').authWithPassword(email, password);
            setUser(authData.record);
            return { success: true, user: authData.record };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: parsePocketBaseError(error) };
        }
    };

    const register = async (email, password, name) => {
        try {
            // PocketBase users (auth) collection: email, password, passwordConfirm, name, emailVisibility
            const userData = {
                email: email.trim().toLowerCase(),
                password,
                passwordConfirm: password,
                name: (name || '').trim() || email.split('@')[0],
                emailVisibility: true,
            };

            const record = await pb.collection('users').create(userData);

            // Auto-login after registration
            await login(email, password);

            return { success: true, user: record };
        } catch (error) {
            console.error('Registration error:', error);
            const msg = parsePocketBaseError(error);
            return { success: false, error: msg };
        }
    };

    const logout = () => {
        pb.authStore.clear();
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
