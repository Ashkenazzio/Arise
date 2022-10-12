import styles from './Header.module.css';
import logo from '@/images/logo.svg';
import User from './User';
import ButtonAlt from '@/ui/ButtonAlt';
import Link from 'next/link';
import { useTheme } from 'context/ThemeContext';
import { useAuthUser } from 'context/AuthContext';

const Header = () => {
  const [darkTheme] = useTheme();
  const [authUser] = useAuthUser();

  console.log(authUser);

  return (
    <div className={`${styles.header} ${darkTheme && styles.dark}`}>
      <img className={styles.logo} src={logo.src} alt='logo' />
      {authUser && <User user={authUser} />}
      {!authUser && (
        <div className={styles.actions}>
          <Link href={'/login'}>
            <ButtonAlt>Login</ButtonAlt>
          </Link>
          <Link href={'/register'}>
            <ButtonAlt>Register</ButtonAlt>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
