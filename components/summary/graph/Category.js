import { useState } from 'react';
import styles from './Category.module.css';

const Category = (props) => {
  const [clicked, setClicked] = useState(false);

  const clickHandeler = () => {
    props.onClick(props.index);
    setClicked(!clicked);
  };

  return (
    <li
      style={{ color: props.color }}
      className={`${styles.category} ${clicked && styles.crossed} icon-before`}
      onClick={clickHandeler}
    >
      {props.label}
    </li>
  );
};

export default Category;
