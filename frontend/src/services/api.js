import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 6000,
  headers: { 'Content-Type': 'application/json' },
});

// ─────────────────────────────────────────────────────────────
// Fallback data generator – used when Flask/DB is unreachable
// ─────────────────────────────────────────────────────────────
const generateFallbackData = () => {
  const timeLabels = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
  return {
    dashboard: {
      running: 5,
      stopped: 1,
      production: 284,
      todaysProduction: 1850,
      percentageIncrease: 12.4,
      bottleneck: 'Station 4 (Quality Inspection)',
      efficiency: 84,
      downtime: '1h 45m',
      alertsCount: 4,
      stationStatus: [
        { id: 1, name: 'Station 1 - Stamping',          status: 'Running',     cycle_time: '12s', target: 300, current: 295, temperature: 42.1, wait_time: 2.1,  oee: 94 },
        { id: 2, name: 'Station 2 - Welding',            status: 'Running',     cycle_time: '18s', target: 300, current: 288, temperature: 58.4, wait_time: 3.5,  oee: 89 },
        { id: 3, name: 'Station 3 - Assembly',           status: 'Warning',     cycle_time: '24s', target: 300, current: 260, temperature: 49.0, wait_time: 8.2,  oee: 76 },
        { id: 4, name: 'Station 4 - Quality Inspection', status: 'Bottleneck',  cycle_time: '42s', target: 300, current: 210, temperature: 39.5, wait_time: 18.6, oee: 62 },
        { id: 5, name: 'Station 5 - Packaging',          status: 'Idle',        cycle_time: '10s', target: 300, current: 210, temperature: 36.2, wait_time: 1.2,  oee: 95 },
        { id: 6, name: 'Station 6 - Sorting & Dispatch', status: 'Maintenance', cycle_time: '15s', target: 300, current: 200, temperature: 32.0, wait_time: 0.5,  oee: 91 },
      ],
    },
    bottleneckDetail: {
      machineName: 'Station 4 - Quality Inspection',
      severity: 'Critical',
      reason: 'Computer Vision detects queue buildup (>12 workpieces awaiting scan)',
      waitingTime: '18m 42s',
      timestamp: new Date().toLocaleTimeString(),
      recommendation:
        'Increase lighting brightness or dispatch auxiliary inspector to Station 4.',
    },
    quickInsights: [
      { id: 1, type: 'danger',  text: 'Station 4 cycle time exceeded nominal threshold by 45%. Bottleneck identified.' },
      { id: 2, type: 'warning', text: 'Station 3 temperature spiking to 58.4°C. Check cooling fluid levels.' },
      { id: 3, type: 'info',    text: 'Overall line output is up +12.4% compared to yesterday shift B.' },
      { id: 4, type: 'purple',  text: 'Station 6 scheduled maintenance cycle begins in 45 minutes.' },
    ],
    heatmap: {
      stations: ['Station 1', 'Station 2', 'Station 3', 'Station 4', 'Station 5', 'Station 6'],
      hours: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
      intensityMatrix: [
        [10, 15, 12, 20, 15, 10, 14],
        [15, 22, 18, 25, 20, 18, 16],
        [25, 35, 42, 50, 38, 30, 45],
        [85, 92, 88, 96, 90, 85, 94],
        [12, 18, 15, 22, 14, 10, 15],
        [5,  8,  10, 12,  8,  6,  9],
      ],
    },
    charts: {
      productionTrend: {
        labels: timeLabels,
        datasets: [
          { label: 'Actual Units', data: [210, 235, 250, 240, 270, 284, 290], color: '#2563eb' },
          { label: 'Target Units', data: [250, 250, 250, 250, 250, 250, 250], color: '#94a3b8' },
        ],
      },
      efficiencyTrend: {
        labels: timeLabels,
        datasets: [{ label: 'Efficiency (%)', data: [75, 78, 82, 80, 85, 84, 88], color: '#10b981' }],
      },
      downtimeTrend: {
        labels: timeLabels,
        datasets: [{ label: 'Downtime (Mins)', data: [15, 8, 22, 5, 12, 18, 10], color: '#ef4444' }],
      },
      waitingTime: {
        labels: ['Station 1', 'Station 2', 'Station 3', 'Station 4', 'Station 5', 'Station 6'],
        data:   [2.1, 3.5, 8.2, 18.6, 1.2, 0.5],
      },
      alertDistribution: {
        labels: ['Critical', 'Warning', 'Info'],
        data:   [2, 5, 8],
        colors: ['#ef4444', '#f59e0b', '#06b6d4'],
      },
    },
    alerts: [
      { id: 1, alert_code: 'ALT-101', station: 'Station 4', severity: 'Critical', message: 'YOLO detection: Severe workpiece queue overflow detected', created_at: '2 mins ago', status: 'Active' },
      { id: 2, alert_code: 'ALT-102', station: 'Station 3', severity: 'Warning',  message: 'Cycle time drift: 24s vs 15s standard',                  created_at: '14 mins ago', status: 'Active' },
      { id: 3, alert_code: 'ALT-103', station: 'Station 2', severity: 'Warning',  message: 'Temperature threshold high (58.4°C)',                    created_at: '35 mins ago', status: 'Acknowledged' },
      { id: 4, alert_code: 'ALT-104', station: 'Station 6', severity: 'Info',     message: 'Routine diagnostic test completed',                       created_at: '1 hour ago',  status: 'Resolved' },
    ],
  };
};

// ─────────────────────────────────────────────────────────────
// Normalise a Flask dashboard response to match fallback shape
// ─────────────────────────────────────────────────────────────
const normaliseDashboard = (raw, fallback) => ({
  ...fallback.dashboard,
  ...raw,
  // Alias snake_case fields from DB rows
  stationStatus: (raw.stationStatus || []).map(s => ({
    ...s,
    cycleTime:   s.cycle_time   || s.cycleTime   || '12s',
    temp:        s.temperature  || s.temp        || 38,
    waitTime:    s.wait_time    || s.waitTime    || 0,
  })),
});

// ─────────────────────────────────────────────────────────────
// Public API functions (called by React components/hooks)
// ─────────────────────────────────────────────────────────────

/** Main dashboard endpoint – returns KPI + station matrix + bottleneck + insights */
export const fetchDashboardData = async () => {
  const fallback = generateFallbackData();
  try {
    const res  = await apiClient.get('/dashboard');
    const raw  = res.data;

    // Build the full payload the React context expects
    return {
      ...fallback,
      dashboard: normaliseDashboard(raw, fallback),
      bottleneckDetail: raw.bottleneckDetail || fallback.bottleneckDetail,
      quickInsights:    raw.quickInsights    || fallback.quickInsights,
    };
  } catch (err) {
    console.warn('[API] /dashboard unreachable – using local simulation.', err.message);
    return fallback;
  }
};

/** Live stations list from DB */
export const fetchStationsData = async () => {
  try {
    const res = await apiClient.get('/stations');
    return res.data;
  } catch {
    return generateFallbackData().dashboard.stationStatus;
  }
};

/** Update a station's status via PATCH /stations/:id/status */
export const updateStationStatus = async (stationId, status) => {
  try {
    const res = await apiClient.patch(`/stations/${stationId}/status`, { status });
    return res.data;
  } catch (err) {
    console.error('[API] updateStationStatus failed', err.message);
    return null;
  }
};

/** All alerts from DB */
export const fetchAlertsData = async () => {
  try {
    const res = await apiClient.get('/alerts');
    return res.data;
  } catch {
    return generateFallbackData().alerts;
  }
};

/** Acknowledge an alert (PATCH /alerts/:id/acknowledge) */
export const acknowledgeAlertApi = async (alertId) => {
  try {
    const res = await apiClient.patch(`/alerts/${alertId}/acknowledge`);
    return res.data;
  } catch (err) {
    console.error('[API] acknowledgeAlert failed', err.message);
    return null;
  }
};

/** Delete an alert (DELETE /alerts/:id) */
export const deleteAlertApi = async (alertId) => {
  try {
    const res = await apiClient.delete(`/alerts/${alertId}`);
    return res.data;
  } catch (err) {
    console.error('[API] deleteAlert failed', err.message);
    return null;
  }
};

/** Create a new alert (POST /alerts) */
export const createAlertApi = async ({ station, severity, message }) => {
  try {
    const res = await apiClient.post('/alerts', { station, severity, message });
    return res.data;
  } catch (err) {
    console.error('[API] createAlert failed', err.message);
    return null;
  }
};

/** Analytics + chart data from DB */
export const fetchAnalyticsData = async () => {
  try {
    const res = await apiClient.get('/analytics');
    return res.data;
  } catch {
    return generateFallbackData();
  }
};

/** Heatmap intensity matrix from DB */
export const fetchHeatmapData = async () => {
  try {
    const res = await apiClient.get('/heatmap');
    return res.data;
  } catch {
    return generateFallbackData().heatmap;
  }
};

/** Reports list with optional filters */
export const fetchReportsData = async (filters = {}) => {
  try {
    const res = await apiClient.get('/reports', { params: filters });
    // Normalise snake_case fields from DB rows
    return res.data.map(r => ({
      ...r,
      id:               r.report_code || r.id,
      totalProduction:  r.total_production,
      avgEfficiency:    r.avg_efficiency,
      bottleneckStation: r.bottleneck_station,
    }));
  } catch {
    return generateFallbackData().alerts; // fallback already uses human-readable shape
  }
};

export const VIDEO_STREAM_URL = `${BASE_URL}/video`;

export default apiClient;
