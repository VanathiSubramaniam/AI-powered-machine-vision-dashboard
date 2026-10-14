import React, { useState } from 'react';
import ProductionChart from '../components/Charts/ProductionChart';
import EfficiencyChart from '../components/Charts/EfficiencyChart';
import StationWaitChart from '../components/Charts/StationWaitChart';
import AlertSummaryChart from '../components/Charts/AlertSummaryChart';
import { FiLayers } from 'react-icons/fi';
import Badge from '../components/Common/Badge';

const Analytics = () => {
  const [timeframe, setTimeframe] = useState('daily'); // 'daily', 'weekly', 'monthly'

  const machineComparison = [
    { name: 'Station 1 - Stamping', oee: 94, totalOutput: 2100, downtime: '20m', bottlenecks: 1 },
    { name: 'Station 2 - Welding', oee: 89, totalOutput: 1950, downtime: '45m', bottlenecks: 2 },
    { name: 'Station 3 - Assembly', oee: 76, totalOutput: 1720, downtime: '1h 10m', bottlenecks: 5 },
    { name: 'Station 4 - Quality Inspection', oee: 62, totalOutput: 1480, downtime: '2h 15m', bottlenecks: 14 },
    { name: 'Station 5 - Packaging', oee: 95, totalOutput: 1480, downtime: '15m', bottlenecks: 0 },
    { name: 'Station 6 - Dispatch', oee: 91, totalOutput: 1450, downtime: '30m', bottlenecks: 1 }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Manufacturing Analytics & OEE Intelligence
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Deep-dive historical throughput, downtime breakdown, and station ranking
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['daily', 'weekly', 'monthly'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`btn btn-sm ${timeframe === t ? 'btn-primary' : 'btn-outline'}`}
              style={{ textTransform: 'capitalize' }}
            >
              {t} Analytics
            </button>
          ))}
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="dashboard-charts-grid">
        <ProductionChart />
        <EfficiencyChart />
      </div>

      {/* Top Bottleneck Ranking & Machine Comparison Table */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header">
          <h3 className="card-title">
            <FiLayers style={{ color: 'var(--primary)' }} /> Machine Performance & Bottleneck Ranking ({timeframe})
          </h3>
          <Badge variant="purple">Ranked by OEE Friction</Badge>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Station Name</th>
                <th>OEE Efficiency</th>
                <th>Total Production</th>
                <th>Accumulated Downtime</th>
                <th>Bottleneck Incidents</th>
                <th>Performance Status</th>
              </tr>
            </thead>
            <tbody>
              {machineComparison.map((m, idx) => (
                <tr key={m.name}>
                  <td style={{ fontWeight: 600 }}>{m.name}</td>
                  <td style={{ fontWeight: 700, color: m.oee >= 85 ? '#10b981' : m.oee >= 70 ? '#f59e0b' : '#ef4444' }}>
                    {m.oee}%
                  </td>
                  <td>{m.totalOutput} units</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{m.downtime}</td>
                  <td>
                    <Badge variant={m.bottlenecks > 4 ? 'danger' : m.bottlenecks > 1 ? 'warning' : 'success'}>
                      {m.bottlenecks} Bottlenecks
                    </Badge>
                  </td>
                  <td>
                    {idx === 3 ? (
                      <span className="badge badge-danger">Primary Bottleneck #1</span>
                    ) : m.oee >= 85 ? (
                      <span className="badge badge-success">High Efficiency</span>
                    ) : (
                      <span className="badge badge-secondary">Moderate</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="dashboard-charts-grid">
        <StationWaitChart />
        <AlertSummaryChart />
      </div>
    </div>
  );
};

export default Analytics;
