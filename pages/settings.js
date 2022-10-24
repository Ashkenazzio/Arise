import SettingsPage from '@/settings/SettingsPage';
import Head from 'next/head';
import { useEffect } from 'react';

const Settings = (props) => {
  useEffect(() => {
    const [setTitle, setFilter] = props.layout;
    setTitle('Settings');
    setFilter(false);
  }, []);

  return (
    <>
      <Head>
        <title>Arise | Settings</title>
      </Head>
      <SettingsPage />
    </>
  );
};

export default Settings;
