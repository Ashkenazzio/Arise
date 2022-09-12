import styles from './User.module.css';
import profilePic from '@/public/profile-pic.svg';
import { useState } from 'react';

const User = (props) => {
  const openSubMenu = () => {
    setIsClicked((prevState) => !prevState);
  };

  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className={styles['user-menu']}>
      <i className='fa-solid fa-bell'></i>
      <div
        className={`${styles.user} ${isClicked ? styles.active : ''}`}
        onClick={openSubMenu}
      >
        <img
          src={props.img ? props.img : profilePic.src}
          alt='profile picture'
          className={styles.img}
        />
        <i className='fa-solid fa-chevron-down'></i>
      </div>
    </div>
  );
};

export default User;
