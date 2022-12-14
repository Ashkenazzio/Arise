import styles from './FormField.module.css';
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { formFieldVars } from 'lib/framer-variants';

import Input from '@/ui/Input';
import TextArea from '@/ui/TextArea';
import Select from '@/ui/Select';
import Toggle from '@/ui/Toggle';
import Password from '@/ui/Password';
const FormField = (props, ref) => {
  return (
    <motion.div
      variants={formFieldVars}
      span={props.span === '2' ? '2' : undefined}
      className={`${styles.field} ${props.className}`}
    >
      <label className={styles.label} htmlFor={props.id}>
        {props.title}
        {props.required && <span className={styles.required}>required</span>}
      </label>
      {props.type === 'checkbox' && <Toggle {...props} ref={ref} />}
      {props.type === 'select' && <Select {...props} ref={ref} />}
      {props.type === 'textarea' && <TextArea {...props} ref={ref} />}
      {props.type === 'password' && <Password {...props} ref={ref} />}
      {props.type !== 'textarea' &&
        props.type !== 'select' &&
        props.type !== 'checkbox' &&
        props.type !== 'password' && <Input {...props} ref={ref} />}
      <span className={`${styles.info} ${props.error && styles.error}`}>
        {props.info}
      </span>
    </motion.div>
  );
};

export default forwardRef(FormField);
