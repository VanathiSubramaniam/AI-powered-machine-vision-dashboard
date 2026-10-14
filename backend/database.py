import sqlite3
import os
from datetime import datetime, timedelta
import random

DB_PATH = os.path.join(os.path.dirname(__file__), 'assembly_line.db')

def get_db():
    """Return a SQLite connection with row_factory for dict-like access."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Create all tables and seed initial data if not already present."""
    conn = get_db()
    c = conn.cursor()

    # --- Stations table ---
    c.execute('''
        CREATE TABLE IF NOT EXISTS stations (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            name        TEXT NOT NULL,
            status      TEXT NOT NULL DEFAULT 'Running',
            cycle_time  TEXT DEFAULT '12s',
            target      INTEGER DEFAULT 300,
            current     INTEGER DEFAULT 0,
            temperature REAL DEFAULT 38.0,
            wait_time   REAL DEFAULT 0.0,
            oee         INTEGER DEFAULT 90,
            updated_at  TEXT DEFAULT (datetime('now'))
        )
    ''')

    # --- Alerts table ---
    c.execute('''
        CREATE TABLE IF NOT EXISTS alerts (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            alert_code  TEXT UNIQUE,
            station     TEXT NOT NULL,
            severity    TEXT NOT NULL,
            message     TEXT NOT NULL,
            status      TEXT NOT NULL DEFAULT 'Active',
            created_at  TEXT DEFAULT (datetime('now'))
        )
    ''')

    # --- Production log table ---
    c.execute('''
        CREATE TABLE IF NOT EXISTS production_log (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            station_id  INTEGER,
            hour_label  TEXT,
            units       INTEGER DEFAULT 0,
            efficiency  REAL DEFAULT 80.0,
            downtime    INTEGER DEFAULT 0,
            logged_at   TEXT DEFAULT (datetime('now'))
        )
    ''')

    # --- Reports table ---
    c.execute('''
        CREATE TABLE IF NOT EXISTS reports (
            id                  INTEGER PRIMARY KEY AUTOINCREMENT,
            report_code         TEXT UNIQUE,
            date                TEXT,
            shift               TEXT,
            total_production    INTEGER DEFAULT 0,
            avg_efficiency      TEXT DEFAULT '0%',
            bottleneck_station  TEXT,
            downtime            TEXT DEFAULT '0m',
            status              TEXT DEFAULT 'Completed',
            created_at          TEXT DEFAULT (datetime('now'))
        )
    ''')

    # --- Heatmap table ---
    c.execute('''
        CREATE TABLE IF NOT EXISTS heatmap (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            station     TEXT NOT NULL,
            hour_label  TEXT NOT NULL,
            intensity   INTEGER DEFAULT 10,
            recorded_at TEXT DEFAULT (datetime('now'))
        )
    ''')

    conn.commit()

    # Seed initial data if empty
    _seed_if_empty(conn)
    conn.close()


def _seed_if_empty(conn):
    c = conn.cursor()

    # --- Seed Stations ---
    c.execute("SELECT COUNT(*) FROM stations")
    if c.fetchone()[0] == 0:
        stations = [
            ('Station 1 - Stamping',         'Running',     '12s', 300, 295, 42.1, 2.1,  94),
            ('Station 2 - Welding',           'Running',     '18s', 300, 288, 58.4, 3.5,  89),
            ('Station 3 - Assembly',          'Warning',     '24s', 300, 260, 49.0, 8.2,  76),
            ('Station 4 - Quality Inspection','Bottleneck',  '42s', 300, 210, 39.5, 18.6, 62),
            ('Station 5 - Packaging',         'Idle',        '10s', 300, 210, 36.2, 1.2,  95),
            ('Station 6 - Sorting & Dispatch','Maintenance', '15s', 300, 200, 32.0, 0.5,  91),
        ]
        c.executemany('''
            INSERT INTO stations (name, status, cycle_time, target, current, temperature, wait_time, oee)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', stations)

    # --- Seed Alerts ---
    c.execute("SELECT COUNT(*) FROM alerts")
    if c.fetchone()[0] == 0:
        alerts = [
            ('ALT-101', 'Station 4 - Quality Inspection', 'Critical', 'YOLO detection: Severe workpiece queue overflow detected', 'Active'),
            ('ALT-102', 'Station 3 - Assembly',           'Warning',  'Cycle time drift: 24s vs 15s standard', 'Active'),
            ('ALT-103', 'Station 2 - Welding',            'Warning',  'Temperature threshold high (58.4°C)', 'Acknowledged'),
            ('ALT-104', 'Station 6 - Sorting & Dispatch', 'Info',     'Routine diagnostic test completed', 'Resolved'),
        ]
        c.executemany('''
            INSERT INTO alerts (alert_code, station, severity, message, status)
            VALUES (?, ?, ?, ?, ?)
        ''', alerts)

    # --- Seed Production Log ---
    c.execute("SELECT COUNT(*) FROM production_log")
    if c.fetchone()[0] == 0:
        hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00']
        prod_data = [210, 235, 250, 240, 270, 284, 290]
        eff_data  = [75.0, 78.0, 82.0, 80.0, 85.0, 84.0, 88.0]
        down_data = [15, 8, 22, 5, 12, 18, 10]
        rows = []
        for i, h in enumerate(hours):
            rows.append((1, h, prod_data[i], eff_data[i], down_data[i]))
        c.executemany('''
            INSERT INTO production_log (station_id, hour_label, units, efficiency, downtime)
            VALUES (?, ?, ?, ?, ?)
        ''', rows)

    # --- Seed Reports ---
    c.execute("SELECT COUNT(*) FROM reports")
    if c.fetchone()[0] == 0:
        reports = [
            ('REP-001', '2026-10-14', 'Shift A (Morning)', 1850, '84%', 'Station 4', '1h 45m', 'Completed'),
            ('REP-002', '2026-10-13', 'Shift B (Evening)', 1790, '81%', 'Station 3', '2h 10m', 'Completed'),
            ('REP-003', '2026-10-13', 'Shift A (Morning)', 1910, '88%', 'Station 4', '1h 15m', 'Completed'),
            ('REP-004', '2026-10-12', 'Shift C (Night)',   1620, '76%', 'Station 2', '2h 45m', 'Completed'),
            ('REP-005', '2026-10-12', 'Shift A (Morning)', 1820, '83%', 'Station 4', '1h 30m', 'Completed'),
        ]
        c.executemany('''
            INSERT INTO reports (report_code, date, shift, total_production, avg_efficiency, bottleneck_station, downtime, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', reports)

    # --- Seed Heatmap ---
    c.execute("SELECT COUNT(*) FROM heatmap")
    if c.fetchone()[0] == 0:
        station_names = [
            'Station 1', 'Station 2', 'Station 3',
            'Station 4', 'Station 5', 'Station 6'
        ]
        hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00']
        matrix = [
            [10, 15, 12, 20, 15, 10, 14],
            [15, 22, 18, 25, 20, 18, 16],
            [25, 35, 42, 50, 38, 30, 45],
            [85, 92, 88, 96, 90, 85, 94],
            [12, 18, 15, 22, 14, 10, 15],
            [5,  8,  10, 12,  8,  6,  9],
        ]
        rows = []
        for s_idx, st in enumerate(station_names):
            for h_idx, h in enumerate(hours):
                rows.append((st, h, matrix[s_idx][h_idx]))
        c.executemany('''
            INSERT INTO heatmap (station, hour_label, intensity)
            VALUES (?, ?, ?)
        ''', rows)

    conn.commit()


# ============================================================
# CRUD helpers used by app.py routes
# ============================================================

def get_all_stations():
    conn = get_db()
    rows = conn.execute("SELECT * FROM stations ORDER BY id").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def update_station_status(station_id, status):
    conn = get_db()
    conn.execute(
        "UPDATE stations SET status=?, updated_at=datetime('now') WHERE id=?",
        (status, station_id)
    )
    conn.commit()
    conn.close()

def get_all_alerts():
    conn = get_db()
    rows = conn.execute("SELECT * FROM alerts ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def acknowledge_alert(alert_id):
    conn = get_db()
    conn.execute("UPDATE alerts SET status='Acknowledged' WHERE id=?", (alert_id,))
    conn.commit()
    conn.close()

def delete_alert(alert_id):
    conn = get_db()
    conn.execute("DELETE FROM alerts WHERE id=?", (alert_id,))
    conn.commit()
    conn.close()

def add_alert(station, severity, message):
    conn = get_db()
    import random, string
    code = 'ALT-' + ''.join(random.choices(string.digits, k=3))
    conn.execute('''
        INSERT INTO alerts (alert_code, station, severity, message, status)
        VALUES (?, ?, ?, ?, 'Active')
    ''', (code, station, severity, message))
    conn.commit()
    conn.close()

def get_production_log():
    conn = get_db()
    rows = conn.execute(
        "SELECT hour_label, units, efficiency, downtime FROM production_log ORDER BY id"
    ).fetchall()
    conn.close()
    return [dict(r) for r in rows]

def get_all_reports(date_filter=None, shift_filter=None, machine_filter=None):
    conn = get_db()
    query = "SELECT * FROM reports WHERE 1=1"
    params = []
    if date_filter:
        query += " AND date=?"
        params.append(date_filter)
    if shift_filter and shift_filter != 'All':
        query += " AND shift LIKE ?"
        params.append(f'%{shift_filter}%')
    if machine_filter and machine_filter != 'All':
        query += " AND bottleneck_station LIKE ?"
        params.append(f'%{machine_filter}%')
    query += " ORDER BY id DESC"
    rows = conn.execute(query, params).fetchall()
    conn.close()
    return [dict(r) for r in rows]

def get_heatmap_data():
    conn = get_db()
    rows = conn.execute(
        "SELECT station, hour_label, intensity FROM heatmap ORDER BY station, hour_label"
    ).fetchall()
    conn.close()
    return [dict(r) for r in rows]

def get_dashboard_summary():
    conn = get_db()
    stations = conn.execute("SELECT * FROM stations").fetchall()
    alerts   = conn.execute("SELECT * FROM alerts WHERE status='Active'").fetchall()
    log      = conn.execute(
        "SELECT units, efficiency FROM production_log ORDER BY id DESC LIMIT 1"
    ).fetchone()
    conn.close()

    station_list = [dict(s) for s in stations]
    running  = sum(1 for s in station_list if s['status'] == 'Running')
    stopped  = sum(1 for s in station_list if s['status'] in ('Idle', 'Maintenance', 'Offline'))
    bottleneck_st = next(
        (s['name'] for s in station_list if s['status'] == 'Bottleneck'),
        'None'
    )
    production = log['units'] if log else 290
    efficiency = int(log['efficiency']) if log else 84

    return {
        "running":      running,
        "stopped":      stopped,
        "production":   production,
        "todaysProduction": 1850,
        "percentageIncrease": 12.4,
        "bottleneck":   bottleneck_st,
        "efficiency":   efficiency,
        "downtime":     "1h 45m",
        "alertsCount":  len(alerts),
        "stationStatus": station_list
    }
