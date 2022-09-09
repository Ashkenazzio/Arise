import styles from './FlowItem.module.css';

const FlowItem = (props) => {
  return (
    <div className={styles.container}>
      <span className={`${styles.title} icon-before`} icon={props.icon}>
        {props.title}
      </span>
      <span className={styles.sum}>₪ {props.sum.toLocaleString()}</span>
    </div>
  );
};

export default FlowItem;
