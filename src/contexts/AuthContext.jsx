import React, { createContext, useContext, useState, useEffect } from 'react';
import pb from '../config/pocketbase';

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
            return { success: false, error: error.message };
        }
    };

    const register = async (email, password, name) => {
        try {
            // Create user
            const userData = {
                email,
                password,
                passwordConfirm: password,
                name,
            };

            const record = await pb.collection('users').create(userData);

            // Auto-login after registration
            await login(email, password);

            return { success: true, user: record };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: error.message };
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
