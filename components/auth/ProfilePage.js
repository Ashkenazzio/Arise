import { useState } from 'react';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const options = [
    { key: 'c1', name: '🍴 Eating Out', value: 'eating-out' },
    { key: 'c2', name: '😊 Fun', value: 'fun' },
    { key: 'c3', name: '🛒 Groceries', value: 'groceries' },
    { key: 'c4', name: '📃 Insurance', value: 'insurance' },
    { key: 'c5', name: '💊 Pharma', value: 'pharma' },
    { key: 'c6', name: '🚌 Transport', value: 'transport' },
    { key: 'c7', name: '⚡ Utilities', value: 'utilities' },
    { key: 'c8', name: '♾ Misc.', value: 'miscellaneous' },
  ];

  const [selected, setSelected] = useState({
    name: 'Please choose a category...',
  });

  return (
    <div className={styles.view}>
 
    </div>
  );
};

export default ProfilePage;
