import Select from '@/ui/Select';
import DarkToggle from '@/ui/DarkToggle';
import styles from './SettingsPage.module.css';

const SettingsPage = () => {
  const currencyOpts = [
    { id: 1, name: '$ - USD', value: 'usd' },
    { id: 2, name: '€ - EUR', value: 'eur' },
    { id: 2, name: '₪ - ILS', value: 'ils' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles['top-bar']}>
        <h1 className={styles.title}>Settings</h1>
      </div>

      <div className={styles.view}>
        <div className={styles.setting}>
          <span className={styles.label}>Dark Mode:</span>
          <DarkToggle className={styles.dark} />
        </div>
        <div className={styles.setting}>
          <span className={styles.label}>Currency:</span>
          <Select state={[1, 2]} options={currencyOpts} />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
