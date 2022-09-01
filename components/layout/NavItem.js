import styles from './NavItem.module.css';

const NavItem = (props) => {
  return (
    <li className={`${styles.item} icon-before`} icon={props.icon}>
      {props.children}
    </li>
  );
};

export default NavItem;
