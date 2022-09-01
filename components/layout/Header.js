import styles from './Header.module.css';
import logo from 'assets/images/Logo.svg';

const Header = () => {
  return (
    <div className={styles.header}>
      <img className={styles.logo} src={logo.src} alt='logo' />
    </div>
  );
};

export default Header;
