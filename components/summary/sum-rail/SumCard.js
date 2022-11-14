import styles from './SumCard.module.css';
import { useCurrency } from 'context/CurrencyContext';
import { motion } from 'framer-motion';
import { sumCardVars } from 'lib/framer-variants';

const SumCard = (props) => {
  const [currency] = useCurrency();

  const categoryIcons = {
    Food: 'fa-solid fa-utensils',
    Fun: 'fa-solid fa-face-smile-beam',
    Supplies: 'fa-solid fa-basket-shopping',
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

  const above = props.trend > 0;
  const expense = props.list === 'Expenses';

  return (
    <motion.div variants={sumCardVars} className={styles['sum-card']}>
      <div className={styles.icon}>
        <i className={`${chooseIcon()}`}></i>
      </div>
      <div className={styles.details}>
        <span className={styles.amount}>
          {currency.value}
          {props.sum.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </span>
        <span className={styles.label}>{props.title}</span>
        <div
          className={`${styles.trend} ${
            expense
              ? above
                ? `${styles.above} ${styles.negative}`
                : undefined
              : above
              ? styles.above
              : styles.negative
          }`}
        >
          {props.trend && (
            <span className={`${styles.change} icon-before`}>
              {props.trend.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
              %
            </span>
          )}

          {!props.trend && (
            <span className={`${styles.nochange} icon-before`}>n/a</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SumCard;
