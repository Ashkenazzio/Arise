import { Tooltip } from 'chart.js';

Tooltip.positioners.myCustomPositioner = function (elements, eventPosition) {
  const { x, y } = eventPosition;

  return {
    x: x,
    y: y,
  };
};

export const doughnutOptsObj = {
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { top: 16, bottom: 16, left: 16, right: 16 } },
  hoverOffset: 16,
  plugins: {
    tooltip: { position: 'myCustomPositioner' },
    datalabels: {
      formatter: (value, dnct1) => {
        let sum = 0;
        let dataArr = dnct1.chart.data.datasets[0].data;
        dataArr.map((data) => {
          sum += Number(data);
        });

        let percentage = ((value * 100) / sum).toFixed() + '%';
        return percentage;
      },
      color: ['#fbfcfd'],
      font: { weight: 'bold' },
    },
    deferred: {
      delay: 800,
    },
  },
};

export const barOptsObj = {
  responsive: true,
  maintainAspectRatio: false,
  borderRadius: function (context) {
    if (context.chart.width > 500) {
      return 8;
    }
    return 4;
  },
  scales: {
    yAxes: { beginAtZero: true },
  },
  plugins: {
    datalabels: {
      formatter: (value, dnct1) => {
        let sum = 0;
        let dataArr = dnct1.chart.data.datasets[0].data;
        dataArr.map((data) => {
          sum += Number(data);
        });

        let percentage = ((value * 100) / sum).toFixed() + '%';
        return percentage;
      },
      color: ['#fbfcfd'],
      font: { weight: 'bold' },
    },
  },
};
