import styles from './Header.module.css';
import logo from '@/images/logo.svg';
import User from './User';
import { useEffect, useState } from 'react';
import ButtonAlt from '@/ui/ButtonAlt';
import Link from 'next/link';
import { useAnonymousUser } from 'context/AnonymousContext';

const Header = () => {
  const [anonyUser] = useAnonymousUser();

  const user = {
    name: 'Eskandar',
    email: 'XanderTIM@gmail.com',
    password: '12345678',
    avatar: 'fox',
  };

  return (
    <div className={`${styles.header} ${styles.dark}`}>
      <img className={styles.logo} src={logo.src} alt='logo' />
      {!anonyUser && <User user={user} />}
      {anonyUser && (
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
