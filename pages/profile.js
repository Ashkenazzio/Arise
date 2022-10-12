import ProfilePage from '@/auth/ProfilePage';
import { useLayoutEffect } from 'react';

const Profile = (props) => {
  const onChangeCredential = () => {
    console.log('onChangeCredential');
  };

  useLayoutEffect(() => {
    const [setTitle, setFilter] = props.layout;
    setTitle('Profile');
    setFilter(false);
  }, []);

  return <ProfilePage onChangeCredential={onChangeCredential} />;
};

export default Profile;
