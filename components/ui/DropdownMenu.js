import styles from './DropdownMenu.module.css';
import { useState, useRef, useEffect } from 'react';

import DropdownItem from './DropdownItem';
import Link from 'next/link';

const DropdownMenu = (props) => {
  const [open, setOpen] = props.state;

  let menuRef = useRef();

  // useEffect(() => {
  //   let handler = (e) => {
  //     if (!menuRef.current.contains(e.target)) {
  //       setOpen(false);
  //       console.log(menuRef.current);
  //     }
  //   };

  //   document.addEventListener('mousedown', handler);

  //   return () => {
  //     document.removeEventListener('mousedown', handler);
  //   };
  // });

  return (
    <div
      className={styles.container}
      onClick={() => setOpen(!open)}
      ref={menuRef}
    >
      {/* <div className={styles.menu}> */}

      <div
        className={`${styles.menu} ${open ? styles.active : styles.inactive}`}
      >
        <ul className={styles.list}>
          <Link href='/profile'>
            <a>
              <DropdownItem key='1' icon={String.fromCharCode(0xf044)}>
                Edit Profile
              </DropdownItem>
            </a>
          </Link>

          <Link href='/'>
            <a>
              <DropdownItem key='2' icon={String.fromCharCode(0xf05a)}>
                Help
              </DropdownItem>
            </a>
          </Link>

          <Link href='/settings'>
            <a>
              <DropdownItem key='3' icon={String.fromCharCode(0xf013)}>
                Settings
              </DropdownItem>
            </a>
          </Link>

          <Link href=''>
            <a>
              <DropdownItem key='4' icon={String.fromCharCode(0xf2f5)}>
                Logout
              </DropdownItem>
            </a>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
