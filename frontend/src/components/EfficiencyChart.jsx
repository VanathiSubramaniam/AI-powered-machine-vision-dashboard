import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";
import "../styles/chart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function EfficiencyChart() {

  const data = {
    labels: [
      "Station 1",
      "Station 2",
      "Station 3",
      "Station 4",
      "Station 5"
    ],
    datasets: [
      {
        label: "Efficiency %",
        data: [95, 88, 65, 42, 91],
        backgroundColor: [
          "#22c55e",
          "#22c55e",
          "#f59e0b",
          "#ef4444",
          "#22c55e"
        ]
      }
    ]
  };

  return (
    <div className="chart-card">

      <h2>⚡ Machine Efficiency</h2>

      <Bar data={data}/>

    </div>
  );

}

export default EfficiencyChart;