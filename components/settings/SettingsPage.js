import { useCurrency } from 'context/CurrencyContext';
import { useTheme } from 'context/ThemeContext';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { settingsVars } from 'lib/framer-variants';

import Dropdown from '@/ui/Dropdown';
import DarkToggle from '@/ui/DarkToggle';
import styles from './SettingsPage.module.css';

const SettingsPage = () => {
  const { darkTheme, toggleTheme } = useTheme();
  const [currency, setCurrency] = useCurrency();

  const currencyOpts = [
    { id: 'c1', name: '$ - USD', value: '$' },
    { id: 'c2', name: '€ - EUR', value: '€' },
    { id: 'c3', name: '₪ - ILS', value: '₪' },
  ];

  useEffect(() => {
    localStorage.setItem(
      'preferences',
      JSON.stringify({
        darkTheme: darkTheme,
        currency: currency,
      })
    );
  }, [darkTheme, currency]);

  return (
    <motion.div variants={settingsVars} className={styles.view}>
      <div className={styles.setting}>
        <span className={styles.label}>Dark Mode:</span>
        <DarkToggle
          className={styles.dark}
          checked={darkTheme}
          onChange={toggleTheme}
        />
      </div>
      <div className={styles.setting}>
        <span className={styles.label}>Currency:</span>
        <Dropdown
          className={styles.input}
          state={[currency, setCurrency]}
          options={currencyOpts}
          value={currency}
        />
      </div>
    </motion.div>
  );
};

export default SettingsPage;
