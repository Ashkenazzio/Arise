import styles from './Credential.module.css';

import Button from '@/ui/Button';
import Image from 'next/image';

import userPic from '@/images/profile-pic.svg';
import bear from '@/images/avatars/bear.svg';
import cat from '@/images/avatars/cat.svg';
import dog from '@/images/avatars/dog.svg';
import fox from '@/images/avatars/fox.svg';
import horse from '@/images/avatars/horse.svg';
import owl from '@/images/avatars/owl.svg';
import penguin from '@/images/avatars/penguin.svg';
import pig from '@/images/avatars/pig.svg';

const pickAvatar = (key) => {
  const avatarOptions = {
    bear: bear,
    cat: cat,
    dog: dog,
    fox: fox,
    horse: horse,
    owl: owl,
    penguin: penguin,
    pig: pig,
  };

  return avatarOptions[key];
};

const Credential = (props) => {
  const [state, setState] = props.state;

  return (
    <div className={styles.container}>
      <span className={styles.label}>{props.title}</span>
      {props.title === 'Avatar:' && (
        <Image
          src={props.current ? pickAvatar(props.current) : userPic}
          className={styles.img}
          width='50'
          height='50'
          alt='user avatar'
        />
      )}
      {props.title !== 'Avatar:' && (
        <span className={styles.current}>{props.current}</span>
      )}

      {!props.oauth && (
        <Button className={styles.change} onClick={() => setState(!state)}>
          <i className='fa-solid fa-pen-to-square'></i>
          <span>change</span>
        </Button>
      )}
    </div>
  );
};

export default Credential;
