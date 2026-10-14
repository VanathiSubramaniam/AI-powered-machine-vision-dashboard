import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import Badge from '../Common/Badge';
import Modal from '../Common/Modal';
import {
  FiClock,
  FiZap,
  FiCheckCircle,
  FiTrendingDown,
  FiAlertOctagon
} from 'react-icons/fi';

const BottleneckAlertCard = () => {
  const { telemetry } = useDashboard();
  const [showModal, setShowModal] = useState(false);
  const [isResolved, setIsResolved] = useState(false);

  const detail = telemetry?.bottleneckDetail || {
    machineName: 'Station 4 - Quality Inspection',
    severity: 'Critical',
    reason: 'Computer Vision detects queue buildup (>12 workpieces awaiting scan)',
    waitingTime: '18m 42s',
    timestamp: new Date().toLocaleTimeString(),
    recommendation: 'Increase lighting brightness or dispatch auxiliary inspector to Station 4 to decrease clearance cycle time.',
  };

  return (
    <div
      className="card"
      style={{
        borderLeft: '4px solid #ef4444',
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.04) 0%, var(--bg-card) 100%)',
      }}
    >
      <div className="card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiAlertOctagon style={{ fontSize: '1.4rem', color: '#ef4444' }} />
          <div>
            <h3 className="card-title" style={{ color: '#ef4444' }}>
              Active Primary Bottleneck
            </h3>
            <p className="card-subtitle">Identified by YOLOv8 Computer Vision Engine</p>
          </div>
        </div>
        <Badge variant={detail.severity}>{detail.severity}</Badge>
      </div>

      <div style={{ padding: '0.75rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {detail.machineName}
          </h4>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <FiClock /> {detail.timestamp}
          </span>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
          <strong>Root Cause:</strong> {detail.reason}
        </p>

        <div style={{ display: 'flex', gap: '1rem', backgroundColor: 'var(--bg-primary)', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Workpiece Buffer Queue:</span>
            <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <FiTrendingDown /> 14 Units Awaiting
            </p>
          </div>
          <div style={{ width: '1px', backgroundColor: 'var(--border-color)' }} />
          <div>
            <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Station Delay Duration:</span>
            <p style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {detail.waitingTime}
            </p>
          </div>
        </div>

        {/* AI Action Box */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary btn-sm"
            style={{ backgroundColor: '#ef4444', borderColor: '#ef4444' }}
          >
            <FiZap /> View AI Action Plan
          </button>
          <button
            onClick={() => setIsResolved(true)}
            className="btn btn-outline btn-sm"
            disabled={isResolved}
          >
            {isResolved ? <FiCheckCircle style={{ color: '#10b981' }} /> : null}
            {isResolved ? 'Dispatched Technician' : 'Dispatch Technician'}
          </button>
        </div>
      </div>

      {/* Action Plan Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="AI Bottleneck Mitigating Plan">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Badge variant="critical">Critical Anomaly</Badge>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{detail.machineName}</span>
          </div>

          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>Diagnostic Summary:</h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>
            {detail.reason}. Workpieces are entering Station 4 at 4.2 units/min but exiting at only 2.8 units/min due to delayed scan validation.
          </p>

          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--primary)' }}>
            Recommended Action:
          </h4>
          <div style={{ backgroundColor: 'var(--primary-light)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary)', marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>
              {detail.recommendation}
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <button onClick={() => setShowModal(false)} className="btn btn-outline btn-sm">Close</button>
            <button onClick={() => { setIsResolved(true); setShowModal(false); }} className="btn btn-primary btn-sm">
              Apply AI Recommendation
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BottleneckAlertCard;
