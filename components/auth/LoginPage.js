import { useRouter } from 'next/router';
import { useRef } from 'react';

import FormField from '@/ui/FormField';
import Button from '@/ui/Button';
import ButtonAlt from '@/ui/ButtonAlt';
import Link from 'next/link';
import styles from './LoginPage.module.css';

const LoginPage = (props) => {
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

  const proceedAnonHandler = () => {
    localStorage.setItem('arise-anonymous', true);

    router.push('/start');
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h1 className={styles.title}>Login</h1>
        <form className={styles.form}>
          <FormField title='Email' type='email' ref={emailRef} />
          <FormField title='Password' type='password' ref={passwordRef} />
          <div className={styles.actions}>
            <Button onClick={loginHandler}>Login</Button>
            <Link href='/register'>
              <a className={styles.link}>
                Don't have an account? Click here to register
              </a>
            </Link>
          </div>
        </form>
      </div>
      <ButtonAlt onClick={proceedAnonHandler}>
        Proceed without logging in
      </ButtonAlt>
    </div>
  );
};

export default LoginPage;
