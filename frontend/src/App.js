import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardProvider } from './context/DashboardContext';
import DashboardLayout from './layouts/DashboardLayout';

import Dashboard from './pages/Dashboard';
import LiveFeed from './pages/LiveFeed';
import Stations from './pages/Stations';
import Alerts from './pages/Alerts';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Users from './pages/Users';

import './styles/index.css';

function App() {
  return (
    <DashboardProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="live-feed" element={<LiveFeed />} />
            <Route path="stations" element={<Stations />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="users" element={<Users />} />
            <Route path="*" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DashboardProvider>
  );
}

export default App;