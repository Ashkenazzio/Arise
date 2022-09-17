import styles from './DropdownMenu.module.css';

import DropdownItem from './DropdownItem';

const DropdownMenu = (props) => {
  const [open, setOpen] = props.state;

  return (
    <div className={styles.container} onClick={() => setOpen(!open)}>
      <div
        className={`${styles.menu} ${open ? styles.active : styles.inactive}`}
        ref={props.ref}
      >
        <ul className={styles.list}>
          <div className={styles.greetings}>
            <span>Hello {props.name}!</span>
            <span className={styles.email}>{props.email}</span>
          </div>
          <DropdownItem
            key='1'
            href='/profile'
            icon={String.fromCharCode(0xf044)}
            title={'Edit Profile'}
          />

          <DropdownItem
            key='2'
            href='/'
            icon={String.fromCharCode(0xf05a)}
            title={'Help'}
          />

          <DropdownItem
            key='3'
            href='/settings'
            icon={String.fromCharCode(0xf013)}
            title={'Settings'}
          />

          <DropdownItem
            key='4'
            href='/logout'
            icon={String.fromCharCode(0xf2f5)}
            title={'Logout'}
          />
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
