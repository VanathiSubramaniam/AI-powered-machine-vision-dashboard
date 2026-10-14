import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import { useDashboard } from '../context/DashboardContext';

const DashboardLayout = () => {
  const { theme } = useDashboard();

  return (
    <div className={`app-container ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
