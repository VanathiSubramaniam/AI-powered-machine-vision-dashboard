import React, { useState } from 'react';
import CameraCard from '../components/Camera/CameraCard';
import { FiTv, FiGrid, FiVideo } from 'react-icons/fi';
import Badge from '../components/Common/Badge';

const LiveFeed = () => {
  const [gridMode, setGridMode] = useState('single'); // 'single' or 'multi'

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Live Machine Vision Feeds
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Real-time multi-camera CCTV & Object Detection Pipeline
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setGridMode('single')}
            className={`btn btn-sm ${gridMode === 'single' ? 'btn-primary' : 'btn-outline'}`}
          >
            <FiTv /> Primary Inspection Camera
          </button>
          <button
            onClick={() => setGridMode('multi')}
            className={`btn btn-sm ${gridMode === 'multi' ? 'btn-primary' : 'btn-outline'}`}
          >
            <FiGrid /> 4-Camera Matrix View
          </button>
        </div>
      </div>

      {gridMode === 'single' ? (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <CameraCard />
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '1.5rem' }}>
          <CameraCard />
          <div className="card" style={{ backgroundColor: '#030712', color: '#fff', borderRadius: 'var(--radius-lg)', minHeight: '380px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}><FiVideo /> CAM-02: Station 1 Stamping</span>
              <Badge variant="running">30 FPS</Badge>
            </div>
            <div style={{ textAlign: 'center', color: '#64748b' }}>
              <p style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>Station 1 Secondary Stream OK</p>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', justifyContent: 'space-between' }}>
              <span>Res: 1920x1080</span>
              <span>YOLO Mode: Track</span>
            </div>
          </div>

          <div className="card" style={{ backgroundColor: '#030712', color: '#fff', borderRadius: 'var(--radius-lg)', minHeight: '380px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}><FiVideo /> CAM-03: Station 3 Assembly</span>
              <Badge variant="warning">Warning Temp</Badge>
            </div>
            <div style={{ textAlign: 'center', color: '#64748b' }}>
              <p style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>Station 3 Thermal Vision Feed OK</p>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', justifyContent: 'space-between' }}>
              <span>Res: 1920x1080</span>
              <span>YOLO Mode: Heatmap</span>
            </div>
          </div>

          <div className="card" style={{ backgroundColor: '#030712', color: '#fff', borderRadius: 'var(--radius-lg)', minHeight: '380px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}><FiVideo /> CAM-04: Station 6 Packaging</span>
              <Badge variant="idle">Idle Standby</Badge>
            </div>
            <div style={{ textAlign: 'center', color: '#64748b' }}>
              <p style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>Station 6 Dispatch Camera OK</p>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', justifyContent: 'space-between' }}>
              <span>Res: 1920x1080</span>
              <span>YOLO Mode: Count</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveFeed;
