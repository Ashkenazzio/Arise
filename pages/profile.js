import ProfilePage from '@/auth/ProfilePage';
import { useLayoutEffect } from 'react';

const Profile = () => {
  useLayoutEffect(() => {
    const [setTitle, setFilter] = props.layout;
    setTitle('Profile');
    setFilter(false);
  }, []);

  return <ProfilePage />;
};

export default Profile;
