import styles from './Graph.module.css';

import pie from 'assets/images/Pie-Chart.svg';
import Category from './Category';

const Graph = (props) => {
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
      <img className={styles.img} src={pie.src} alt='data visualization'></img>
    </div>
  );
};

export default Graph;
