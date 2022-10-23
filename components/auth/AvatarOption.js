import styles from './AvatarOption.module.css';
import { forwardRef } from 'react';

import Image from 'next/image';

const AvatarOption = (props, ref) => {
  const { avatar, img } = props;

  return (
    <div className={styles['avatar-option']}>
      <label htmlFor={avatar}>
        <Image width='80' height='80' className={styles.badge} src={img} />
      </label>
      <input type='radio' name='avatar' ref={ref} id={avatar} value={avatar} />
    </div>
  );
};

export default forwardRef(AvatarOption);
