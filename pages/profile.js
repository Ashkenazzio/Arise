import ProfilePage from '@/auth/ProfilePage';
import { useLayout } from 'context/LayoutContext';

const Profile = () => {
  const [title, setTitle, sort, setSort] = useLayout();
  setTitle('Profile');
  setSort(false);

  return <ProfilePage />;
};

export default Profile;
