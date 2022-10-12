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
    <li className={styles.container}>
      <span className={styles.title}>
        {new Date(props.title).toLocaleDateString(undefined, dateOpts)}
      </span>
      <ul className={styles.list}>
        {props.queries.map((item) => (
          <FlowItem
            {...item}
            key={item.id}
            list={props.list}
            openState={props.openState}
            onUpdateItem={props.onUpdateItem}
            onDeleteItem={props.onDeleteItem}
          />
        ))}
      </ul>
    </li>
  );
};

export default FlowBlock;
