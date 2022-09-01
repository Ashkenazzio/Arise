import styles from './LogoutItem.module.css';

const NavItem = (props) => {
  return (
    <li className={`${styles.logout} icon-before`} data-icon={props.icon}>
      {props.children}
    </li>
  );
};

export default NavItem;
