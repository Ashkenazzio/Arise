import styles from './ExpenseRail.module.css';
import ExpenseCard from './ExpenseCard';
import { useEffect, useRef, useState } from 'react';

const ExpenseRail = (props) => {
  const [scroll, setScroll] = useState(false);

  const wrapperRef = useRef();
  const railRef = useRef();
  const shadowTopRef = useRef();
  const shadowBottomRef = useRef();

  useEffect(() => {
    setScroll(
      railRef.current.scrollHeight > railRef.current.clientHeight ||
        railRef.current.scrollWidth > railRef.current.clientWidth
    );
  }, []);

  useEffect(() => {
    const contentScrollWidth =
      railRef.current.scrollWidth - wrapperRef.current.offsetWidth;

    railRef.current.addEventListener('scroll', (e) => {
      if (contentScrollWidth === 0) {
        return;
      }
      const currentScroll = railRef.current.scrollLeft / contentScrollWidth;
      shadowTopRef.current.style.opacity = currentScroll;
      shadowBottomRef.current.style.opacity = 1 - currentScroll;
    });
  }, []);

  return (
    <div className={styles.container}>
      <div ref={wrapperRef} className={styles.wrapper}>
        <div
          ref={shadowTopRef}
          className={`${styles.shadow} ${styles['shadow--top']}`}
        ></div>
        <div
          ref={shadowBottomRef}
          style={{ opacity: scroll ? 1 : 0 }}
          className={`${styles.shadow} ${styles['shadow--bottom']}`}
        ></div>
        <div ref={railRef} className={styles.rail}>
          {props.queriesByCategory.length !== 0 &&
            props.queriesByCategory.map((category) => (
              <ExpenseCard
                key={category.id}
                title={category.title}
                sum={category.sum}
                trend={category.trend ? category.trend : undefined}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseRail;
