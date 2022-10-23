import Link from 'next/link';
import styles from './UserItem.module.css';

const UserItem = (props) => {
  if (props.href) {
    return (
      <Link href={props.href}>
        <li className={`${styles.item} icon-before`} icon={props.icon}>
          {props.title}
        </li>
      </Link>
    );
  } else {
    return (
      <li
        onClick={props.onClick}
        className={`${styles.item} icon-before`}
        icon={props.icon}
      >
        {props.title}
      </li>
    );
  }
};

export default UserItem;
