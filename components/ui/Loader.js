import styles from './Loader.module.css';
import { motion } from 'framer-motion';

const loaderVariants = {
  loading: {
    y: [0, -40],
    x: 0,
    transition: {
      repeat: Infinity,
      repeatType: 'reverse',
      duration: 0.25,
      ease: 'easeOut',
    },
  },
};

const Loader = () => {
  return (
    <motion.div
      className={styles.loader}
      variants={loaderVariants}
      animate='loading'
    ></motion.div>
  );
};

export default Loader;
