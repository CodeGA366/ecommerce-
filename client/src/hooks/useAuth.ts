//imports 
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    const { user, login, signup, logout } = authContext;
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (email: string, password: string) => {
        try {
            await login(email, password);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(String(err));
            }
        }
    };

    const handleSignup = async (username: string, email: string, password: string) => {
        try {
            await signup(username, email, password);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(String(err));
            }
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(String(err));
            }
        }
    };

    return {
        user,
        handleLogin,
        handleSignup,
        handleLogout,
        error,
    };
};

export default useAuth;