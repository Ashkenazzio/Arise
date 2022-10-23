import styles from './NavItem.module.css';

import { useRouter } from 'next/router';
import Link from 'next/link';

const NavItem = (props) => {
  const router = useRouter();

  const isCurrentPath =
    router.pathname === props.href || router.asPath === props.href;

  if (props.href) {
    return (
      <Link href={props.href}>
        <li
          className={`${styles.item} ${
            isCurrentPath && styles.active
          } icon-before`}
          icon={props.icon}
        >
          {props.title}
        </li>
      </Link>
    );
  } else {
    return (
      <li
        onClick={props.onClick}
        className={`${styles.item} ${
          isCurrentPath && styles.active
        } icon-before`}
        icon={props.icon}
      >
        {props.title}
      </li>
    );
  }
};

export default NavItem;
