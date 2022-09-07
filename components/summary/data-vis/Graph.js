import styles from './Graph.module.css';

// import pie from 'assets/images/Pie-Chart.svg';
import 'chart.js/auto';
import { Pie, Bar } from 'react-chartjs-2';
import Category from './Category';

const Graph = (props) => {
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={`${styles.label} icon-before`}>Pie Chart</h3>
        <div className={styles['rail-container']}>
          <i className='fa-solid fa-angle-left' />
          <div className={styles.rail}>
            <Category color={'#F46A6A'} icon={String.fromCharCode(0xf571)}>
              Bills
            </Category>
            <Category color={'#A1E87D'} icon={String.fromCharCode(0xf291)}>
              Groseries
            </Category>
            <Category color={'#97BFFF'} icon={String.fromCharCode(0xf44b)}>
              Gym
            </Category>
            <Category color={'#F7B941'} icon={String.fromCharCode(0xf5b6)}>
              Transport
            </Category>
          </div>
          <i className='fa-solid fa-angle-right' />
        </div>
      </div>
      <div className={styles.img}>
        <Pie
          data={{
            labels: expenses.map((item) => {
              return item.category;
            }),
            datasets: [
              {
                label: 'Expenses',
                data: expenses.map((item) => {
                  return item.sum;
                }),
                backgroundColor: [
                  '#A8DBD2',
                  '#F59597',
                  '#F9A485',
                  '#BBDCAD',
                  '#CEB3D6',
                  '#F9F18C',
                  '#A5C6E9',
                ],
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
};

export default Graph;
