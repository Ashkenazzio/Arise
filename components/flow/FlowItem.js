import { useRef } from 'react';
import styles from './FlowItem.module.css';

import FormField from '@/ui/FormField';
import Button from '@/ui/Button';
import ButtonAlt from '@/ui/ButtonAlt';
import { useCurrency } from 'context/CurrencyContext';

const FlowItem = (props) => {
  const [currency] = useCurrency();

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

  const updateHandler = (e) => {
    e.preventDefault();
    console.log('update');

    // props.onUpdateItem(queryData, enteredList);
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    console.log('delete');

    // props.onDeleteItem(queryData, enteredList);
  };

  return (
    <div
      className={`${styles.container} ${
        edit === props.id && styles.open
      } icon-before`}
      icon={props.icon}
      onClick={toggle}
    >
      <div className={styles.content}>
        {edit !== props.id && (
          <>
            <span className={styles.title}>{props.title}</span>
            <span className={styles.sum}>
              {currency}{props.sum.toLocaleString()}
            </span>
          </>
        )}
        {edit === props.id && (
          <form
            className={styles.form}
            // onSubmit={updateHandler}
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
              <ButtonAlt onClick={deleteHandler} btn='delete'>
                DELETE
              </ButtonAlt>
              <Button onClick={updateHandler}>EDIT</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FlowItem;
