import styles from './Header.module.css';
import logo from '@/public/logo.svg';
import profile from '@/public/user-example.png';
import User from './User';

const Header = () => {
  return (
    <div className={styles.header}>
      <img className={styles.logo} src={logo.src} alt='logo' />
      <User img={profile.src} />
    </div>
  );
};

export default Header;
