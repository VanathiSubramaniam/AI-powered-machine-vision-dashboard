import "../styles/camera.css";

function CameraFeed() {

    return (

        <div className="camera-panel">

            <h2>🎥 Live AI Camera</h2>

            <img
                src="http://127.0.0.1:5000/video"
                alt="Live Camera"
                className="camera-image"
            />

        </div>

    );

}

export default CameraFeed;