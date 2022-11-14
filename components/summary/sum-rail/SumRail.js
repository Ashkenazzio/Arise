import styles from './SumRail.module.css';
import SumCard from './SumCard';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import {
  sumRailVars,
  railContainerVars,
  shadowBottomVars,
} from 'lib/framer-variants';

const SumRail = (props) => {
  const wrapperRef = useRef();
  const railRef = useRef();
  const shadowTopRef = useRef();
  const shadowBottomRef = useRef();

  useEffect(() => {
    const contentScrollWidth =
      railRef.current.scrollWidth - wrapperRef.current.offsetWidth;
    const currentScroll = railRef.current.scrollLeft / contentScrollWidth;

    if (contentScrollWidth > 0) {
      shadowBottomRef.current.style.setProperty(
        '--sum-scroll-shadow-bottom-width',
        `${1 + (5 - currentScroll)}rem`
      );
      shadowBottomRef.current.style.setProperty(
        '--sum-scroll-shadow-bottom-opacity',
        1 - currentScroll
      );
    }

    railRef.current.addEventListener('scroll', (e) => {
      if (contentScrollWidth <= 0) {
        return;
      }
      const currentScroll = railRef.current.scrollLeft / contentScrollWidth;

      shadowTopRef.current.style.opacity = currentScroll;
      shadowTopRef.current.style.width = `${1 + (5 + currentScroll)}rem`;
      shadowBottomRef.current.style.opacity = 1 - currentScroll;
      shadowBottomRef.current.style.width = `${1 + (5 - currentScroll)}rem`;
    });
  }, []);

  return (
    <motion.div variants={railContainerVars} className={styles.container}>
      <div ref={wrapperRef} className={styles.wrapper}>
        <div
          ref={shadowTopRef}
          className={`${styles.shadow} ${styles['shadow-top']}`}
        />
        <motion.div
          variants={shadowBottomVars}
          ref={shadowBottomRef}
          className={`${styles.shadow} ${styles['shadow-bottom']}`}
        />
        <motion.div
          variants={sumRailVars}
          ref={railRef}
          className={styles.rail}
        >
          {props.queriesByCategory.length !== 0 &&
            props.queriesByCategory.map((category) => (
              <SumCard
                key={category.id}
                title={category.title}
                sum={category.sum}
                trend={category.trend ? category.trend : undefined}
                list={props.list}
              />
            ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SumRail;
