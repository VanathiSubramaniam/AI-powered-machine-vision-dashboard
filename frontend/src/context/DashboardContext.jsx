import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchDashboardData, acknowledgeAlertApi, deleteAlertApi } from '../services/api';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('app-theme') || 'light');
  const [telemetry, setTelemetry] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiveRefreshing, setIsLiveRefreshing] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  // Apply theme class to document body
  useEffect(() => {
    localStorage.setItem('app-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const loadData = useCallback(async () => {
    try {
      const data = await fetchDashboardData();
      setTelemetry(data);
      if (data.alerts) {
        setAlerts(data.alerts);
      }
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error('Failed to sync telemetry:', err);
      setError('Unable to fetch live assembly line telemetry.');
    } finally {
      setLoading(false);
    }
  }, []);

  // 5-second polling loop
  useEffect(() => {
    loadData();
    if (!isLiveRefreshing) return;

    const interval = setInterval(() => {
      loadData();
    }, 5000);

    return () => clearInterval(interval);
  }, [loadData, isLiveRefreshing]);

  /** Acknowledge alert – persists to SQLite via API */
  const acknowledgeAlert = async (id) => {
    await acknowledgeAlertApi(id);
    setAlerts(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'Acknowledged' } : a))
    );
  };

  /** Delete alert – persists to SQLite via API */
  const deleteAlert = async (id) => {
    await deleteAlertApi(id);
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const activeAlertCount = alerts.filter(a => a.status === 'Active').length;

  return (
    <DashboardContext.Provider
      value={{
        theme,
        toggleTheme,
        telemetry,
        alerts,
        activeAlertCount,
        acknowledgeAlert,
        deleteAlert,
        loading,
        error,
        refreshData: loadData,
        isLiveRefreshing,
        setIsLiveRefreshing,
        searchQuery,
        setSearchQuery,
        isSidebarOpen,
        setIsSidebarOpen,
        toggleSidebar,
        lastUpdated,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
