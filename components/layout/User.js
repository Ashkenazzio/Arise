import styles from './User.module.css';
import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import UserMenu from './UserMenu';

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

const User = (props) => {
  const user = useSession().data.user;
  const [isClicked, setIsClicked] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let mousedownHandler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsClicked(false);
      }
    };

    document.addEventListener('mousedown', mousedownHandler);

    return () => {
      document.removeEventListener('mousedown', mousedownHandler);
    };
  });

  return (
    <div
      className={styles.user}
      onClick={() => {
        setIsClicked(!isClicked);
      }}
      ref={menuRef}
    >
      <Image
        src={pickAvatar(user.avatar)}
        className={styles.img}
        width='50'
        height='50'
      />
      <i
        className={`${isClicked && styles.clicked} fa-solid fa-chevron-down`}
      ></i>
      <UserMenu
        name={props.user.name}
        email={props.user.email}
        state={[isClicked, setIsClicked]}
      />
    </div>
  );
};

export default User;
