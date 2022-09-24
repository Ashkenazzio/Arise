import styles from './Header.module.css';
import logo from '@/images/logo.svg';
import User from './User';
import { useEffect, useState } from 'react';
import ButtonAlt from '@/ui/ButtonAlt';
import Link from 'next/link';
import { useSession } from 'context/SessionContext';

const Header = () => {
  const [localSession] = useSession();

  const user = {
    name: 'Eskandar',
    email: 'XanderTIM@gmail.com',
    password: '12345678',
    avatar: 'fox',
  };

  return (
    <div className={styles.header}>
      <img className={styles.logo} src={logo.src} alt='logo' />
      {!localSession && <User user={user} />}
      {localSession && (
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
