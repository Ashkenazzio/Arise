import RegPage from '@/auth/RegPage';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Register = () => {
  const router = useRouter();

  const addUserHandler = async (userData) => {
    let url = `/api/new-user`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await res.json();


      router.push('/login');
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Arise | Register</title>
        <meta name='description' content='The Best Budget Tracking App!' />
        <link rel='shortcut icon' href='public/favicon.ico' />
      </Head>
      <RegPage onAddUser={addUserHandler} />
    </>
  );
};

export default Register;

Register.getLayout = (page) => page;
