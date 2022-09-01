import styles from './QueryForm.module.css';
import FormField from './FormField';
import Button from '@/ui/Button';
import ButtonAlt from '@/ui/ButtonAlt';

const QueryForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles['top-bar']}>
        <h1 className={styles.title}>Queries</h1>
      </div>

      <div className={styles.view}>
        <h2 className={styles.heading}>Add a Query</h2>
        <form className={styles.form}>
          <FormField
            title='Expense/Income'
            type='select'
            info='Choose to add an expense or income query.'
          />

          <FormField
            title='Sum'
            type='number'
            info='Add the cost or gain in numbers.'
          />

          <FormField
            title='Date'
            type='date'
            info='Pick a date.'
          />

          <FormField
            title='Category'
            type='select'
            info='Choose or create a category.'
          />

          <FormField
            title='Notes'
            type='text'
            info='Add additional information.'
          />
          <div className={styles.actions}>
            <ButtonAlt>Clear</ButtonAlt>
            <Button>Add</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QueryForm;
