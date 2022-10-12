import styles from './ChangeCredentials.module.css';

import Modal from '@/ui/Modal';
import Button from '@/ui/Button';
import ButtonAlt from '@/ui/ButtonAlt';

import AvatarOption from './AvatarOption';
import bear from '@/images/avatars/bear.svg';
import cat from '@/images/avatars/cat.svg';
import dog from '@/images/avatars/dog.svg';
import fox from '@/images/avatars/fox.svg';
import horse from '@/images/avatars/horse.svg';
import owl from '@/images/avatars/owl.svg';
import penguin from '@/images/avatars/penguin.svg';
import pig from '@/images/avatars/pig.svg';
import { useRef } from 'react';

const ChangeAvatar = (props) => {
  const [changeUser, setChangeUser] = props.change;

  const avatarRef = useRef();

  let avatarValue = null;

  const changeAvatarValue = (e) => {
    avatarValue = e.target.value;
  };

  const changeAvatarHandler = (e) => {
    e.preventDefault();

    setChangeUser({
      user: { ...changeUser.user, avatar: avatarValue },
      change: true,
    });
    props.onClose();
  };

  return (
    <Modal className={styles.container} onClose={props.onClose}>
      <h3 className={styles.title}>Change Avatar</h3>
      <div className={styles.input}>
        <div className={styles.avatar}>
          <div onChange={changeAvatarValue} className={styles.options}>
            <AvatarOption avatar='bear' img={bear} />
            <AvatarOption avatar='cat' img={cat} />
            <AvatarOption avatar='dog' img={dog} />
            <AvatarOption avatar='fox' img={fox} />
            <AvatarOption avatar='horse' img={horse} />
            <AvatarOption avatar='owl' img={owl} />
            <AvatarOption avatar='penguin' img={penguin} />
            <AvatarOption avatar='pig' img={pig} />
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <ButtonAlt onClick={props.onClose}>CANCEL</ButtonAlt>
        <Button onClick={changeAvatarHandler}>CHANGE</Button>
      </div>
    </Modal>
  );
};

export default ChangeAvatar;
