import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useDashboard } from '../../context/DashboardContext';
import { FiClock } from 'react-icons/fi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StationWaitChart = () => {
  const { telemetry, theme } = useDashboard();

  const chartData = telemetry?.charts?.waitingTime || {
    labels: ['Station 1', 'Station 2', 'Station 3', 'Station 4', 'Station 5', 'Station 6'],
    data: [2.1, 3.5, 8.2, 18.6, 1.2, 0.5]
  };

  const isDark = theme === 'dark';
  const textColor = isDark ? '#cbd5e1' : '#475569';
  const gridColor = isDark ? '#1e293b' : '#e2e8f0';

  const backgroundColors = chartData.data.map(val => (val > 15 ? '#ef4444' : val > 5 ? '#f59e0b' : '#2563eb'));

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Workpiece Queue Buffer Delay (Mins)',
        data: chartData.data,
        backgroundColor: backgroundColors,
        borderRadius: 6,
        borderWidth: 0,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: textColor, font: { family: 'Inter', size: 12 } } },
    },
    scales: {
      x: { grid: { color: gridColor }, ticks: { color: textColor } },
      y: { grid: { color: gridColor }, ticks: { color: textColor } },
    },
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <FiClock style={{ color: 'var(--warning)' }} /> Average Waiting Time by Station
        </h3>
        <span className="badge badge-warning">Station 4 High Buffer</span>
      </div>
      <div style={{ height: '260px', width: '100%' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default StationWaitChart;
