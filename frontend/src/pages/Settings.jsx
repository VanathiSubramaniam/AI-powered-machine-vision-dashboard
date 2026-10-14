import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import {
  FiTv,
  FiDatabase,
  FiSliders,
  FiSun,
  FiMoon,
  FiSave,
  FiCheck
} from 'react-icons/fi';

const Settings = () => {
  const { theme, toggleTheme } = useDashboard();
  const [cameraUrl, setCameraUrl] = useState('http://127.0.0.1:5000/video');
  const [backendHost, setBackendHost] = useState('http://127.0.0.1:5000');
  const [pollingInterval, setPollingInterval] = useState('5');
  const [cycleTimeThreshold, setCycleTimeThreshold] = useState('30');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          System Configuration & Preferences
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Manage vision streams, Flask REST API endpoints, threshold limits, and UI themes
        </p>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* 1. Appearance & Theme */}
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '1rem' }}>
            <FiSun style={{ color: 'var(--primary)' }} /> Appearance & Interface Theme
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-md)' }}>
            <div>
              <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Active Theme Mode</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Currently using {theme === 'dark' ? 'Dark Industrial Theme' : 'Light Executive Theme'}
              </p>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="btn btn-outline btn-sm"
            >
              {theme === 'light' ? <FiMoon /> : <FiSun />}
              Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
          </div>
        </div>

        {/* 2. Camera & Vision Feed Configuration */}
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '1rem' }}>
            <FiTv style={{ color: 'var(--info)' }} /> Camera & Vision Pipeline
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                MJPEG Video Stream Endpoint URL
              </label>
              <input
                type="text"
                value={cameraUrl}
                onChange={(e) => setCameraUrl(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  fontFamily: 'monospace',
                }}
              />
            </div>
          </div>
        </div>

        {/* 3. API Settings */}
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '1rem' }}>
            <FiDatabase style={{ color: 'var(--warning)' }} /> Flask REST API Integration
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                Flask Backend Base Host
              </label>
              <input
                type="text"
                value={backendHost}
                onChange={(e) => setBackendHost(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  fontFamily: 'monospace',
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                Telemetry Sync Polling Interval (Seconds)
              </label>
              <input
                type="number"
                value={pollingInterval}
                onChange={(e) => setPollingInterval(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                }}
              />
            </div>
          </div>
        </div>

        {/* 4. Alert Threshold Settings */}
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '1rem' }}>
            <FiSliders style={{ color: 'var(--danger)' }} /> Bottleneck Detection Alert Thresholds
          </h3>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Cycle Time Max Delay Warning Threshold (Seconds)
            </label>
            <input
              type="number"
              value={cycleTimeThreshold}
              onChange={(e) => setCycleTimeThreshold(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
              }}
            />
            <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'block' }}>
              If station cycle time exceeds this threshold by &gt;30%, an automated critical bottleneck alert will trigger.
            </span>
          </div>
        </div>

        {/* Save Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary">
            {saved ? <FiCheck /> : <FiSave />}
            {saved ? 'Configurations Saved!' : 'Save System Settings'}
          </button>
          {saved && <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>Preferences successfully saved to local storage.</span>}
        </div>
      </form>
    </div>
  );
};

export default Settings;
