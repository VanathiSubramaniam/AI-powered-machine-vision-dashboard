import React from 'react';

const Spinner = ({ size = 'md', label = 'Loading telemetry data...' }) => {
  const sizeMap = {
    sm: '16px',
    md: '32px',
    lg: '48px',
  };

  const dimension = sizeMap[size] || sizeMap.md;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div
        style={{
          width: dimension,
          height: dimension,
          border: '3px solid var(--border-color)',
          borderTop: '3px solid var(--primary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      {label && <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{label}</p>}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Spinner;
