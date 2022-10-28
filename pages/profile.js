import { useEffect, useState } from 'react';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { signIn } from 'next-auth/react';

import Head from 'next/head';
import ProfilePage from '@/auth/ProfilePage';
import ChangeCredentials from '@/auth/ChangeCredentials';
import Prompt from '@/ui/Prompt';

const Profile = (props) => {
  const [credentialsModal, setCredentialsModal] = useState(false);
  const [changeUser, setChangeUser] = useState({
    user: { ...props.user },
    change: false,
  });
  const [prompt, setPrompt] = useState({
    res: null,
    ok: null,
    message: '',
  });
  const [feedback, setFeedback] = useState('');

  const credentialsModalHandler = () => {
    setCredentialsModal(!credentialsModal);
  };

  const resetHandler = (event) => {
    if (event) {
      event.preventDefault();
    }

    setChangeUser({
      user: { ...props.user },
      change: false,
    });
  };

  const closePromptHandler = () => {
    setPrompt({
      res: null,
      ok: null,
      message: '',
    });
  };

  const changeCredentialsHandler = async (enteredPassword, queryData) => {
    try {
      const res = await fetch('/api/password', {
        method: 'POST',
        body: JSON.stringify(enteredPassword),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        credentialsModalHandler();
        const { password } = queryData;
        if (!password) {
          queryData.password = enteredPassword;
        }

        const res = await fetch('/api/user', {
          method: 'PATCH',
          body: JSON.stringify(queryData),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const parsedResponse = await res.json();
        if (res.ok) {
          const res = await signIn('login', {
            email: parsedResponse.data.email,
            password: enteredPassword,
            redirect: false,
          });
          if (res.ok) {
            setPrompt({ res: true, ok: true, message: parsedResponse.message });
          } else {
            setPrompt({
              res: true,
              ok: false,
              message:
                'Something went wrong... try signing out and logging back in.',
            });
          }
        } else {
          setPrompt({ res: true, ok: false, message: parsedResponse.message });
        }
      } else {
        const parsedResponse = await res.json();
        setFeedback(parsedResponse.message);
      }
    } catch (error) {
      throw Error(error);
    }
  };

  useEffect(() => {
    const [setTitle, setFilter, setQueryControl] = props.layout;

    setTitle('Profile');
    setQueryControl(false);
    setFilter(false);
  }, []);

  return (
    <>
      <Head>
        <title>Arise | Profile</title>
      </Head>
      <ProfilePage
        user={props.user}
        changeUser={[changeUser, setChangeUser]}
        credentialsModalHandler={credentialsModalHandler}
        onReset={resetHandler}
      />
      {credentialsModal && (
        <ChangeCredentials
          onClose={credentialsModalHandler}
          onChangeCredential={changeCredentialsHandler}
          reset={resetHandler}
          changeUser={changeUser}
          feedback={feedback}
        />
      )}
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

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);

  let user;
  if (session) {
    user = session.user;
    if (!user.image) {
      user.image = null;
    }
  }
  return {
    props: {
      user: user ? user : null,
    },
  };
}

export default Profile;
