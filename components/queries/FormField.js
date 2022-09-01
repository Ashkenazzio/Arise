import styles from './FormField.module.css';

import Input from '@/ui/Input';

const FormField = (props) => {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor=''>
        {props.title}
      </label>
      <Input type={props.type} />
      <span className={styles.info}>{props.info}</span>
    </div>
  );
};

export default FormField;
