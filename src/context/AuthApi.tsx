import React, {
    createContext,
    type ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import type { LoginRequest } from '../api/authApi';
import { loginApi, refreshApi, logoutApi } from '../api/authApi';
import { getUserByEmail } from '../api/userApi';
import type { User } from '../types/users';

interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    login: (payload: Omit<LoginRequest, 'fingerprint'>) => Promise<void>;
    logout: () => Promise<void>;
    user: User | null;
    userId: string | null;
    email: string | null;
    setUser: (user: User | null) => void;
    setEmail: (email: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    const userId = user?.id ?? null;

    const fetchUserByEmail = useCallback(async (userEmail: string) => {
        try {
            const prof = await getUserByEmail(userEmail);
            setUser(prof);
        } catch (err) {
            console.error('Ошибка getUserByEmail', err);
            localStorage.removeItem('userEmail');
            setAuthenticated(false);
        }
    }, []);

    useEffect(() => {
        const fp = localStorage.getItem('fingerprint') ?? crypto.randomUUID();
        localStorage.setItem('fingerprint', fp);

        const storedEmail = localStorage.getItem('userEmail');
        const rt = localStorage.getItem('refreshToken') ?? '';

        (async () => {
            if (storedEmail && rt) {
                try {
                    const tokens = await refreshApi({ fingerprint: fp, refreshToken: rt });
                    localStorage.setItem('accessToken', tokens.access);
                    localStorage.setItem('refreshToken', tokens.refresh);
                    setEmail(storedEmail);
                    await fetchUserByEmail(storedEmail);
                    setAuthenticated(true);
                } catch (refreshErr) {
                    console.warn('Refresh failed', refreshErr);
                    setAuthenticated(false);
                    setUser(null);
                    setEmail(null);
                    localStorage.removeItem('userEmail');
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                }
            } else {
                setAuthenticated(false);
                setUser(null);
                setEmail(null);
            }
            setLoading(false);
        })();
    }, [fetchUserByEmail]);

    const login = useCallback(async (payload: Omit<LoginRequest, 'fingerprint'>) => {
        setLoading(true);
        setError(null);
        try {
            const fp = localStorage.getItem('fingerprint')!;
            const tokens = await loginApi({ ...payload, fingerprint: fp });
            localStorage.setItem('accessToken', tokens.access);
            localStorage.setItem('refreshToken', tokens.refresh);
            const userEmail = payload.login;
            setEmail(userEmail);
            localStorage.setItem('userEmail', userEmail);
            setAuthenticated(true);
            await fetchUserByEmail(userEmail);
        } catch (err: any) {
            console.error('Login error', err);
            setAuthenticated(false);
            setUser(null);
            setEmail(null);
            localStorage.removeItem('userEmail');
            setError(err.response?.data?.error || err.message || 'Ошибка при входе');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [fetchUserByEmail]);

    const logout = useCallback(async () => {
        setLoading(true);
        try {
            await logoutApi();
        } catch (err) {
            console.warn('Logout API error', err);
        } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userEmail');
            setAuthenticated(false);
            setUser(null);
            setEmail(null);
            setLoading(false);
        }
    }, []);

    if (loading) return null;

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                loading,
                error,
                login,
                logout,
                user,
                userId,
                email,
                setUser,
                setEmail,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return ctx;
};
