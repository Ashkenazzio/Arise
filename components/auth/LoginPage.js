import FormField from '@/ui/FormField';
import Button from '@/ui/Button';
import ButtonAlt from '@/ui/ButtonAlt';
import Link from 'next/link';
import styles from './LoginPage.module.css';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const router = useRouter();

  const proceedAnonHandler = () => {
    localStorage.setItem('anonymous', true);

    router.push('/start');
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h1 className={styles.title}>Login</h1>
        <form className={styles.form}>
          <FormField title='Email' type='email' />
          <FormField title='Password' type='text' />
          <div className={styles.actions}>
            <Button>Login</Button>
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
