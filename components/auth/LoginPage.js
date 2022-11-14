import { useRouter } from 'next/router';
import { useRef } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

import FormField from '@/ui/FormField';
import Button from '@/ui/Button';
import ButtonAlt from '@/ui/ButtonAlt';
import Link from 'next/link';
import styles from './LoginPage.module.css';
import { formFieldVars, loginVars } from 'lib/framer-variants';

const LoginPage = (props) => {
  const { status } = useSession();
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();

  const loginHandler = (e) => {
    e.preventDefault();

    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    props.onUserLogin(userData);
  };

  const logoutHandler = () => {
    signOut();
    localStorage.setItem('arise-anonymous', false);
  };

  const proceedAnonHandler = () => {
    localStorage.setItem('arise-anonymous', true);

    router.push('/start');
  };

  return (
    <>
      <motion.section variants={loginVars} className={styles.login}>
        {status === 'unauthenticated' && (
          <>
            <h1 className={styles.title}>Login</h1>
            <form className={styles.form}>
              <FormField title='Email' type='email' ref={emailRef} />
              <FormField title='Password' type='password' ref={passwordRef} />
              <motion.div variants={formFieldVars} className={styles.actions}>
                <Button onClick={loginHandler}>Login</Button>
                <Link href='/register'>
                  <a className={styles.link}>
                    Don&apos;t have an account? Click here to register
                  </a>
                </Link>
              </motion.div>
            </form>
          </>
        )}
        {status === 'authenticated' && (
          <div className={styles.actions}>
            <h2>Looks like your already logged in!</h2>
            <Link href={'/start'}>
              <Button className={styles.back}>back to app</Button>
            </Link>
            <ButtonAlt onClick={logoutHandler}>logout</ButtonAlt>
          </div>
        )}
      </motion.section>

      {status === 'unauthenticated' && (
        <ButtonAlt onClick={proceedAnonHandler}>
          Proceed without logging in
        </ButtonAlt>
      )}
    </>
  );
};

export default LoginPage;
