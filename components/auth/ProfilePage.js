import styles from './ProfilePage.module.css';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

import Button from '@/ui/Button';
import ButtonAlt from '@/ui/ButtonAlt';
import Credential from './Credential';
import ChangeAvatar from './ChangeAvatar';
import ChangeName from './ChangeName';
import ChangePassword from './ChangePassword';
import ChangeCredentials from './ChangeCredentials';

const ProfilePage = (props) => {
  const { data: session, status } = useSession();

  const [changeUser, setChangeUser] = useState({
    user: { ...session.user },
    change: false,
  });

  const [nameModal, setNameModal] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [credentialsModal, setCredentialsModal] = useState(false);

  const nameModalHandler = () => {
    setNameModal(!nameModal);
  };

  const avatarModalHandler = () => {
    setAvatarModal(!avatarModal);
  };

  const passwordModalHandler = () => {
    setPasswordModal(!passwordModal);
  };

  const credentialsModalHandler = () => {
    setCredentialsModal(!credentialsModal);
  };

  const resetHandler = (event) => {
    if (event) {
      event.preventDefault();
    }

    setChangeUser({
      user: { ...session.user },
      change: false,
    });
  };

  return (
    <div className={styles.view}>
      <h2 className={styles.title}>Hello {session.user.name} </h2>
      <div className={styles.credentials}>
        <div className={styles.container}>
          <span className={styles.label}>Email:</span>
          <span className={styles.current}>{changeUser.user.email}</span>
        </div>

        <Credential
          title='Name:'
          current={changeUser.user.name}
          state={[nameModal, setNameModal]}
        />
        {nameModal && (
          <ChangeName
            onClose={nameModalHandler}
            change={[changeUser, setChangeUser]}
          />
        )}

        <Credential
          title='Avatar:'
          current={changeUser.user.avatar}
          state={[avatarModal, setAvatarModal]}
        />
        {avatarModal && (
          <ChangeAvatar
            onClose={avatarModalHandler}
            change={[changeUser, setChangeUser]}
          />
        )}

        <Credential
          title='Password:'
          current='********'
          state={[passwordModal, setPasswordModal]}
        />
        {passwordModal && (
          <ChangePassword
            onClose={passwordModalHandler}
            change={[changeUser, setChangeUser]}
          />
        )}
      </div>

      <div className={styles.actions}>
        <ButtonAlt onClick={resetHandler}>CLEAR CHANGES</ButtonAlt>
        <Button onClick={credentialsModalHandler} disabled={!changeUser.change}>
          SAVE CHANGES
        </Button>
      </div>
      {credentialsModal && (
        <ChangeCredentials
          onClose={credentialsModalHandler}
          onChangeCredential={props.onChangeCredential}
          reset={resetHandler}
        />
      )}
    </div>
  );
};

export default ProfilePage;
