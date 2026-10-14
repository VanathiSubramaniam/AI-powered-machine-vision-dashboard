import React, { useState, useRef } from 'react';
import { VIDEO_STREAM_URL } from '../../services/api';
import {
  FiPlay,
  FiPause,
  FiCamera,
  FiMaximize2,
  FiRefreshCw,
  FiEye,
  FiCheckCircle,
  FiAlertCircle
} from 'react-icons/fi';

const CameraCard = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showAiOverlay, setShowAiOverlay] = useState(true);
  const [streamError, setStreamError] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleCapture = () => {
    if (!imgRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = imgRef.current.naturalWidth || 640;
    canvas.height = imgRef.current.naturalHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
    
    // Draw timestamp on captured image
    ctx.fillStyle = '#00ffcc';
    ctx.font = '16px JetBrains Mono, monospace';
    ctx.fillText(`AURA VISION AI SNAPSHOT - ${new Date().toLocaleString()}`, 20, canvas.height - 20);

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `assembly_line_snapshot_${Date.now()}.png`;
    link.click();
  };

  const toggleFullScreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullScreen(true)).catch(err => console.error(err));
    } else {
      document.exitFullscreen().then(() => setIsFullScreen(false)).catch(err => console.error(err));
    }
  };

  const handleStreamError = () => {
    setStreamError(true);
  };

  const handleReconnect = () => {
    setStreamError(false);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 200);
  };

  return (
    <div className="card" ref={containerRef} style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Header */}
      <div className="card-header">
        <div>
          <h3 className="card-title">
            <FiEye style={{ color: 'var(--primary)' }} /> Live Vision Stream - Station 4 Camera
          </h3>
          <p className="card-subtitle">YOLOv8 Real-Time Object Detection & Queue Analytics</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className={`badge ${streamError ? 'badge-danger' : 'badge-success'}`}>
            {streamError ? <FiAlertCircle /> : <FiCheckCircle />}
            {streamError ? 'Backend Stream Offline' : 'YOLOv8 Active (30 FPS)'}
          </span>
        </div>
      </div>

      {/* Video Viewport Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: isFullScreen ? 'calc(100vh - 120px)' : '440px',
          backgroundColor: '#030712',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isPlaying && !streamError ? (
          <img
            ref={imgRef}
            src={`${VIDEO_STREAM_URL}?t=${Date.now()}`}
            alt="Assembly Line MJPEG Stream"
            onError={handleStreamError}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>
            {streamError ? (
              <div>
                <FiAlertCircle style={{ fontSize: '3rem', color: '#ef4444', marginBottom: '0.75rem' }} />
                <h4 style={{ color: '#f8fafc', marginBottom: '0.5rem' }}>Live Stream Offline</h4>
                <p style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
                  Unable to connect to MJPEG stream at <code>http://127.0.0.1:5000/video</code>
                </p>
                <button onClick={handleReconnect} className="btn btn-primary btn-sm">
                  <FiRefreshCw /> Reconnect Stream
                </button>
              </div>
            ) : (
              <div>
                <FiPause style={{ fontSize: '3rem', color: '#64748b', marginBottom: '0.75rem' }} />
                <p>Stream Paused</p>
              </div>
            )}
          </div>
        )}

        {/* AI Bounding Box HUD Overlay Simulation */}
        {isPlaying && !streamError && showAiOverlay && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none',
              padding: '1rem',
            }}
          >
            {/* Target Detection Box 1 */}
            <div
              style={{
                position: 'absolute',
                top: '25%',
                left: '35%',
                width: '160px',
                height: '120px',
                border: '2px solid #ef4444',
                borderRadius: '4px',
                boxShadow: '0 0 10px rgba(239, 68, 68, 0.4)',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '-22px',
                  left: '-2px',
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  fontSize: '0.675rem',
                  fontWeight: 700,
                  padding: '0.1rem 0.4rem',
                  borderRadius: '2px',
                  fontFamily: 'monospace',
                }}
              >
                Workpiece_Buffer (Bottleneck 96%)
              </span>
            </div>

            {/* Target Detection Box 2 */}
            <div
              style={{
                position: 'absolute',
                top: '55%',
                left: '60%',
                width: '110px',
                height: '80px',
                border: '2px dashed #10b981',
                borderRadius: '4px',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '-20px',
                  left: '-2px',
                  backgroundColor: '#10b981',
                  color: '#fff',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '0.1rem 0.4rem',
                  borderRadius: '2px',
                  fontFamily: 'monospace',
                }}
              >
                Conveyor_OK 99%
              </span>
            </div>

            {/* Corner Crosshairs */}
            <div style={{ position: 'absolute', top: 15, left: 15, borderLeft: '2px solid #00ffcc', borderTop: '2px solid #00ffcc', width: 20, height: 20 }} />
            <div style={{ position: 'absolute', top: 15, right: 15, borderRight: '2px solid #00ffcc', borderTop: '2px solid #00ffcc', width: 20, height: 20 }} />
            <div style={{ position: 'absolute', bottom: 15, left: 15, borderLeft: '2px solid #00ffcc', borderBottom: '2px solid #00ffcc', width: 20, height: 20 }} />
            <div style={{ position: 'absolute', bottom: 15, right: 15, borderRight: '2px solid #00ffcc', borderBottom: '2px solid #00ffcc', width: 20, height: 20 }} />
          </div>
        )}

        {/* HUD Info Header overlay */}
        <div
          style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            color: '#f8fafc',
            padding: '0.3rem 0.65rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.725rem',
            fontFamily: 'JetBrains Mono, monospace',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span className="status-led running" /> 1920x1080 | 30 FPS | YOLOv8n
        </div>
      </div>

      {/* Control Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '1rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid var(--border-color)',
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={togglePlay} className="btn btn-outline btn-sm">
            {isPlaying ? <FiPause /> : <FiPlay />}
            {isPlaying ? 'Pause' : 'Resume'}
          </button>
          <button onClick={handleCapture} className="btn btn-outline btn-sm" disabled={!isPlaying || streamError}>
            <FiCamera /> Capture Screenshot
          </button>
          <button
            onClick={() => setShowAiOverlay(!showAiOverlay)}
            className={`btn btn-sm ${showAiOverlay ? 'btn-primary' : 'btn-outline'}`}
          >
            <FiEye /> AI Bounding HUD
          </button>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={handleReconnect} className="btn btn-outline btn-sm">
            <FiRefreshCw /> Reconnect
          </button>
          <button onClick={toggleFullScreen} className="btn btn-outline btn-sm">
            <FiMaximize2 /> Fullscreen
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraCard;
