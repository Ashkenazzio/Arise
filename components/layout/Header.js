import { useTheme } from 'context/ThemeContext';
import { useSession } from 'next-auth/react';
import { useAnonymousUser } from 'context/AnonymousContext';

import styles from './Header.module.css';
import logo from '@/images/logo.svg';
import User from './user/User';
import ButtonAlt from '@/ui/ButtonAlt';
import Link from 'next/link';

const Header = () => {
  const { data: session, status } = useSession();
  const { darkTheme } = useTheme();
  const [anonyUser] = useAnonymousUser();

  return (
    <div className={`${styles.header} ${darkTheme && styles.dark}`}>
      <img className={styles.logo} src={logo.src} alt='logo' />
      {status === 'authenticated' && <User user={session.user} />}
      {status === 'unauthenticated' && (
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
