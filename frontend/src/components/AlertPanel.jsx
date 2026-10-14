import "../styles/alert.css";

function AlertPanel() {

    return (

        <div className="alert-panel">

            <h2>⚠ Bottleneck Alert</h2>

            <div className="alert-card">

                <h3>Station 4</h3>

                <p><b>Status:</b> Bottleneck Detected</p>

                <p><b>Reason:</b> Conveyor Speed Reduced</p>

                <p><b>Delay:</b> 1 min 20 sec</p>

                <p><b>Recommendation:</b></p>

                <ul>
                    <li>Inspect Conveyor Motor</li>
                    <li>Check Product Jam</li>
                    <li>Increase Conveyor Speed</li>
                </ul>

            </div>

        </div>

    );

}

export default AlertPanel;