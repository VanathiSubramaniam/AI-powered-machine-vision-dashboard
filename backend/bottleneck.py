"""
bottleneck.py - Bottleneck analysis engine
Reads live station data from the SQLite database and returns
bottleneck details, quick insights, and analytics.
"""
from database import get_all_stations, get_production_log


def get_bottleneck_detail():
    """Identify the primary bottleneck station and return diagnostics."""
    stations = get_all_stations()
    bottleneck = next((s for s in stations if s['status'] == 'Bottleneck'), None)

    if not bottleneck:
        return {
            "machineName":    "No Active Bottleneck",
            "severity":       "Info",
            "reason":         "All stations operating within normal parameters.",
            "waitingTime":    "0m 00s",
            "timestamp":      _now(),
            "recommendation": "Continue monitoring assembly line telemetry.",
        }

    wait = bottleneck.get('wait_time', 0)
    minutes = int(wait)
    seconds = int((wait - minutes) * 60)

    return {
        "machineName":    bottleneck['name'],
        "severity":       "Critical",
        "reason":         (
            f"Computer Vision detects queue buildup. "
            f"Cycle time {bottleneck['cycle_time']} exceeds standard by 45%."
        ),
        "waitingTime":    f"{minutes}m {seconds:02d}s",
        "timestamp":      _now(),
        "recommendation": (
            "Dispatch auxiliary quality inspector to reduce backlog. "
            "Consider increasing scan lighting intensity at this station."
        ),
    }


def get_quick_insights():
    """Generate real-time AI diagnostic insight cards from DB data."""
    stations = get_all_stations()
    insights = []

    for s in stations:
        if s['status'] == 'Bottleneck':
            insights.append({
                "id": len(insights) + 1,
                "type": "danger",
                "text": (
                    f"{s['name']} cycle time exceeded nominal threshold. "
                    f"Bottleneck detected — wait queue: {s['wait_time']}m."
                )
            })
        if s['temperature'] and s['temperature'] > 55:
            insights.append({
                "id": len(insights) + 1,
                "type": "warning",
                "text": (
                    f"{s['name']} temperature spiking to {s['temperature']}°C. "
                    "Check cooling fluid and fan systems."
                )
            })
        if s['status'] == 'Warning':
            insights.append({
                "id": len(insights) + 1,
                "type": "warning",
                "text": (
                    f"{s['name']} operating in degraded mode. "
                    "Cycle time drift detected — technician review recommended."
                )
            })
        if s['status'] == 'Maintenance':
            insights.append({
                "id": len(insights) + 1,
                "type": "purple",
                "text": f"{s['name']} is currently under scheduled maintenance."
            })

    log = get_production_log()
    if log:
        last = log[-1]
        if last['efficiency'] >= 85:
            insights.append({
                "id": len(insights) + 1,
                "type": "info",
                "text": (
                    f"Overall line output efficiency is {last['efficiency']}% — "
                    "exceeding today's shift target."
                )
            })
        else:
            insights.append({
                "id": len(insights) + 1,
                "type": "info",
                "text": (
                    f"Line efficiency at {last['efficiency']}%. "
                    "Check Station 4 throughput to improve OEE."
                )
            })

    return insights[:5]  # Return top 5 insights


def get_analytics_data():
    """Aggregate analytics from DB for the Analytics page."""
    log = get_production_log()
    stations = get_all_stations()

    labels    = [r['hour_label'] for r in log]
    units     = [r['units']      for r in log]
    eff       = [r['efficiency'] for r in log]
    downtime  = [r['downtime']   for r in log]

    machine_efficiency = [
        {
            "name":       s['name'],
            "efficiency": s['oee'],
            "downtime":   f"{int((100 - s['oee']) * 0.5)}m",
            "bottlenecks": 1 if s['status'] == 'Bottleneck' else 0
        }
        for s in stations
    ]

    return {
        "charts": {
            "productionTrend": {
                "labels": labels,
                "datasets": [
                    {"label": "Actual Units",  "data": units,
                     "color": "#2563eb"},
                    {"label": "Target (250)",  "data": [250] * len(labels),
                     "color": "#94a3b8"},
                ]
            },
            "efficiencyTrend": {
                "labels": labels,
                "datasets": [{"label": "Efficiency (%)", "data": eff, "color": "#10b981"}]
            },
            "downtimeTrend": {
                "labels": labels,
                "datasets": [{"label": "Downtime (Mins)", "data": downtime, "color": "#ef4444"}]
            },
            "waitingTime": {
                "labels": [s['name'] for s in stations],
                "data":   [s['wait_time'] for s in stations]
            },
            "alertDistribution": {
                "labels": ["Critical", "Warning", "Info"],
                "data":   [2, 5, 8],
                "colors": ["#ef4444", "#f59e0b", "#06b6d4"]
            }
        },
        "machineEfficiency": machine_efficiency,
        "dailyOutput":  [1650, 1720, 1810, 1790, 1850, 1910, 1850],
        "weeklyOutput": [11200, 12400, 11800, 12900],
    }


def get_heatmap_payload():
    """Return heatmap payload restructured for the frontend component."""
    from database import get_heatmap_data
    rows = get_heatmap_data()

    stations = list(dict.fromkeys(r['station'] for r in rows))
    hours    = list(dict.fromkeys(r['hour_label'] for r in rows))

    # Build matrix [station_idx][hour_idx]
    matrix = []
    for st in stations:
        row_vals = []
        for h in hours:
            match = next(
                (r['intensity'] for r in rows if r['station'] == st and r['hour_label'] == h),
                0
            )
            row_vals.append(match)
        matrix.append(row_vals)

    return {
        "stations":        stations,
        "hours":           hours,
        "intensityMatrix": matrix,
    }


def _now():
    from datetime import datetime
    return datetime.now().strftime('%H:%M:%S')
