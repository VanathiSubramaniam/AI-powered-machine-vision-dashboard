import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import Badge from '../components/Common/Badge';
import Modal from '../components/Common/Modal';
import {
  FiSearch,
  FiFilter,
  FiCheckCircle,
  FiTrash2,
  FiEye
} from 'react-icons/fi';

const Alerts = () => {
  const { alerts, acknowledgeAlert, deleteAlert } = useDashboard();
  const [severityFilter, setSeverityFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModalAlert, setActiveModalAlert] = useState(null);

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity = severityFilter === 'All' || alert.severity === severityFilter;
    const matchesSearch =
      alert.station.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Real-Time Bottleneck & Alert Center
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            System event log, computer vision alerts, and severity tracking
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <FiSearch style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search alert ID, station, or anomaly description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.85rem 0.5rem 2.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Severity Filters */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <FiFilter /> Filter:
            </span>
            {['All', 'Critical', 'Warning', 'Info'].map((sev) => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`btn btn-sm ${severityFilter === sev ? 'btn-primary' : 'btn-outline'}`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts Data Grid */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Alert ID</th>
              <th>Station</th>
              <th>Severity</th>
              <th>Message</th>
              <th>Timestamp</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No active alerts matching filter.
                </td>
              </tr>
            ) : (
              filteredAlerts.map((a) => (
                <tr key={a.id}>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{a.id}</td>
                  <td style={{ fontWeight: 600 }}>{a.station}</td>
                  <td>
                    <Badge variant={a.severity}>{a.severity}</Badge>
                  </td>
                  <td>{a.message}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{a.time}</td>
                  <td>
                    <span
                      style={{
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.725rem',
                        fontWeight: 600,
                        backgroundColor: a.status === 'Active' ? 'var(--danger-light)' : a.status === 'Acknowledged' ? 'var(--warning-light)' : 'var(--success-light)',
                        color: a.status === 'Active' ? '#b91c1c' : a.status === 'Acknowledged' ? '#b45309' : '#047857',
                      }}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => setActiveModalAlert(a)}
                        className="btn btn-outline btn-sm"
                        title="View Details"
                        style={{ padding: '0.25rem 0.5rem' }}
                      >
                        <FiEye />
                      </button>
                      {a.status === 'Active' && (
                        <button
                          onClick={() => acknowledgeAlert(a.id)}
                          className="btn btn-outline btn-sm"
                          title="Acknowledge Alert"
                          style={{ padding: '0.25rem 0.5rem', color: '#f59e0b' }}
                        >
                          <FiCheckCircle />
                        </button>
                      )}
                      <button
                        onClick={() => deleteAlert(a.id)}
                        className="btn btn-outline btn-sm"
                        title="Delete Alert"
                        style={{ padding: '0.25rem 0.5rem', color: '#ef4444' }}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Alert Detail Modal */}
      {activeModalAlert && (
        <Modal isOpen={!!activeModalAlert} onClose={() => setActiveModalAlert(null)} title={`Alert Diagnostics - ${activeModalAlert.id}`}>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <Badge variant={activeModalAlert.severity}>{activeModalAlert.severity}</Badge>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{activeModalAlert.station}</span>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.5 }}>
              {activeModalAlert.message}
            </p>

            <div style={{ backgroundColor: 'var(--bg-primary)', padding: '0.85rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              <p>Trigger Time: <strong>{activeModalAlert.time}</strong></p>
              <p>Current Lifecycle Status: <strong>{activeModalAlert.status}</strong></p>
              <p>Detection Source: <strong>YOLOv8 Machine Vision Model</strong></p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button onClick={() => setActiveModalAlert(null)} className="btn btn-outline btn-sm">Close</button>
              {activeModalAlert.status === 'Active' && (
                <button
                  onClick={() => { acknowledgeAlert(activeModalAlert.id); setActiveModalAlert(null); }}
                  className="btn btn-primary btn-sm"
                >
                  Acknowledge & Escalate
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Alerts;
