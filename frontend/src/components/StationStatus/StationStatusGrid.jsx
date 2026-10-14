import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import Badge from '../Common/Badge';
import { FiLayers, FiThermometer, FiClock } from 'react-icons/fi';

const StationStatusGrid = () => {
  const { telemetry } = useDashboard();

  const stations = telemetry?.dashboard?.stationStatus || [
    { id: 1, name: 'Station 1 - Stamping', status: 'Running', cycleTime: '12s', target: 300, current: 295, temp: 42.1, waitTime: 2.1 },
    { id: 2, name: 'Station 2 - Welding', status: 'Running', cycleTime: '18s', target: 300, current: 288, temp: 58.4, waitTime: 3.5 },
    { id: 3, name: 'Station 3 - Assembly', status: 'Warning', cycleTime: '24s', target: 300, current: 260, temp: 49.0, waitTime: 8.2 },
    { id: 4, name: 'Station 4 - Quality Inspection', status: 'Bottleneck', cycleTime: '42s', target: 300, current: 210, temp: 39.5, waitTime: 18.6 },
    { id: 5, name: 'Station 5 - Packaging', status: 'Idle', cycleTime: '10s', target: 300, current: 210, temp: 36.2, waitTime: 1.2 },
    { id: 6, name: 'Station 6 - Sorting & Dispatch', status: 'Maintenance', cycleTime: '15s', target: 300, current: 200, temp: 32.0, waitTime: 0.5 }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">
            <FiLayers style={{ color: 'var(--primary)' }} /> Assembly Line Station Matrix
          </h3>
          <p className="card-subtitle">Real-time status & cycle time telemetry</p>
        </div>
        <Badge variant="info">{stations.length} Active Workstations</Badge>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        {stations.map((st) => {
          const progressPct = Math.round((st.current / st.target) * 100);
          return (
            <div
              key={st.id}
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-primary)',
                border: st.status === 'Bottleneck' ? '2px solid #ef4444' : '1px solid var(--border-color)',
                boxShadow: st.status === 'Bottleneck' ? '0 0 12px rgba(239, 68, 68, 0.25)' : 'none',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className={`status-led ${st.status.toLowerCase()}`} />
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{st.name}</h4>
                </div>
                <Badge variant={st.status}>{st.status}</Badge>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', margin: '0.75rem 0', fontSize: '0.775rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Cycle Time:</span>
                  <p style={{ fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <FiClock style={{ color: 'var(--primary)' }} /> {st.cycleTime}
                  </p>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Temp:</span>
                  <p style={{ fontWeight: 600, color: st.temp > 55 ? '#ef4444' : 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <FiThermometer style={{ color: st.temp > 55 ? '#ef4444' : 'var(--info)' }} /> {st.temp}°C
                  </p>
                </div>
              </div>

              {/* Workstation Target Progress bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>
                  <span>Throughput: {st.current}/{st.target}</span>
                  <span>{progressPct}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${Math.min(progressPct, 100)}%`,
                      height: '100%',
                      backgroundColor: st.status === 'Bottleneck' ? '#ef4444' : st.status === 'Warning' ? '#f59e0b' : '#10b981',
                      borderRadius: '9999px',
                      transition: 'width 0.5s ease',
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StationStatusGrid;
