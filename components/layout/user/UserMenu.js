import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import styles from './UserMenu.module.css';
import UserItem from './UserItem';

const UserMenu = (props) => {
  const { status } = useSession();
  const router = useRouter();

  const [open, setOpen] = props.state;

  const logoutHandler = () => {
    router.push('/login');

    setTimeout(() => {
      if (status === 'authenticated') {
        signOut();
      }
      localStorage.setItem('arise-anonymous', false);
    }, 5);
  };

  return (
    <div className={styles.container} onClick={() => setOpen(!open)}>
      <nav
        className={`${styles.menu} ${open ? styles.active : styles.inactive}`}
        ref={props.ref}
      >
        <div className={styles.user}>
          <span className={styles.greetings}>Hello {props.name}!</span>
          <span className={styles.email}>{props.email}</span>
        </div>
        <ul className={styles.list}>
          <UserItem
            key='1'
            href='/profile'
            icon={String.fromCharCode(0xf044)}
            title={'Edit Profile'}
          />

          <UserItem
            key='2'
            href='/start'
            icon={String.fromCharCode(0xf05a)}
            title={'Help'}
          />

          <UserItem
            key='3'
            href='/settings'
            icon={String.fromCharCode(0xf013)}
            title={'Settings'}
          />

          <UserItem
            key='4'
            onClick={logoutHandler}
            icon={String.fromCharCode(0xf2f5)}
            title={'Logout'}
          />
        </ul>
      </nav>
    </div>
  );
};

export default UserMenu;
