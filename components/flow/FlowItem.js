import styles from './FlowItem.module.css';
import FlowForm from './FlowForm';

import { useCurrency } from 'context/CurrencyContext';

const FlowItem = (props) => {
  const [edit, setEdit] = props.openState;
  const [currency] = useCurrency();

  const toggle = () => {
    if (edit === props.id) {
      return setEdit(null);
    }
    setEdit(props.id);
  };

  return (
    <li
      className={`${styles.mega} ${
        edit === props.id && styles.open
      } icon-before`}
      onClick={toggle}
    >
      <div
        className={`${styles.container} ${
          edit === props.id && styles.open
        } icon-before`}
        icon={
          props.list === 'Expenses'
            ? String.fromCharCode(0xf068)
            : String.fromCharCode(0x2b)
        }
      >
        {edit !== props.id && (
          <div className={styles.content}>
            <span className={styles.title}>{props.title}</span>
            <span className={styles.sum}>
              {currency.value}
              {props.sum?.toLocaleString()}
            </span>
          </div>
        )}
        {edit === props.id && <FlowForm {...props} />}
      </div>
    </li>
  );
};

export default FlowItem;
