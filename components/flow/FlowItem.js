import { useRef } from 'react';
import styles from './FlowItem.module.css';

import FormField from '@/entries/FormField';
import Button from '@/ui/Button';
import ButtonAlt from '@/ui/ButtonAlt';

const FlowItem = (props) => {
  const [edit, setEdit] = props.openState;

  const toggle = () => {
    if (edit === props.id) {
      return setEdit(null);
    }
    setEdit(props.id);
  };

  const titleRef = useRef(props.title);
  const sumRef = useRef(props.sum);
  const dateRef = useRef(props.date);
  const categoryRef = useRef(props.category);
  const notesRef = useRef(props.notes);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`${styles.container} icon-before`}
      icon={props.icon}
      onClick={toggle}
    >
      <div className={styles.content}>
        {edit !== props.id && (
          <>
            <span className={styles.title}>{props.title}</span>
            <span className={styles.sum}>₪ {props.sum.toLocaleString()}</span>
          </>
        )}
        {edit === props.id && (
          <form
            className={styles.form}
            onSubmit={submitHandler}
            onClick={(e) => e.stopPropagation()}
          >
            <FormField ref={titleRef} title='Title' type='text' />
            <FormField ref={sumRef} title='Sum' type='number' />
            <FormField ref={dateRef} title='Date' type='date' />
            <FormField
              ref={categoryRef}
              title='Category'
              // type='select'
              // options={categoryOpts}
              // state={[selectedVal, setSelectedVal]}
            />
            <FormField ref={notesRef} span='2' title='Notes' type='textarea' />

            <div className={styles.actions}>
              <ButtonAlt btn='delete'>DELETE</ButtonAlt>
              <Button>EDIT</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FlowItem;
