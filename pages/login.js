import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Head from 'next/head';
import LoginPage from '@/auth/LoginPage';
import Prompt from '@/ui/Prompt';

const Login = () => {
  const [prompt, setPrompt] = useState({
    res: null,
    ok: null,
    message: '',
  });

  const closePromptHandler = () => {
    setPrompt({
      res: null,
      ok: null,
      message: '',
    });
  };

  const router = useRouter();

  const userLoginHandler = async (userData) => {
    const response = await signIn('login', {
      ...userData,
      redirect: false,
    });

    if (response.ok) {
      localStorage.setItem('arise-anonymous', false);
      router.push('/start');
    } else {
      setPrompt({ res: true, ok: false, message: response.error });
    }
  };

  return (
    <>
      <Head>
        <title>Arise | Login</title>
      </Head>
      <LoginPage onUserLogin={userLoginHandler} />
      {prompt.res && (
        <Prompt
          onClose={closePromptHandler}
          ok={prompt.ok}
          message={prompt.message}
        />
      )}
    </>
  );
};

Login.getLayout = (page) => page;

export default Login;
