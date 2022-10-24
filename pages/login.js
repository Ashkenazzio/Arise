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
      </Head>
      <LoginPage onUserLogin={userLoginHandler} />
    </>
  );
};

Login.getLayout = (page) => page;

export default Login;
