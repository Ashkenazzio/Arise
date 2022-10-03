import { useCurrency } from 'context/CurrencyContext';
import { useState } from 'react';
import styles from './FlowBlock.module.css';
import FlowItem from './FlowItem';

const Block = (props) => {
  const [selected, setSelected] = useState(null);
  const [currency] = useCurrency();

  let overall = 0;
  props.queries.map((item) => (overall = overall + item.sum));

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {props.queries.length !== 0 &&
          props.queries.map((item) => (
            <FlowItem
              key={item.id}
              icon={props.icon}
              openState={[selected, setSelected]}
              onUpdateItem={props.onUpdateItem}
              onDeleteItem={props.onDeleteItem}
              {...item}
            />
          ))}

        {props.queries.length == 0 && (
          <p className={styles.empty}>No entries to show yet!</p>
        )}
      </div>
      <span className={styles.overall}>
        Overall: {currency.value}
        {overall.toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </span>
    </div>
  );
};

export default Block;
