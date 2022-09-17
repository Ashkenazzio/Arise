import styles from './User.module.css';
import profilePic from '@/public/profile-pic.svg';
import { useState, useRef, useEffect } from 'react';
import DropdownMenu from '@/ui/DropdownMenu';

import bear from '@/public/avatars/bear.svg';
import cat from '@/public/avatars/cat.svg';
import dog from '@/public/avatars/dog.svg';
import fox from '@/public/avatars/fox.svg';
import horse from '@/public/avatars/horse.svg';
import owl from '@/public/avatars/owl.svg';
import penguin from '@/public/avatars/penguin.svg';
import pig from '@/public/avatars/pig.svg';

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
        className={'fa-solid fa-chevron-down'}
        style={{
          transform: isClicked ? 'scaleY(-1)' : '',
          transition: '100ms',
        }}
      ></i>
      <DropdownMenu
        name={props.user.name}
        email={props.user.email}
        state={[isClicked, setIsClicked]}
      />
    </div>
  );
};

export default User;
