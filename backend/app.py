from flask import Flask, jsonify, Response, request
from flask_cors import CORS

from camera    import generate_frames
from database  import (
    init_db,
    get_dashboard_summary,
    get_all_stations,
    update_station_status,
    get_all_alerts,
    acknowledge_alert,
    delete_alert,
    add_alert,
    get_all_reports,
)
from bottleneck import (
    get_bottleneck_detail,
    get_quick_insights,
    get_analytics_data,
    get_heatmap_payload,
)

# ── App setup ──────────────────────────────────────────────
app = Flask(__name__)
CORS(app)

# Initialise / seed the SQLite database on startup
init_db()


# ── Health check ───────────────────────────────────────────
@app.route("/")
def home():
    return jsonify({"message": "AURA VISION Machine Vision Dashboard", "status": "ok"})


# ── Dashboard summary (KPI cards + station matrix) ─────────
@app.route("/dashboard")
def dashboard():
    try:
        summary          = get_dashboard_summary()
        summary["bottleneckDetail"] = get_bottleneck_detail()
        summary["quickInsights"]    = get_quick_insights()
        return jsonify(summary)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ── Live MJPEG video stream ────────────────────────────────
@app.route("/video")
def video():
    return Response(
        generate_frames(),
        mimetype="multipart/x-mixed-replace; boundary=frame"
    )


# ── Stations CRUD ──────────────────────────────────────────
@app.route("/stations", methods=["GET"])
def stations():
    try:
        return jsonify(get_all_stations())
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/stations/<int:station_id>/status", methods=["PATCH"])
def patch_station_status(station_id):
    """Update a station's status (e.g. mark as Maintenance from the frontend)."""
    try:
        data   = request.get_json(force=True)
        status = data.get("status", "Running")
        update_station_status(station_id, status)
        return jsonify({"success": True, "station_id": station_id, "status": status})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ── Alerts CRUD ────────────────────────────────────────────
@app.route("/alerts", methods=["GET"])
def alerts():
    try:
        return jsonify(get_all_alerts())
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/alerts", methods=["POST"])
def create_alert():
    try:
        data = request.get_json(force=True)
        add_alert(
            data.get("station", "Unknown"),
            data.get("severity", "Info"),
            data.get("message", "")
        )
        return jsonify({"success": True}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/alerts/<int:alert_id>/acknowledge", methods=["PATCH"])
def ack_alert(alert_id):
    try:
        acknowledge_alert(alert_id)
        return jsonify({"success": True, "alert_id": alert_id})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/alerts/<int:alert_id>", methods=["DELETE"])
def del_alert(alert_id):
    try:
        delete_alert(alert_id)
        return jsonify({"success": True, "alert_id": alert_id})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ── Analytics (charts + machine comparison) ────────────────
@app.route("/analytics")
def analytics():
    try:
        return jsonify(get_analytics_data())
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ── Heatmap data ───────────────────────────────────────────
@app.route("/heatmap")
def heatmap():
    try:
        return jsonify(get_heatmap_payload())
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ── Reports ────────────────────────────────────────────────
@app.route("/reports", methods=["GET"])
def reports():
    try:
        date_f    = request.args.get("date")
        shift_f   = request.args.get("shift")
        machine_f = request.args.get("machine")
        return jsonify(get_all_reports(date_f, shift_f, machine_f))
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ── Run ────────────────────────────────────────────────────
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)