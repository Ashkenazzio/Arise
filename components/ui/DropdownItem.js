import Link from 'next/link';
import styles from './DropdownItem.module.css';
Link;

const DropdownItem = (props) => {
  return (
    <li className={`${styles.item} icon-before`} icon={props.icon}>
      {props.children}
    </li>
  );
};

export default DropdownItem;
