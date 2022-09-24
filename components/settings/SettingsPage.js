import Select from '@/ui/Select';
import DarkToggle from '@/ui/DarkToggle';
import styles from './SettingsPage.module.css';
import { useCurrency } from 'context/CurrencyContext';
import { useTheme } from 'context/ThemeContext';

const SettingsPage = () => {
  const [currency, setCurrency] = useCurrency();

  const currencyOpts = [
    { id: 1, name: '$ - USD', value: '$' },
    { id: 2, name: '€ - EUR', value: '€' },
    { id: 2, name: '₪ - ILS', value: '₪' },
  ];

  // const [darkTheme, toggleTheme] = useTheme();

  return (
    <div className={styles.view}>
      <div className={styles.setting}>
        <span className={styles.label}>Dark Mode:</span>
        <DarkToggle className={styles.dark} />
      </div>
      <div className={styles.setting}>
        <span className={styles.label}>Currency:</span>
        <Select state={[currency, setCurrency]} options={currencyOpts} />
      </div>
    </div>
  );
};

export default SettingsPage;
