import { useState } from 'react';
import { motion } from 'framer-motion';

import styles from './ProfilePage.module.css';
import Button from '@/ui/Button';
import ButtonAlt from '@/ui/ButtonAlt';
import Credential from './Credential';
import ChangeAvatar from './ChangeAvatar';
import ChangeName from './ChangeName';
import ChangePassword from './ChangePassword';
import { profileVars } from 'lib/framer-variants';

const ProfilePage = (props) => {
  const [changeUser, setChangeUser] = props.changeUser;
  const [nameModal, setNameModal] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);

  const nameModalHandler = () => {
    setNameModal(!nameModal);
  };

  const avatarModalHandler = () => {
    setAvatarModal(!avatarModal);
  };

  const passwordModalHandler = () => {
    setPasswordModal(!passwordModal);
  };

  if (!props.user) {
    return (
      <div className={styles.view}>
        <p>You have to be signed in to view the profile page.</p>
      </div>
    );
  }

  return (
    <motion.div variants={profileVars} className={styles.view}>
      <h2 className={styles.title}>Hello {props.user.name} </h2>
      <div className={styles.credentials}>
        <div className={styles.container}>
          <span className={styles.label}>Email:</span>
          <span className={styles.current}>{changeUser.user.email}</span>
        </div>

        <Credential
          title='Name:'
          current={changeUser.user.name}
          state={[nameModal, setNameModal]}
          oauth={props.user.image}
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
          oauth={props.user.image}
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
          oauth={props.user.image}
        />
        {passwordModal && (
          <ChangePassword
            onClose={passwordModalHandler}
            change={[changeUser, setChangeUser]}
          />
        )}
      </div>

      <div className={styles.actions}>
        {props.user.image && (
          <h3>
            Users authenticated using a third-party login cannot edit their
            profile{' '}
          </h3>
        )}
        {!props.user.image && (
          <>
            <ButtonAlt onClick={props.onReset}>clear changes</ButtonAlt>
            <Button
              onClick={props.credentialsModalHandler}
              disabled={!changeUser.change}
            >
              save changes
            </Button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ProfilePage;
