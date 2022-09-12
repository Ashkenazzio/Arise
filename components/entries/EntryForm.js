import styles from './EntryForm.module.css';
import FormField from './FormField';
import Button from '@/ui/Button';
import ButtonAlt from '@/ui/ButtonAlt';

import { useRef, useState } from 'react';

const EntryForm = (props) => {
  const [categoryOpts, setCategoryOpts] = useState([
    { key: 'c0', name: 'Please choose a category...', value: '' },
    { key: 'c1', name: '🍴 Eating Out', value: 'eating-out' },
    { key: 'c2', name: '😊 Fun', value: 'fun' },
    { key: 'c3', name: '🛒 Groceries', value: 'groceries' },
    { key: 'c4', name: '📃 Insurance', value: 'insurance' },
    { key: 'c5', name: '💊 Pharma', value: 'pharma' },
    { key: 'c6', name: '🚌 Transport', value: 'transport' },
    { key: 'c7', name: '⚡ Utilities', value: 'utilities' },
    { key: 'c8', name: '♾ Misc.', value: 'miscellaneous' },
  ]);

  const [selectedVal, setSelectedVal] = useState({
    key: 'c0',
    name: '',
    value: '',
  });

  const titleRef = useRef();
  const listRef = useRef();
  const sumRef = useRef();
  const dateRef = useRef();
  const categoryRef = useRef();
  const notesRef = useRef();

  const resetHandler = (event) => {
    event.preventDefault();
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredTitle = titleRef.current.value;
    const enteredList = listRef.current.value;
    const enteredSum = sumRef.current.value;
    const enteredDate = dateRef.current.value;
    const enteredCategory = categoryRef.current.value;
    const enteredNotes = notesRef.current.value;

    const queryData = {
      title: enteredTitle,
      sum: enteredSum,
      date: enteredDate,
      category: enteredCategory,
      notes: enteredNotes,
    };

    props.onAddItem(queryData, enteredList);
  };

  return (
    <div className={styles.container}>
      <div className={styles['top-bar']}>
        <h1 className={styles.title}>Entries</h1>
      </div>

      <div className={styles.view}>
        <h2 className={styles.heading}>Add a new entry</h2>
        <form className={styles.form} onSubmit={submitHandler}>
          <FormField
            ref={titleRef}
            title='Title'
            info='Choose a title.'
            type='text'
          />

          <FormField
            ref={listRef}
            title='Expense/Income'
            info='Choose to add an expense or income.'
            type='checkbox'
          />

          <FormField
            ref={sumRef}
            title='Sum'
            info='Add the cost or gain in numbers.'
            type='number'
          />

          <FormField
            ref={dateRef}
            title='Date'
            info='Pick a date.'
            type='date'
          />

          <FormField
            ref={categoryRef}
            title='Category'
            info='Choose or create a category.'
            type='select'
            options={categoryOpts}
            state={[selectedVal, setSelectedVal]}
          />

          <FormField
            ref={notesRef}
            title='Notes'
            info='Add additional information.'
            type='textarea'
          />
          <div className={styles.actions}>
            <ButtonAlt onClick={resetHandler}>CLEAR</ButtonAlt>
            <Button onClick={submitHandler}>ADD</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntryForm;
