import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useDashboard } from '../../context/DashboardContext';
import {
  FiTrendingUp,
  FiBox,
  FiActivity,
  FiClock,
  FiAlertOctagon,
  FiArrowUpRight
} from 'react-icons/fi';

const KpiCards = () => {
  const { telemetry, activeAlertCount } = useDashboard();
  const navigate = useNavigate();

  const data = telemetry?.dashboard || {
    production: 284,
    todaysProduction: 1850,
    percentageIncrease: 12.4,
    efficiency: 84,
    downtime: '1h 45m',
  };

  const efficiencyColor = data.efficiency >= 80 ? '#10b981' : data.efficiency >= 60 ? '#f59e0b' : '#ef4444';

  return (
    <div className="dashboard-grid-top">
      {/* 1. Total Output Card */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '0.775rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Total Output
            </span>
            <h3 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
              {data.production} <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>units/hr</span>
            </h3>
          </div>
          <div
            style={{
              padding: '0.6rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              fontSize: '1.3rem',
            }}
          >
            <FiBox />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
            Today: <strong style={{ color: 'var(--text-primary)' }}>{data.todaysProduction || 1850}</strong>
          </span>
          <span className="badge badge-success" style={{ gap: '0.15rem' }}>
            <FiTrendingUp /> +{data.percentageIncrease || 12.4}%
          </span>
        </div>
      </div>

      {/* 2. Line Efficiency Card */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: '0.775rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Line Efficiency
          </span>
          <h3 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
            {data.efficiency}%
          </h3>
          <span
            className={`badge ${data.efficiency >= 80 ? 'badge-success' : 'badge-warning'}`}
            style={{ marginTop: '0.25rem' }}
          >
            <FiActivity /> {data.efficiency >= 80 ? 'Optimal Performance' : 'Sub-Optimal'}
          </span>
        </div>

        <div style={{ width: '64px', height: '64px' }}>
          <CircularProgressbar
            value={data.efficiency}
            text={`${data.efficiency}%`}
            styles={buildStyles({
              textSize: '24px',
              pathColor: efficiencyColor,
              textColor: 'var(--text-primary)',
              trailColor: 'var(--border-color)',
              strokeLinecap: 'round',
            })}
          />
        </div>
      </div>

      {/* 3. Downtime Card */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '0.775rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Downtime Today
            </span>
            <h3 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
              {data.downtime}
            </h3>
          </div>
          <div
            style={{
              padding: '0.6rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--warning-light)',
              color: 'var(--warning)',
              fontSize: '1.3rem',
            }}
          >
            <FiClock />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
            Target: <strong>&lt; 2h 00m</strong>
          </span>
          <span className="badge badge-info">
            Trend: Steady
          </span>
        </div>
      </div>

      {/* 4. Active Alerts Card */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '0.775rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Active Bottlenecks & Alerts
            </span>
            <h3 style={{ fontSize: '1.85rem', fontWeight: 800, color: activeAlertCount > 0 ? '#ef4444' : 'var(--text-primary)', margin: '0.2rem 0' }}>
              {activeAlertCount} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>critical</span>
            </h3>
          </div>
          <div
            style={{
              padding: '0.6rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--danger-light)',
              color: 'var(--danger)',
              fontSize: '1.3rem',
            }}
          >
            <FiAlertOctagon />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
          <button
            onClick={() => navigate('/alerts')}
            className="btn btn-outline btn-sm"
            style={{ width: '100%', justifyContent: 'center', color: 'var(--primary)' }}
          >
            View All Alerts <FiArrowUpRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default KpiCards;
