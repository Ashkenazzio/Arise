import styles from './Header.module.css';
import logo from '@/public/logo.svg';
import fox from '@/public/avatars/fox.svg';
import User from './User';

const Header = () => {
  const user = {
    name: 'Eskandar',
    email: 'XanderTIM@gmail.com',
    password: '12345678',
    avatar: 'fox',
  };

  return (
    <div className={styles.header}>
      <img className={styles.logo} src={logo.src} alt='logo' />
      <User user={user} />
    </div>
  );
};

export default Header;
