import {createSlice, createAsyncThunk, type PayloadAction,} from '@reduxjs/toolkit'
import type {User} from "../../types/users.ts";
import {loginApi, type LoginRequest, logoutApi, refreshApi, type TokenResponse} from "../../api/authApi.ts";
import {getUserByEmail} from "../../api/userApi.ts";

interface AuthState {
    user: User | null
    email: string | null
    isAuthenticated: boolean
    loading: boolean
    error: string | null
}

const initialState: AuthState = {
    user: null,
    email: null,
    isAuthenticated: false,
    loading: false,
    error: null,
}

// Thunks
export const loginThunk = createAsyncThunk<
    void,
    Omit<LoginRequest, 'fingerprint'>,
    { rejectValue: string }
>('auth/login', async (payload, { rejectWithValue, dispatch }) => {
    try {
        const fp = localStorage.getItem('fingerprint')!
        const tokens: TokenResponse = await loginApi({ ...payload, fingerprint: fp })
        localStorage.setItem('accessToken', tokens.access)
        localStorage.setItem('refreshToken', tokens.refresh)
        localStorage.setItem('userEmail', payload.login)
        dispatch(fetchUserThunk(payload.login))
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.error || err.message)
    }
})

export const fetchUserThunk = createAsyncThunk<User, string, { rejectValue: void }>(
    'auth/fetchUser',
    async (email, { rejectWithValue }) => {
        try {
            const prof = await getUserByEmail(email)
            return prof
        } catch {
            localStorage.clear()
            return rejectWithValue()
        }
    }
)

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
    await logoutApi()
    localStorage.clear()
})

export const refreshThunk = createAsyncThunk('auth/refresh', async (_, { dispatch }) => {
    const fp = localStorage.getItem('fingerprint')!
    const rt = localStorage.getItem('refreshToken')!
    const tokens = await refreshApi({ fingerprint: fp, refreshToken: rt })
    localStorage.setItem('accessToken', tokens.access)
    localStorage.setItem('refreshToken', tokens.refresh)
    const email = localStorage.getItem('userEmail')!
    dispatch(fetchUserThunk(email))
})

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (b) => {
        // login
        b.addCase(loginThunk.pending, (s) => { s.loading = true; s.error = null })
        b.addCase(loginThunk.rejected, (s, a) => { s.loading = false; s.error = a.payload || 'Ошибка'; })
        b.addCase(loginThunk.fulfilled, (s) => { s.loading = false; s.isAuthenticated = true; })

        // fetchUser
        b.addCase(fetchUserThunk.fulfilled, (s, a: PayloadAction<User>) => {
            s.user = a.payload
            s.email = a.payload.email
            s.isAuthenticated = true
        })
        b.addCase(fetchUserThunk.rejected, (s) => {
            s.loading = false; s.isAuthenticated = false; s.user = null; s.email = null
        })

        // refresh
        b.addCase(refreshThunk.fulfilled, (s) => { s.loading = false; s.isAuthenticated = true })
        b.addCase(refreshThunk.rejected, (s) => {
            s.loading = false; s.isAuthenticated = false; s.user = null; s.email = null
        })

        // logout
        b.addCase(logoutThunk.fulfilled, (s) => {
            s.isAuthenticated = false; s.user = null; s.email = null
        })
    },
})

export default slice.reducer
