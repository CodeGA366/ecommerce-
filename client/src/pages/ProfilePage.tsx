import React from 'react';
import useAuth from '../hooks/useAuth';
import Profile from '../components/Profile';

const ProfilePage: React.FC = () => {
    const { user } = useAuth();

    return (
        <div>
            {user ? (
                <Profile user={user} />
            ) : (
                <p>Please log in to view your profile.</p>
            )}
        </div>
    );
};

export default ProfilePage;