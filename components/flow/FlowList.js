import Block from './Block';
import styles from './FlowList.module.css';

const FlowList = () => {
  const expenses = [
    {
      id: 'e1',
      title: 'burger',
      type: 'expense',
      sum: 57,
      date: '14/08/2022',
      category: 'eating_out',
      notes: 'was good',
    },
    {
      id: 'e2',
      title: 'electricity bill',
      type: 'expense',
      sum: 142.81,
      date: '15/08/2022',
      category: 'utilities',
      notes: 'thieves',
    },
  ];

  const incomes = [
    {
      id: 'i1',
      title: 'salary',
      type: 'income',
      sum: 12326,
      date: '10/08/2022',
      category: 'salary',
      notes: 'good',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles['top-bar']}>
        <h1 className={styles.title}>Flow</h1>
      </div>

      <div className={styles.view}>
        <Block
          queries={expenses}
          icon={String.fromCharCode(0xf068)}
          var={'var(--clr-error)'}
        />
        <Block
          queries={incomes}
          icon={String.fromCharCode(0x2b)}
          var={'var(--clr-success)'}
        />
      </div>
    </div>
  );
};

export default FlowList;
