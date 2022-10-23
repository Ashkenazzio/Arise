import Head from 'next/head';
import LoginPage from '@/auth/LoginPage';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const session = useSession();

  const userLoginHandler = async (userData) => {
    const response = await signIn('login', {
      ...userData,
      redirect: false,
    });

    if (response.ok) {
      localStorage.setItem('arise-anonymous', false);
      router.push('/start');
    } else {
      throw new Error(response);
    }
  };

  return (
    <>
      <Head>
        <title>Arise | Login</title>
        <meta name='description' content='The Best Budget Tracking App!' />
        <link rel='shortcut icon' href='public/favicon/favicon.ico' />
      </Head>
      <LoginPage onUserLogin={userLoginHandler} />
    </>
  );
};

export default Login;

Login.getLayout = (page) => page;
