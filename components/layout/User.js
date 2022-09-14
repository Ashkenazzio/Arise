import styles from './User.module.css';
import profilePic from '@/public/profile-pic.svg';
import { useState } from 'react';
import DropdownMenu from '@/ui/DropdownMenu';

const User = (props) => {
  const openSubMenu = () => {
    setIsClicked((prevState) => !prevState);
  };

  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className={styles.user} onClick={openSubMenu}>
      <img
        src={props.img ? props.img : profilePic.src}
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
      <DropdownMenu state={[isClicked, setIsClicked]} />
    </div>
  );
};

export default User;
