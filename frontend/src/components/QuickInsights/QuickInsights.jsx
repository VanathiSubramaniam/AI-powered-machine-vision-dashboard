import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { FiTrendingUp, FiAlertCircle, FiInfo, FiCheckCircle } from 'react-icons/fi';

const QuickInsights = () => {
  const { telemetry } = useDashboard();

  const insights = telemetry?.quickInsights || [
    { id: 1, type: 'danger', text: 'Station 4 cycle time exceeded nominal threshold by 45%. Bottleneck identified.' },
    { id: 2, type: 'warning', text: 'Station 3 temperature spiking to 58.4°C. Check cooling fluid levels.' },
    { id: 3, type: 'info', text: 'Overall line output is up +12.4% compared to yesterday shift B.' },
    { id: 4, type: 'purple', text: 'Station 6 scheduled maintenance cycle begins in 45 minutes.' }
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'danger':
        return <FiAlertCircle style={{ color: '#ef4444' }} />;
      case 'warning':
        return <FiAlertCircle style={{ color: '#f59e0b' }} />;
      case 'info':
        return <FiInfo style={{ color: '#06b6d4' }} />;
      default:
        return <FiCheckCircle style={{ color: '#8b5cf6' }} />;
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <FiTrendingUp style={{ color: 'var(--primary)' }} /> Real-Time Smart Line Insights
        </h3>
        <span className="badge badge-secondary">AI Diagnostic Engine</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {insights.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              fontSize: '0.825rem',
              color: 'var(--text-primary)',
            }}
          >
            <span style={{ fontSize: '1.1rem', marginTop: '0.1rem' }}>{getIcon(item.type)}</span>
            <span style={{ flex: 1, lineHeight: 1.4 }}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickInsights;
