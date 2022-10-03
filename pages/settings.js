import SettingsPage from '@/settings/SettingsPage';
import { useLayoutEffect } from 'react';

const Settings = (props) => {
  useLayoutEffect(() => {
    const [setTitle, setFilter] = props.layout;
    setTitle('Settings');
    setFilter(false);
  }, []);

  return <SettingsPage />;
};

export default Settings;
