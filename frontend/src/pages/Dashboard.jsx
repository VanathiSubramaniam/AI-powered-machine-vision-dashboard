import React from 'react';
import KpiCards from '../components/Cards/KpiCards';
import CameraCard from '../components/Camera/CameraCard';
import StationStatusGrid from '../components/StationStatus/StationStatusGrid';
import BottleneckAlertCard from '../components/Alerts/BottleneckAlertCard';
import QuickInsights from '../components/QuickInsights/QuickInsights';
import HeatMap from '../components/HeatMap/HeatMap';
import ProductionChart from '../components/Charts/ProductionChart';
import EfficiencyChart from '../components/Charts/EfficiencyChart';
import StationWaitChart from '../components/Charts/StationWaitChart';
import AlertSummaryChart from '../components/Charts/AlertSummaryChart';

const Dashboard = () => {
  return (
    <div>
      {/* 1. Top KPI Row (Total Output, Efficiency, Downtime, Active Alerts) */}
      <KpiCards />

      {/* 2. Main Dashboard Split: Left Camera Stream vs Right Station Matrix & Alerts */}
      <div className="dashboard-main-grid">
        {/* Left Side: Large Camera Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <CameraCard />
          <ProductionChart />
        </div>

        {/* Right Side: Station Status, Bottleneck Alert, Insights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <BottleneckAlertCard />
          <StationStatusGrid />
          <QuickInsights />
        </div>
      </div>

      {/* 3. Interactive Bottleneck Heatmap */}
      <div style={{ marginBottom: '1.5rem' }}>
        <HeatMap />
      </div>

      {/* 4. Analytics Charts Grid */}
      <div className="dashboard-charts-grid">
        <EfficiencyChart />
        <StationWaitChart />
      </div>

      <div className="dashboard-charts-grid">
        <AlertSummaryChart />
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1.5rem', background: 'linear-gradient(135deg, var(--primary) 0%, #1d4ed8 100%)', color: '#fff' }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Industry 4.0 Autonomous Optimization Active
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#e2e8f0', marginBottom: '1rem', lineHeight: 1.6 }}>
            YOLOv8 Computer Vision model is actively parsing 30 FPS video frames to detect assembly line throughput friction before full bottleneck propagation occurs.
          </p>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.825rem', fontFamily: 'monospace' }}>
            <span>Model: YOLOv8n-seg</span>
            <span>Latency: 14.2 ms</span>
            <span>Inference: GPU CUDA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
