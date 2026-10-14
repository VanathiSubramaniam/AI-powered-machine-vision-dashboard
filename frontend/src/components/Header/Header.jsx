import React, { useState, useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import {
  FiSun,
  FiMoon,
  FiBell,
  FiSearch,
  FiClock,
  FiCalendar,
  FiRefreshCw,
  FiMenu
} from 'react-icons/fi';

const Header = () => {
  const {
    theme,
    toggleTheme,
    alerts,
    activeAlertCount,
    searchQuery,
    setSearchQuery,
    isLiveRefreshing,
    setIsLiveRefreshing,
    refreshData,
    toggleSidebar
  } = useDashboard();

  const [time, setTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 90,
        backgroundColor: 'var(--bg-header)',
        borderBottom: '1px solid var(--border-color)',
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Title & Mobile Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={toggleSidebar}
          className="btn btn-outline btn-sm mobile-menu-btn"
          style={{ padding: '0.4rem 0.6rem', display: 'none' }}
          title="Toggle Navigation Menu"
        >
          <FiMenu style={{ fontSize: '1.2rem' }} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
            Assembly Line Performance Dashboard
          </h1>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span className="status-led running" /> Real-Time Monitoring & Bottleneck Identification
          </p>
        </div>
      </div>

      {/* Right Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Search Bar */}
        <div style={{ position: 'relative' }}>
          <FiSearch
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
            }}
          />
          <input
            type="text"
            placeholder="Search stations, alerts, logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '0.45rem 0.85rem 0.45rem 2.25rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              outline: 'none',
              width: '220px',
              transition: 'var(--transition)',
            }}
          />
        </div>

        {/* Live Date & Clock Card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.4rem 0.85rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            fontSize: '0.8rem',
            fontWeight: 500,
            color: 'var(--text-secondary)',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <FiCalendar style={{ color: 'var(--primary)' }} /> {formattedDate}
          </span>
          <span style={{ width: '1px', height: '14px', backgroundColor: 'var(--border-color)' }} />
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, color: 'var(--text-primary)' }}>
            <FiClock style={{ color: 'var(--primary)' }} /> {formattedTime}
          </span>
        </div>

        {/* Refresh button */}
        <button
          onClick={() => {
            refreshData();
            setIsLiveRefreshing(!isLiveRefreshing);
          }}
          title={isLiveRefreshing ? 'Auto-refresh active (Every 5s)' : 'Click to refresh'}
          className="btn btn-outline btn-sm"
          style={{
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            padding: 0,
            justifyContent: 'center',
            color: isLiveRefreshing ? 'var(--primary)' : 'var(--text-muted)',
          }}
        >
          <FiRefreshCw style={{ animation: isLiveRefreshing ? 'spin 10s linear infinite' : 'none' }} />
        </button>

        {/* Notification Bell Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="btn btn-outline btn-sm"
            style={{
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              padding: 0,
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <FiBell style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }} />
            {activeAlertCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {activeAlertCount}
              </span>
            )}
          </button>

          {/* Notifications Modal Dropdown */}
          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '45px',
                width: '320px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                padding: '1rem',
                zIndex: 200,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>Active Line Notifications</h4>
                <span className="badge badge-danger">{activeAlertCount} Critical</span>
              </div>
              <div style={{ maxHeight: '240px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {alerts.length === 0 ? (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>No active alerts</p>
                ) : (
                  alerts.slice(0, 4).map((a) => (
                    <div
                      key={a.id}
                      style={{
                        padding: '0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--bg-primary)',
                        borderLeft: `3px solid ${a.severity === 'Critical' ? '#ef4444' : '#f59e0b'}`,
                        fontSize: '0.775rem',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                        <span>{a.station}</span>
                        <span style={{ color: 'var(--text-muted)' }}>{a.time}</span>
                      </div>
                      <p style={{ color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{a.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-outline btn-sm"
          style={{
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            padding: 0,
            justifyContent: 'center',
          }}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? <FiMoon style={{ fontSize: '1.05rem', color: '#1e293b' }} /> : <FiSun style={{ fontSize: '1.05rem', color: '#f59e0b' }} />}
        </button>

        {/* User Profile Thumbnail */}
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
          alt="User Avatar"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            objectFit: 'cover',
            cursor: 'pointer',
            border: '2px solid var(--primary)',
          }}
        />
      </div>
    </header>
  );
};

export default Header;
