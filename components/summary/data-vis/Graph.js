import styles from './Graph.module.css';

import 'chart.js/auto';
import { Pie, Bar } from 'react-chartjs-2';
import Select from '@/ui/Select';
import Category from './Category';
import { useState } from 'react';

const Graph = (props) => {
  const chartOpts = [
    { key: 'c1', name: 'Pie Chart', value: 'pie' },
    { key: 'c2', name: 'Bar Chart', value: 'bar' },
  ];

  const [chartType, setChartType] = useState('pie');

  const chartDataObj = {
    labels: props.expensesByCategory.map((item) => {
      return item.title;
    }),
    datasets: [
      {
        label: 'Expenses',
        data: props.expensesByCategory.map((item) => {
          return item.sum.toFixed();
        }),
        backgroundColor: [
          '#97BFFF',
          '#E4736A',
          '#A1E87D',
          '#F7B941',
          '#9A88D8',
          '#E89AEA',
          '#E986AC',
        ],
      },
    ],
  };

  const chartOptsObj = {
    title: {
      display: true,
      text: 'Expense by Category',
      fontSize: 25,
    },
    legend: {
      display: false,
      position: 'right',
      labels: {
        fontColor: '#000',
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Select
          // className={`${styles.label} icon-before`}

          style={{ width: 'auto' }}
          options={chartOpts}
          state={[chartType, setChartType]}
        />

        {/* <div className={styles['rail-container']}>
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
        </div> */}
      </div>
      <div className={styles.chart}>
        {chartType === 'pie' && (
          <Pie data={chartDataObj} options={chartOptsObj} />
        )}
        {chartType === 'bar' && (
          <Bar data={chartDataObj} options={chartOptsObj} />
        )}
      </div>
    </div>
  );
};

export default Graph;
