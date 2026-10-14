import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useDashboard } from '../../context/DashboardContext';
import { FiPieChart } from 'react-icons/fi';

ChartJS.register(ArcElement, Tooltip, Legend);

const AlertSummaryChart = () => {
  const { telemetry, theme } = useDashboard();

  const chartData = telemetry?.charts?.alertDistribution || {
    labels: ['Critical', 'Warning', 'Info'],
    data: [2, 5, 8],
    colors: ['#ef4444', '#f59e0b', '#06b6d4']
  };

  const isDark = theme === 'dark';
  const textColor = isDark ? '#cbd5e1' : '#475569';

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.data,
        backgroundColor: chartData.colors,
        borderWidth: 2,
        borderColor: isDark ? '#111827' : '#ffffff',
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right', labels: { color: textColor, font: { family: 'Inter', size: 12 } } },
    },
    cutout: '70%',
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <FiPieChart style={{ color: 'var(--purple)' }} /> Alert Severity Breakdown
        </h3>
        <span className="badge badge-purple">Shift Log</span>
      </div>
      <div style={{ height: '260px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default AlertSummaryChart;
