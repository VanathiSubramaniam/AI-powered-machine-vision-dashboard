import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { FiGrid, FiInfo } from 'react-icons/fi';

const HeatMap = () => {
  const { telemetry } = useDashboard();
  const [activeCell, setActiveCell] = useState(null);

  const heatmap = telemetry?.heatmap || {
    stations: ['Station 1', 'Station 2', 'Station 3', 'Station 4', 'Station 5', 'Station 6'],
    hours: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
    intensityMatrix: [
      [10, 15, 12, 20, 15, 10, 14],
      [15, 22, 18, 25, 20, 18, 16],
      [25, 35, 42, 50, 38, 30, 45],
      [85, 92, 88, 96, 90, 85, 94],
      [12, 18, 15, 22, 14, 10, 15],
      [5,  8,  10, 12,  8,  6,  9]
    ]
  };

  const getCellColor = (val) => {
    if (val >= 80) return 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
    if (val >= 50) return 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
    if (val >= 25) return 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)';
    return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">
            <FiGrid style={{ color: 'var(--primary)' }} /> Assembly Line Bottleneck Intensity Heatmap
          </h3>
          <p className="card-subtitle">Hourly workstation congestion matrix (% delay index)</p>
        </div>
        
        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: '#10b981' }} /> Normal (&lt;25%)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: '#06b6d4' }} /> Low (25-50%)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: '#f59e0b' }} /> Moderate (50-80%)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: '#ef4444' }} /> Severe (&gt;80%)
          </span>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '6px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '0.4rem', fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                Workstation
              </th>
              {heatmap.hours.map((h) => (
                <th key={h} style={{ textAlign: 'center', padding: '0.4rem', fontSize: '0.775rem', color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {heatmap.stations.map((st, rIdx) => (
              <tr key={st}>
                <td style={{ padding: '0.5rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                  {st}
                </td>
                {heatmap.hours.map((h, cIdx) => {
                  const val = heatmap.intensityMatrix[rIdx]?.[cIdx] || 10;
                  const isHovered = activeCell?.row === rIdx && activeCell?.col === cIdx;
                  return (
                    <td
                      key={h}
                      onMouseEnter={() => setActiveCell({ row: rIdx, col: cIdx, val, st, h })}
                      onMouseLeave={() => setActiveCell(null)}
                      style={{
                        padding: '0.75rem 0.5rem',
                        textAlign: 'center',
                        borderRadius: 'var(--radius-sm)',
                        background: getCellColor(val),
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        fontFamily: 'JetBrains Mono, monospace',
                        cursor: 'pointer',
                        transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.3)' : 'none',
                        position: 'relative',
                      }}
                    >
                      {val}%
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {activeCell && (
        <div style={{ marginTop: '0.75rem', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiInfo style={{ color: 'var(--primary)' }} />
          <span>
            <strong>{activeCell.st}</strong> at <strong>{activeCell.h}</strong>: Bottleneck Intensity Score = <strong>{activeCell.val}%</strong> ({activeCell.val >= 80 ? 'CRITICAL DELAY' : activeCell.val >= 50 ? 'MODERATE QUEUE' : 'OPTIMAL FLOW'}).
          </span>
        </div>
      )}
    </div>
  );
};

export default HeatMap;
