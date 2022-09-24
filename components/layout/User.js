import styles from './User.module.css';
import profilePic from '@/images/profile-pic.svg';
import { useState, useRef, useEffect } from 'react';
import UserMenu from './UserMenu';

import bear from '@/images/avatars/bear.svg';
import cat from '@/images/avatars/cat.svg';
import dog from '@/images/avatars/dog.svg';
import fox from '@/images/avatars/fox.svg';
import horse from '@/images/avatars/horse.svg';
import owl from '@/images/avatars/owl.svg';
import penguin from '@/images/avatars/penguin.svg';
import pig from '@/images/avatars/pig.svg';

const User = (props) => {
  const [isClicked, setIsClicked] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsClicked(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  const pickAvatar = () => {
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

    return avatarOptions[props.user.avatar].src;
  };

  return (
    <div
      className={styles.user}
      onClick={() => {
        setIsClicked(!isClicked);
      }}
      ref={menuRef}
    >
      <img
        src={props.user.avatar ? pickAvatar() : profilePic.src}
        alt='profile picture'
        className={styles.img}
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
