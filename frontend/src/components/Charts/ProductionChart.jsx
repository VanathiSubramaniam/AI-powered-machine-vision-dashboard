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
import { FiTrendingUp } from 'react-icons/fi';

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

const ProductionChart = () => {
  const { telemetry, theme } = useDashboard();

  const chartData = telemetry?.charts?.productionTrend || {
    labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    datasets: [
      { label: 'Actual Units', data: [210, 235, 250, 240, 270, 284, 290], color: '#2563eb' },
      { label: 'Target Units', data: [250, 250, 250, 250, 250, 250, 250], color: '#94a3b8' }
    ]
  };

  const isDark = theme === 'dark';
  const textColor = isDark ? '#cbd5e1' : '#475569';
  const gridColor = isDark ? '#1e293b' : '#e2e8f0';

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Actual Production (Units)',
        data: chartData.datasets[0]?.data || [],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.12)',
        fill: true,
        tension: 0.35,
        borderWidth: 3,
        pointRadius: 4,
        pointBackgroundColor: '#2563eb',
      },
      {
        label: 'Nominal Target (250 Units)',
        data: chartData.datasets[1]?.data || [],
        borderColor: '#94a3b8',
        borderDash: [5, 5],
        borderWidth: 2,
        fill: false,
        pointRadius: 0,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: textColor, font: { family: 'Inter', size: 12, weight: '500' } },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { color: textColor },
      },
      y: {
        grid: { color: gridColor },
        ticks: { color: textColor },
        suggestedMin: 150,
      },
    },
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <FiTrendingUp style={{ color: 'var(--primary)' }} /> Live Assembly Line Throughput Trend
        </h3>
        <span className="badge badge-info">Auto-updates every 5s</span>
      </div>
      <div style={{ height: '260px', width: '100%' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ProductionChart;
