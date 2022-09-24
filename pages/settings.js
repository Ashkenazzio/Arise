import SettingsPage from '@/settings/SettingsPage';
import { useLayout } from 'context/LayoutContext';

const Settings = (props) => {
  const [title, setTitle, sort, setSort] = useLayout();
  setTitle('Settings');
  setSort(false);

  return <SettingsPage />;
};

export default Settings;
