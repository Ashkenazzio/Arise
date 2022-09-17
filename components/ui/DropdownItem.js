import Link from 'next/link';
import styles from './DropdownItem.module.css';

const DropdownItem = (props) => {
  return (
    <Link href={props.href}>
      <li className={`${styles.item}  icon-before`} icon={props.icon}>
        {props.title}
      </li>
    </Link>
  );
};

export default DropdownItem;
