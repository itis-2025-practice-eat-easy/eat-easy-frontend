import {createContext, useState, useEffect, useContext, type ReactNode} from 'react';
import { getUserById } from '../api/userApi';
import {loginApi, logoutApi, type LoginRequest, type TokenResponse} from '../api/authApi';
import type { User } from '../types/users';

interface AuthContextType {
    user: User | null;
    login: (login: string, password: string, fingerprint: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function parseJwt(token: string): { [key: string]: any } | null {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const json = atob(base64);
        return JSON.parse(json);
    } catch {
        return null;
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setLoading(false);
                return;
            }

            const payload = parseJwt(token);
            const sub = payload?.sub;
            if (typeof sub === 'string') {
                try {
                    const u = await getUserById(sub);
                    setUser(u);
                } catch {
                    localStorage.removeItem('accessToken');
                    setUser(null);
                }
            }
            setLoading(false);
        })();
    }, []);


    const login = async (login: string, password: string, fingerprint: string) => {
        setLoading(true);
        try {
            const req: LoginRequest = { login, password, fingerprint };

            const tokens: TokenResponse = await loginApi(req);
            localStorage.setItem('accessToken', tokens.access);
            const payload = parseJwt(tokens.access);
            const userId = typeof payload?.sub === 'string' ? payload.sub : null;
            if (userId) {
                const u = await getUserById(userId);
                setUser(u);
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await logoutApi();
            localStorage.removeItem('accessToken');
            setUser(null);
        } finally {
            setLoading(false);
        }
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
