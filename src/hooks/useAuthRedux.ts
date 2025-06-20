import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store'
import { loginThunk, logoutThunk } from '../store/slices/authSlice'

export const useAuthRedux = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { user, isAuthenticated, loading, error } = useSelector((s: RootState) => s.auth)

    const login = (creds: { login: string; password: string }) => dispatch(loginThunk(creds))
    const logout = () => dispatch(logoutThunk())

    return { user, isAuthenticated, loading, error, login, logout }
}
