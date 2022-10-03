import styles from './Layout.module.css';
import logo from '@/images/logo.svg';
import Link from 'next/link';
import { useTheme } from 'context/ThemeContext';

function AlterLayout(props) {
  const [darkTheme] = useTheme();

  useLayoutEffect(() => {
    document.body.setAttribute('dark-theme', darkTheme);
  }, [darkTheme]);

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <Link href={'/'}>
          <img className={styles.logo} src={logo.src} alt='logo' />
        </Link>
      </div>

      {props.children}
    </div>
  );
}

export default AlterLayout;
