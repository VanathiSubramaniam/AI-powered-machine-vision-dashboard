import "../styles/chart.css";

function HeatMap(){

    return(

        <div className="chart-card">

            <h2>🗺 Factory Heat Map</h2>

            <table className="heat-table">

                <tbody>

                    <tr>
                        <td className="green">S1</td>
                        <td className="green">S2</td>
                        <td className="yellow">S3</td>
                    </tr>

                    <tr>
                        <td className="green">S4</td>
                        <td className="red">S5</td>
                        <td className="green">S6</td>
                    </tr>

                </tbody>

            </table>

        </div>

    );

}

export default HeatMap;