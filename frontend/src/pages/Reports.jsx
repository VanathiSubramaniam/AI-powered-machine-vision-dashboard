import React, { useState, useEffect, useCallback } from 'react';
import { fetchReportsData } from '../services/api';
import Badge from '../components/Common/Badge';
import {
  FiFileText,
  FiDownload,
  FiFilter,
  FiPrinter,
  FiCheckCircle,
  FiRefreshCw
} from 'react-icons/fi';

const Reports = () => {
  const [shiftFilter, setShiftFilter] = useState('All');
  const [machineFilter, setMachineFilter] = useState('All');
  const [startDate, setStartDate] = useState('2026-10-01');
  const [endDate, setEndDate] = useState('2026-10-14');
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadReports = useCallback(async () => {
    setIsLoading(true);
    const data = await fetchReportsData({
      shift:   shiftFilter !== 'All' ? shiftFilter : undefined,
      machine: machineFilter !== 'All' ? machineFilter : undefined,
    });
    // Normalise from DB snake_case → camelCase
    const normalised = data.map(r => ({
      id:               r.report_code || r.id,
      date:             r.date,
      shift:            r.shift,
      totalProduction:  r.total_production  || r.totalProduction  || 0,
      avgEfficiency:    r.avg_efficiency    || r.avgEfficiency    || '0%',
      bottleneckStation: r.bottleneck_station || r.bottleneckStation || '—',
      downtime:         r.downtime || '0m',
      status:           r.status  || 'Completed',
    }));
    setReports(normalised);
    setIsLoading(false);
  }, [shiftFilter, machineFilter]);

  useEffect(() => { loadReports(); }, [loadReports]);

  const exportCSV = () => {
    const headers = ['Report ID,Date,Shift,Total Production,Avg Efficiency,Bottleneck Station,Downtime,Status'];
    const rows = reports.map(r => `${r.id},${r.date},${r.shift},${r.totalProduction},${r.avgEfficiency},${r.bottleneckStation},${r.downtime},${r.status}`);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `assembly_line_report_${startDate}_to_${endDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportExcel = () => {
    // Generate .csv formatted as Excel compatible
    exportCSV();
  };

  const exportPDF = () => {
    window.print();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Shift Performance & Audit Reports
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Export operational metrics, line efficiency logs, and bottleneck diagnostics
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={loadReports} className="btn btn-outline btn-sm">
            <FiRefreshCw /> Refresh DB
          </button>
          <button onClick={exportCSV} className="btn btn-outline btn-sm">
            <FiDownload /> Export CSV
          </button>
          <button onClick={exportExcel} className="btn btn-outline btn-sm">
            <FiFileText /> Export Excel
          </button>
          <button onClick={exportPDF} className="btn btn-primary btn-sm">
            <FiPrinter /> Print / Export PDF
          </button>
        </div>
      </div>

      {/* Report Filter Card */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1.25rem' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <FiFilter style={{ color: 'var(--primary)' }} /> Report Generation Filters
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.775rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                width: '100%',
                padding: '0.45rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.775rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                width: '100%',
                padding: '0.45rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.775rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Shift Selection
            </label>
            <select
              value={shiftFilter}
              onChange={(e) => setShiftFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '0.45rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
              }}
            >
              <option value="All">All Shifts (24/7)</option>
              <option value="Shift A">Shift A (Morning 06:00 - 14:00)</option>
              <option value="Shift B">Shift B (Evening 14:00 - 22:00)</option>
              <option value="Shift C">Shift C (Night 22:00 - 06:00)</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '0.775rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Machine Target
            </label>
            <select
              value={machineFilter}
              onChange={(e) => setMachineFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '0.45rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
              }}
            >
              <option value="All">Entire Assembly Line (Stations 1-6)</option>
              <option value="Station 1">Station 1 - Stamping</option>
              <option value="Station 2">Station 2 - Welding</option>
              <option value="Station 3">Station 3 - Assembly</option>
              <option value="Station 4">Station 4 - Quality Inspection</option>
              <option value="Station 5">Station 5 - Packaging</option>
              <option value="Station 6">Station 6 - Dispatch</option>
            </select>
          </div>
        </div>
      </div>

      {/* Generated Reports Table */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Date</th>
              <th>Shift</th>
              <th>Total Production</th>
              <th>Avg Efficiency</th>
              <th>Primary Bottleneck</th>
              <th>Downtime</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Download</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  Loading reports from database…
                </td>
              </tr>
            ) : reports.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No reports match the selected filters.
                </td>
              </tr>
            ) : reports.map((r) => (
              <tr key={r.id}>
                <td style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{r.id}</td>
                <td>{r.date}</td>
                <td style={{ fontWeight: 500 }}>{r.shift}</td>
                <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{r.totalProduction} units</td>
                <td style={{ fontWeight: 600, color: '#10b981' }}>{r.avgEfficiency}</td>
                <td>
                  <Badge variant={r.bottleneckStation && r.bottleneckStation.includes('4') ? 'danger' : 'warning'}>
                    {r.bottleneckStation}
                  </Badge>
                </td>
                <td style={{ color: 'var(--text-secondary)' }}>{r.downtime}</td>
                <td>
                  <span className="badge badge-success"><FiCheckCircle /> {r.status}</span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button onClick={exportCSV} className="btn btn-outline btn-sm">
                    <FiDownload /> Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
