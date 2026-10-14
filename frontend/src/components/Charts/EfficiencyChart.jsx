import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useDashboard } from '../../context/DashboardContext';
import { FiActivity } from 'react-icons/fi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const EfficiencyChart = () => {
  const { telemetry, theme } = useDashboard();

  const chartData = telemetry?.charts?.efficiencyTrend || {
    labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    datasets: [{ label: 'Efficiency (%)', data: [75, 78, 82, 80, 85, 84, 88] }]
  };

  const isDark = theme === 'dark';
  const textColor = isDark ? '#cbd5e1' : '#475569';
  const gridColor = isDark ? '#1e293b' : '#e2e8f0';

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Line OEE Efficiency (%)',
        data: chartData.datasets[0]?.data || [],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.12)',
        fill: true,
        tension: 0.3,
        borderWidth: 3,
        pointRadius: 4,
        pointBackgroundColor: '#10b981',
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: textColor, font: { family: 'Inter', size: 12 } },
      },
    },
    scales: {
      x: { grid: { color: gridColor }, ticks: { color: textColor } },
      y: { grid: { color: gridColor }, ticks: { color: textColor }, min: 50, max: 100 },
    },
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <FiActivity style={{ color: '#10b981' }} /> Line OEE Efficiency Trend
        </h3>
        <span className="badge badge-success">Target &gt; 80%</span>
      </div>
      <div style={{ height: '260px', width: '100%' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default EfficiencyChart;
