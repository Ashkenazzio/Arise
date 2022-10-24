import { useState, useEffect, useRef } from 'react';

import styles from './Info.module.css';
import Note from './Note';

const Info = (props) => {
  const categoriesWithTrend = props.expensesByCategory.filter(
    (category) => category.trend
  );
  const [notes, setNotes] = useState(categoriesWithTrend.length);
  const [empty, setEmpty] = useState();

  const onClose = () => {
    setNotes((prevNotes) => prevNotes - 1);
  };

  const multiple = () => notes > 2;

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
    const contentScrollHeight =
      railRef.current.scrollHeight - wrapperRef.current.offsetHeight;

    const contentScrollWidth =
      railRef.current.scrollWidth - wrapperRef.current.offsetWidth;

    railRef.current.addEventListener('scroll', (e) => {
      if (contentScrollHeight === 0) {
        if (contentScrollWidth === 0) {
          return console.log('cleanup');
        }
        const currentScroll = railRef.current.scrollLeft / contentScrollWidth;
        shadowTopRef.current.style.opacity = currentScroll;
        shadowBottomRef.current.style.opacity = 1 - currentScroll;
        return;
      }
      const currentScroll = railRef.current.scrollTop / contentScrollHeight;
      shadowTopRef.current.style.opacity = currentScroll;
      shadowBottomRef.current.style.opacity = 1 - currentScroll;
    });
  }, [notes]);

  return (
    <div className={styles.container}>
      <h3 className={styles.label}>Useful Information</h3>
      <div ref={wrapperRef} className={styles.wrapper}>
        <div
          ref={shadowTopRef}
          className={`${styles.shadow} ${styles['shadow--top']}`}
        ></div>
        <div
          ref={shadowBottomRef}
          className={`${styles.shadow} ${styles['shadow--bottom']} ${
            multiple ? styles.multiple : null
          }`}
        ></div>
        <div ref={railRef} className={styles.rail}>
          {empty && <span className={styles.blank}>nothing to report! 🙌🏻</span>}
          {!empty &&
            categoriesWithTrend.map((category) => {
              return (
                <Note key={category.id} category={category} close={onClose} />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Info;
