import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import styles from './Info.module.css';
import Note from './Note';
import { infoContainerVars, infoRailVars, noteVars } from 'lib/framer-variants';

const Info = (props) => {
  const categoriesWithTrend = props.queriesByCategory.filter(
    (category) => category.trend
  );
  const [notes, setNotes] = useState(categoriesWithTrend.length);
  const [empty, setEmpty] = useState(false);

  const onClose = () => {
    setNotes((prevNotes) => prevNotes - 1);
  };

  useEffect(() => {
    setNotes(categoriesWithTrend.length);
  }, [categoriesWithTrend.length]);

  useEffect(() => {
    if (notes === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [notes]);

  const wrapperRef = useRef();
  const railRef = useRef();
  const shadowTopRef = useRef();
  const shadowBottomRef = useRef();

  useEffect(() => {
    if (window.innerWidth < 1200) {
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
    } else {
      const contentScrollHeight =
        railRef.current.scrollHeight - wrapperRef.current.offsetHeight;
      const currentScroll = railRef.current.scrollTop / contentScrollHeight;

      if (contentScrollHeight > 0) {
        shadowBottomRef.current.style.setProperty(
          '--sum-scroll-shadow-bottom-height',
          `${1 + (5 - currentScroll)}rem`
        );
        shadowBottomRef.current.style.setProperty(
          '--sum-scroll-shadow-bottom-opacity',
          1 - currentScroll
        );
      }

      railRef.current.addEventListener('scroll', (e) => {
        if (contentScrollHeight <= 0) {
          return;
        }
        const currentScroll = railRef.current.scrollLeft / contentScrollHeight;

        shadowTopRef.current.style.opacity = currentScroll;
        shadowTopRef.current.style.height = `${1 + (5 + currentScroll)}rem`;
        shadowBottomRef.current.style.opacity = 1 - currentScroll;
        shadowBottomRef.current.style.height = `${1 + (5 - currentScroll)}rem`;
      });
    }
  }, []);

  return (
    <motion.div variants={infoContainerVars} className={styles.container}>
      <h3 className={styles.label}>Useful Information</h3>
      <div ref={wrapperRef} className={styles.wrapper}>
        <div
          ref={shadowTopRef}
          className={`${styles.shadow} ${styles['shadow--top']}`}
        ></div>
        <div
          ref={shadowBottomRef}
          className={`${styles.shadow} ${styles['shadow--bottom']}`}
        ></div>
        <motion.div
          variants={infoRailVars}
          ref={railRef}
          className={styles.rail}
        >
          {empty && <span className={styles.blank}>nothing to report! 🙌🏻</span>}
          {categoriesWithTrend.map((category) => {
            return (
              <Note
                key={category.id}
                category={category}
                close={onClose}
                list={props.list}
              />
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Info;
