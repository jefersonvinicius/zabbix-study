const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const fs = require('fs/promises');

const WIDTH = 30 * 40;
const HEIGHT = 600;

exports.plotItemGraphToImageFile = async function ({ itemData, finalFilename }) {
  const configuration = {
    type: 'bar',
    data: {
      labels: itemData.map((item) => new Date(Number(item.clock)).toISOString()),
      datasets: [
        {
          label: 'CPU Usage',
          data: itemData.map((item) => item.value),
          backgroundColor: ['rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgba(54, 162, 235, 1)'],
          borderWidth: 1,
        },
      ],
    },
    options: {},
    plugins: [
      {
        id: 'background-colour',
        beforeDraw: (chart) => {
          const ctx = chart.ctx;
          ctx.save();
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, WIDTH, HEIGHT);
          ctx.restore();
        },
      },
    ],
  };

  const chartCallback = (ChartJS) => {
    ChartJS.defaults.responsive = true;
    ChartJS.defaults.maintainAspectRadio = false;
  };
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: WIDTH, height: HEIGHT, chartCallback });
  const buffer = await chartJSNodeCanvas.renderToBuffer(configuration);
  await fs.writeFile(finalFilename, buffer);
};
