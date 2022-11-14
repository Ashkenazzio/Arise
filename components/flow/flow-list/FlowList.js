import { useState } from 'react';
import { useCurrency } from 'context/CurrencyContext';
import { motion } from 'framer-motion';

import styles from './FlowList.module.css';
import FlowBlock from './FlowBlock';
import { flowListVars } from 'lib/framer-variants';

function FlowList(props) {
  const [selected, setSelected] = useState(null);
  const [currency] = useCurrency();

  let overall = 0;
  props.queries.map((item) => (overall = overall + item.sum));

  const queriesByDate = Object.entries(
    props.queries.reduce((acc, curr) => {
      !acc[curr.date]
        ? (acc[curr.date] = [curr])
        : (acc[curr.date] = [...acc[curr.date], curr]);
      return acc;
    }, {})
  );

  const queriesByOrder = [...queriesByDate].sort(
    (a, b) => new Date(b[0]) - new Date(a[0])
  );
  return (
    <motion.div variants={flowListVars} className={styles.container}>
      <h3 className={styles.title}>{props.list}</h3>
      <ul className={styles.blocks}>
        {props.queries.length !== 0 &&
          queriesByOrder.map((block) => (
            <FlowBlock
              key={block[0]}
              title={block[0]}
              queries={block[1]}
              list={props.list}
              openState={[selected, setSelected]}
              categories={props.categories}
              onUpdateItem={props.onUpdateItem}
              onDeleteItem={props.onDeleteItem}
              onAddCategory={props.onAddCategory}
            />
          ))}

        {props.queries.length == 0 && (
          <p className={styles.empty}>No entries to show yet!</p>
        )}
      </ul>
      <span className={styles.overall}>
        Overall: {currency.value}
        {overall.toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </span>
    </motion.div>
  );
}

export default FlowList;
