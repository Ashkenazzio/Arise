import { motion } from 'framer-motion';
import { blockContainerVars, blockListVars } from 'lib/framer-variants';

import styles from './FlowBlock.module.css';
import FlowItem from './FlowItem';

const FlowBlock = (props) => {
  const dateOpts = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <motion.li variants={blockContainerVars} className={styles.container}>
      <span className={styles.title}>
        {new Date(props.title).toLocaleDateString(undefined, dateOpts)}
      </span>
      <motion.ul variants={blockListVars} className={styles.list}>
        {props.queries.map((item) => (
          <FlowItem
            {...item}
            key={item.id}
            list={props.list}
            openState={props.openState}
            categories={props.categories}
            onUpdateItem={props.onUpdateItem}
            onDeleteItem={props.onDeleteItem}
            onAddCategory={props.onAddCategory}
          />
        ))}
      </motion.ul>
    </motion.li>
  );
};

export default FlowBlock;
