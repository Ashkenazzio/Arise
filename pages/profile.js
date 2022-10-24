import ProfilePage from '@/auth/ProfilePage';
import Head from 'next/head';
import { useEffect } from 'react';

const Profile = (props) => {
  const changeCredentialsHandler = () => {};

  useEffect(() => {
    const [setTitle, setFilter] = props.layout;
    setTitle('Profile');
    setFilter(false);
  }, []);

  return (
    <>
      <Head>
        <title>Arise | Profile</title>
      </Head>
      <ProfilePage onChangeCredential={changeCredentialsHandler} />
    </>
  );
};

export default Profile;
