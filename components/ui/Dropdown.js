import styles from './Dropdown.module.css';
import { useEffect, useRef, useState } from 'react';

const Dropdown = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = props.state;

  let dropdownRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return (
    <div
      className={`${styles.dropdown} ${!!props.error && styles.invalid} ${
        !!props.valid && styles.valid
      } ${props.className}`}
      ref={dropdownRef}
      // value={selected.value}
    >
      <div
        className={`${styles.trigger} ${
          isActive && styles.clicked
        } icon-before`}
        onClick={(e) => setIsActive(!isActive)}
      >
        {selected.name}
        {isActive && (
          <div className={styles.content}>
            {props.options.map((option) => (
              <div
                onClick={(e) => {
                  setSelected(option);
                  setIsActive(false);
                }}
                className={styles.option}
                key={option.key}
                value={option.value}
              >
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
