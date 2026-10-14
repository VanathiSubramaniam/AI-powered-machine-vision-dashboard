import "../styles/station.css";

function StationStatus() {

    const stations = [

        {name:"Station 1", status:"Running"},
        {name:"Station 2", status:"Running"},
        {name:"Station 3", status:"Slow"},
        {name:"Station 4", status:"Bottleneck"},
        {name:"Station 5", status:"Running"},
        {name:"Station 6", status:"Running"}

    ];

    return (

        <div className="station-panel">

            <h2>🏭 Station Status</h2>

            {
                stations.map((station,index)=>(

                    <div className="station-row" key={index}>

                        <span>{station.name}</span>

                        <span className={station.status.toLowerCase()}>

                            {station.status}

                        </span>

                    </div>

                ))
            }

        </div>

    );

}

export default StationStatus;