import styles from './Category.module.css';

const Category = (props) => {
  return (
    <span
      style={{ color: props.color }}
      icon={props.icon}
      className={`${styles.category} icon-before`}
    >
      {props.children}
    </span>
  );
};

export default Category;
