import SettingsPage from '@/settings/SettingsPage';
import Head from 'next/head';
import { useEffect } from 'react';

const Settings = (props) => {
  useEffect(() => {
    const [setTitle, setFilter, setQueryControl] = props.layout;

    setTitle('Settings');
    setQueryControl(false);
    setFilter(false);
  }, [props.layout]);

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
