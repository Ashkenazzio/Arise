import Dropdown from '@/ui/Dropdown';
import DarkToggle from '@/ui/DarkToggle';
import styles from './SettingsPage.module.css';
import { useCurrency } from 'context/CurrencyContext';
import { useTheme } from 'context/ThemeContext';
import { useEffect } from 'react';

const SettingsPage = () => {
  const { darkTheme, toggleTheme, setDarkTheme } = useTheme();
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
    <div className={styles.view}>
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
    </div>
  );
};

export default SettingsPage;
