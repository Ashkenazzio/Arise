import styles from './ExpenseCard.module.css';
import { useCurrency } from 'context/CurrencyContext';

const ExpenseCard = (props) => {
  const [currency] = useCurrency();

  const categoryIcons = {
    'Eating Out': 'fa-solid fa-utensils',
    Fun: 'fa-solid fa-face-smile-beam',
    Groceries: 'fa-solid fa-basket-shopping',
    Insurance: 'fa-solid fa-house-chimney-crack',
    Pharma: 'fa-solid fa-prescription-bottle-medical',
    Transport: 'fa-solid fa-bus',
    Utilities: 'fa-solid fa-file-invoice-dollar',
    'Misc.': 'fa-solid fa-ellipsis',
  };

  const chooseIcon = () => {
    if (categoryIcons[props.title]) {
      return categoryIcons[props.title];
    } else {
      return 'fa-solid fa-wallet';
    }
  };

  return (
    <div className={styles['expense-card']}>
      <i className={`${styles.icon} ${chooseIcon()}`}></i>
      <div className={styles.details}>
        <span className={styles.label}>{props.title}</span>
        <span className={styles.amount}>
          {currency.value}
          {props.sum.toFixed()}
        </span>

        {props.trend && (
          <span className={`${styles.trend} icon-before`}>-120%</span>
        )}
      </div>
    </div>
  );
};

export default ExpenseCard;
