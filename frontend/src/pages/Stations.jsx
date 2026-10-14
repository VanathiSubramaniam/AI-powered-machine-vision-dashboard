import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import Badge from '../components/Common/Badge';
import Modal from '../components/Common/Modal';
import {
  FiThermometer,
  FiClock,
  FiSettings,
  FiTool
} from 'react-icons/fi';

const Stations = () => {
  const { telemetry } = useDashboard();
  const [selectedStation, setSelectedStation] = useState(null);

  const stations = telemetry?.dashboard?.stationStatus || [
    { id: 1, name: 'Station 1 - Stamping', status: 'Running', cycleTime: '12s', target: 300, current: 295, temp: 42.1, waitTime: '2.1m', oee: 94 },
    { id: 2, name: 'Station 2 - Welding', status: 'Running', cycleTime: '18s', target: 300, current: 288, temp: 58.4, waitTime: '3.5m', oee: 89 },
    { id: 3, name: 'Station 3 - Assembly', status: 'Warning', cycleTime: '24s', target: 300, current: 260, temp: 49.0, waitTime: '8.2m', oee: 76 },
    { id: 4, name: 'Station 4 - Quality Inspection', status: 'Bottleneck', cycleTime: '42s', target: 300, current: 210, temp: 39.5, waitTime: '18.6m', oee: 62 },
    { id: 5, name: 'Station 5 - Packaging', status: 'Idle', cycleTime: '10s', target: 300, current: 210, temp: 36.2, waitTime: '1.2m', oee: 95 },
    { id: 6, name: 'Station 6 - Sorting & Dispatch', status: 'Maintenance', cycleTime: '15s', target: 300, current: 200, temp: 32.0, waitTime: '0.5m', oee: 91 }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Workstation Management Console
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Individual station health, sensor telemetry, and OEE performance
          </p>
        </div>
        <Badge variant="info">{stations.length} Monitored Workstations</Badge>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {stations.map((st) => (
          <div key={st.id} className="card" style={{ borderTop: `4px solid ${st.status === 'Bottleneck' ? '#ef4444' : st.status === 'Warning' ? '#f59e0b' : '#10b981'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {st.name}
              </h3>
              <Badge variant={st.status}>{st.status}</Badge>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', backgroundColor: 'var(--bg-primary)', padding: '0.85rem', borderRadius: 'var(--radius-md)', margin: '0.85rem 0', fontSize: '0.825rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>OEE Efficiency:</span>
                <p style={{ fontSize: '1.1rem', fontWeight: 700, color: st.oee >= 80 ? '#10b981' : '#ef4444' }}>
                  {st.oee || 84}%
                </p>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Production Count:</span>
                <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {st.current} / {st.target}
                </p>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Avg Waiting Time:</span>
                <p style={{ fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <FiClock style={{ color: 'var(--primary)' }} /> {st.waitTime || '2.1m'}
                </p>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Sensor Temperature:</span>
                <p style={{ fontWeight: 600, color: st.temp > 55 ? '#ef4444' : 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <FiThermometer style={{ color: st.temp > 55 ? '#ef4444' : 'var(--info)' }} /> {st.temp}°C
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button onClick={() => setSelectedStation(st)} className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                <FiSettings /> Sensor Config
              </button>
              <button onClick={() => alert(`Maintenance log logged for ${st.name}`)} className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                <FiTool /> Maintenance Log
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Station Modal */}
      {selectedStation && (
        <Modal isOpen={!!selectedStation} onClose={() => setSelectedStation(null)} title={`Config & Metrics - ${selectedStation.name}`}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span>Status: <Badge variant={selectedStation.status}>{selectedStation.status}</Badge></span>
              <span>Camera Feed ID: <strong>CAM-0{selectedStation.id}</strong></span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              YOLOv8 vision inference confidence threshold is set to <strong>0.85</strong>. Bounding boxes are calibrated for target object dimensions (600x400px).
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button onClick={() => setSelectedStation(null)} className="btn btn-outline btn-sm">Close</button>
              <button onClick={() => { alert('Camera calibrated!'); setSelectedStation(null); }} className="btn btn-primary btn-sm">
                Recalibrate Camera
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Stations;
