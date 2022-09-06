import styles from './FormField.module.css';
import { forwardRef } from 'react';

import Input from '@/ui/Input';
import TextArea from '@/ui/TextArea';
import Select from '@/ui/Select';

const FormField = (props, ref) => {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor=''>
        {props.title}
      </label>
      {props.type === 'textarea' && <TextArea {...props} ref={ref} />}
      {props.type === 'select' && <Select {...props} ref={ref} />}
      {props.type !== 'textarea' && props.type !== 'select' && (
        <Input {...props} ref={ref} />
      )}
      <span className={styles.info}>{props.info}</span>
    </div>
  );
};

export default forwardRef(FormField);
