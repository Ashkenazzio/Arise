import styles from './FlowItem.module.css';

const FlowItem = (props) => {
  return (
    <div className={styles.container}>
      <span
        className={`${styles.title} icon-before`}
        icon={props.icon}
        var={props.var}
      >
        {props.title}
      </span>
      <span className={styles.sum}>₪ {props.sum}</span>
    </div>
  );
};

export default FlowItem;
