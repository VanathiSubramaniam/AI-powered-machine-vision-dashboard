import React from 'react';

const Badge = ({ variant = 'secondary', children, className = '' }) => {
  const getVariantClass = () => {
    switch (variant.toLowerCase()) {
      case 'running':
      case 'good':
      case 'success':
      case 'optimal':
        return 'badge-success';
      case 'warning':
        return 'badge-warning';
      case 'bottleneck':
      case 'danger':
      case 'critical':
      case 'stopped':
        return 'badge-danger';
      case 'idle':
      case 'info':
        return 'badge-info';
      case 'maintenance':
      case 'purple':
        return 'badge-purple';
      default:
        return 'badge-secondary';
    }
  };

  return <span className={`badge ${getVariantClass()} ${className}`}>{children}</span>;
};

export default Badge;
