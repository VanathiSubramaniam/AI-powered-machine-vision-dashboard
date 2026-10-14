import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDashboard } from '../../context/DashboardContext';
import {
  FiGrid,
  FiTv,
  FiLayers,
  FiAlertTriangle,
  FiBarChart2,
  FiFileText,
  FiSettings,
  FiUsers,
  FiCpu,
  FiUserCheck
} from 'react-icons/fi';

const Sidebar = () => {
  const { activeAlertCount, isSidebarOpen, toggleSidebar } = useDashboard();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: FiGrid },
    { path: '/live-feed', label: 'Live Feed', icon: FiTv },
    { path: '/stations', label: 'Stations', icon: FiLayers },
    { path: '/alerts', label: 'Alerts', icon: FiAlertTriangle, badge: activeAlertCount },
    { path: '/analytics', label: 'Analytics', icon: FiBarChart2 },
    { path: '/reports', label: 'Reports', icon: FiFileText },
    { path: '/settings', label: 'Settings', icon: FiSettings },
    { path: '/users', label: 'Users', icon: FiUsers },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="sidebar-backdrop"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            zIndex: 99,
          }}
        />
      )}
      <aside
        className={`app-sidebar ${isSidebarOpen ? 'open' : ''}`}
        style={{
          width: '260px',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: 'var(--bg-sidebar)',
          color: 'var(--text-sidebar)',
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid var(--border-sidebar)',
          zIndex: 100,
          boxShadow: 'var(--shadow-lg)',
          transition: 'transform 0.3s ease',
        }}
      >
      {/* Brand Header */}
      <div
        style={{
          padding: '1.5rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          borderBottom: '1px solid var(--border-sidebar)',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '1.4rem',
            boxShadow: '0 0 12px rgba(37, 99, 235, 0.5)',
          }}
        >
          <FiCpu />
        </div>
        <div>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
            AURA VISION
          </h2>
          <p style={{ fontSize: '0.725rem', color: '#94a3b8', fontWeight: 500 }}>
            Industry 4.0 AI Dashboard
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '1.25rem 0.85rem', overflowY: 'auto' }}>
        <p
          style={{
            fontSize: '0.675rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#64748b',
            marginBottom: '0.75rem',
            paddingLeft: '0.5rem',
          }}
        >
          Navigation
        </p>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    color: isActive ? '#ffffff' : '#94a3b8',
                    backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                    textDecoration: 'none',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.875rem',
                    transition: 'all 0.2s ease',
                  })}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Icon style={{ fontSize: '1.1rem' }} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge > 0 && (
                    <span
                      style={{
                        backgroundColor: '#ef4444',
                        color: '#ffffff',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '9999px',
                        boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Admin Profile Footer */}
      <div
        style={{
          padding: '1rem 1.25rem',
          borderTop: '1px solid var(--border-sidebar)',
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Admin Avatar"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--primary)',
              }}
            />
            <span
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                border: '2px solid var(--bg-sidebar)',
              }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Dr. Aris Thorne
            </p>
            <p style={{ fontSize: '0.725rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <FiUserCheck style={{ color: '#10b981' }} /> Chief Plant Engineer
            </p>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
