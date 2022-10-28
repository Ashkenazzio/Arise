import { useRouter } from 'next/router';
import { useState } from 'react';

import Head from 'next/head';
import RegPage from '@/auth/RegPage';
import Prompt from '@/ui/Prompt';

const Register = () => {
  const router = useRouter();

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

  const addUserHandler = async (userData) => {
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await res.json();
      if (res.ok) {
        router.push('/login');
      } else {
        setPrompt({ res: true, ok: false, message: response.message });
      }
    } catch (error) {
      throw Error(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Arise | Register</title>
      </Head>
      <RegPage onAddUser={addUserHandler} />
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

Register.getLayout = (page) => page;

export default Register;
