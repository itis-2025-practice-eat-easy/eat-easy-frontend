import { createContext, useState, useEffect, useContext, type ReactNode } from 'react';
import { getUserById } from '../api/userApi';
import { loginApi, type LoginResponse } from '../api/authApi';
import type { User } from '../types/users';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    function parseJwt(token: string): Record<string, unknown> | null {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch {
            return null;
        }
    }

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const payload = parseJwt(token);
                let userId: string | null = null;
                if (payload?.sub && typeof payload.sub === 'string') {
                    userId = payload.sub;
                } else {
                    userId = localStorage.getItem('userId');
                }
                if (userId) {
                    try {
                        const fullUser = await getUserById(userId);
                        setUser(fullUser);
                    } catch {
                        localStorage.removeItem('token');
                        localStorage.removeItem('userId');
                        setUser(null);
                    }
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const resp: LoginResponse = await loginApi({ email, password });
            localStorage.setItem('token', resp.token);
            localStorage.setItem('userId', resp.user.id);
            const loggedInUser: User = {
                id: resp.user.id,
                username: resp.user.username ?? '',
                email: resp.user.email ?? '',
                firstName: resp.user.firstName ?? '',
                lastName: resp.user.lastName ?? '',
                role: resp.user.role,
            };
            setUser(loggedInUser);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be within AuthProvider');
    return ctx;
}

