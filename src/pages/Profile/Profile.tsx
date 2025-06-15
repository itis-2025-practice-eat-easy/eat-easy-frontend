import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../../context/AuthApi.tsx";
import Header from "../../components/Header/Header.tsx";

export default function Profile(){
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/signin');
        }
    }, [user, loading, navigate]);

    if (loading || !user) {
        return null;
    }

    const photoUrl = (user as any).photoUrl as string | undefined;

    const initials = (() => {
        const first = user.firstName?.trim() || '';
        const last = user.lastName?.trim() || '';
        if (first || last) {
            return `${first.charAt(0).toUpperCase() || ''}${last.charAt(0).toUpperCase() || ''}`;
        }
        if ((user as any).username) {
            return (user as any).username.charAt(0).toUpperCase();
        }
        if (user.email) {
            return user.email.charAt(0).toUpperCase();
        }
        return '';
    })();

    return (
        <div className="profile-page">
            <Header />
            <main className="profile-container">
                <div className="profile-card">
                    <div className="profile-avatar-wrapper">
                        {photoUrl ? (
                            <img src={photoUrl} alt="Profile" className="profile-avatar-img" />
                        ) : (
                            <div className="profile-avatar-placeholder">
                                {initials}
                            </div>
                        )}
                    </div>
                    <div className="profile-info">
                        <h2 className="profile-name">
                            {user.firstName || ''} {user.lastName || ''}
                        </h2>
                        <p className="profile-email">{user.email}</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
