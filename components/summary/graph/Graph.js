import { useEffect, useRef, useState } from 'react';
import 'chart.js/auto';
import { defaults } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ChartDeferred from 'chartjs-plugin-deferred';
import { barOptsObj, doughnutOptsObj } from 'lib/chartjs-options';
import { AnimatePresence, motion } from 'framer-motion';
import {
  graphContainerVars,
  railLeftArrowVars,
  railRightArrowVars,
} from 'lib/framer-variants';
import cssVar from 'lib/utilities/cssVar';

import styles from './Graph.module.css';
import Dropdown from '@/ui/Dropdown';
import Category from './Category';

const Graph = (props) => {
  const chartOpts = [
    { id: 'c1', name: 'Pie Chart', value: 'pie' },
    { id: 'c2', name: 'Bar Chart', value: 'bar' },
  ];

  const [chartType, setChartType] = useState({
    id: 'c1',
    name: 'Pie Chart',
    value: 'pie',
  });

  const chartRef = useRef(null);
  defaults.font.family = cssVar('--ff-primary');
  defaults.plugins.tooltip.position = 'nearest';
  defaults.plugins.legend.display = false;
  defaults.plugins.tooltip.displayColors = false;

  const legendClickHandler = (index) => {
    const dataVisibility = chartRef.current.getDataVisibility(index);

    if (dataVisibility) {
      sessionStorage.setItem(
        `arise_prev_${chartRef.current.data.labels[index]}`,
        chartRef.current.data.datasets[0].data[index]
      );
      chartRef.current.data.datasets[0].data[index] = null;
      chartRef.current.toggleDataVisibility(index);
      chartRef.current.update();
      return;
    }

    const value = sessionStorage.getItem(
      `arise_prev_${chartRef.current.data.labels[index]}`
    );
    chartRef.current.data.datasets[0].data[index] = value;
    chartRef.current.toggleDataVisibility(index);
    chartRef.current.update();
  };

  const chartDataObj = {
    labels: props.queriesByCategory.map((item) => {
      return item.title;
    }),
    datasets: [
      {
        label: props.list,
        data: props.queriesByCategory.map((item) => {
          return item.sum.toFixed();
        }),
        backgroundColor: [
          cssVar('--clr-chart-blue'),
          cssVar('--clr-chart-red'),
          cssVar('--clr-chart-green'),
          cssVar('--clr-chart-yellow'),
          cssVar('--clr-chart-purple'),
          cssVar('--clr-chart-pink'),
          cssVar('--clr-chart-salmon'),
        ],
        hoverBackgroundColor: [
          cssVar('--clr-chart-blue'),
          cssVar('--clr-chart-red'),
          cssVar('--clr-chart-green'),
          cssVar('--clr-chart-yellow'),
          cssVar('--clr-chart-purple'),
          cssVar('--clr-chart-pink'),
          cssVar('--clr-chart-salmon'),
        ],
        hoverBorderWidth: 0,
      },
    ],
  };

  const railRef = useRef();
  const arrowLeftRef = useRef();
  const arrowRightRef = useRef();

  useEffect(() => {
    const contentScrollWidth =
      railRef.current.scrollWidth - railRef.current.offsetWidth;

    if (contentScrollWidth < 0) {
      arrowRightRef.current.style.setProperty(
        '--graph-scroll-arrow-right-opacity',
        0
      );
    }
    railRef.current.addEventListener('scroll', (e) => {
      const currentScroll = railRef.current.scrollLeft / contentScrollWidth;

      if (currentScroll) {
        arrowLeftRef.current.style.opacity = 1;
      } else {
        arrowLeftRef.current.style.opacity = 0;
      }

      if (
        railRef.current.offsetWidth + railRef.current.scrollLeft ===
        railRef.current.scrollWidth
      ) {
        arrowRightRef.current.style.opacity = 0;
      } else {
        arrowRightRef.current.style.opacity = 1;
      }
    });
  }, []);

  return (
    <motion.div variants={graphContainerVars} className={styles.container}>
      <Dropdown
        className={styles.dropdown}
        options={chartOpts}
        state={[chartType, setChartType]}
      />
      <motion.div
        animate={{ transition: { delay: 1 } }}
        className={styles.chart}
      >
        {chartType.value === 'pie' && (
          <>
            <Doughnut
              data={chartDataObj}
              options={doughnutOptsObj}
              plugins={[ChartDataLabels, ChartDeferred]}
              ref={chartRef}
            />
          </>
        )}

        {chartType.value === 'bar' && (
          <Bar
            data={chartDataObj}
            options={barOptsObj}
            plugins={[ChartDataLabels]}
            ref={chartRef}
          />
        )}
      </motion.div>

      {chartType.value === 'pie' && (
        <motion.div className={styles['rail-container']}>
          <i
            ref={arrowLeftRef}
            className={`${styles['arrow-left']} fa-solid fa-angle-left`}
          />
          <ul ref={railRef} className={styles.rail}>
            {props.queriesByCategory.map((item, idx) => {
              let color = cssVar('--clr-body');
              if (typeof window !== 'undefined' && chartRef.current) {
                color = chartRef.current.data.datasets[0].backgroundColor[idx];
              }
              return (
                <Category
                  key={item.id}
                  label={item.title}
                  color={color}
                  index={idx}
                  onClick={legendClickHandler}
                />
              );
            })}
          </ul>
          <i
            ref={arrowRightRef}
            className={`${styles['arrow-right']} fa-solid fa-angle-right`}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Graph;
