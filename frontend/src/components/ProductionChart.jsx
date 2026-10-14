import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

import "../styles/chart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function ProductionChart() {

  const data = {
    labels: [
      "9 AM",
      "10 AM",
      "11 AM",
      "12 PM",
      "1 PM",
      "2 PM"
    ],
    datasets: [
      {
        label: "Production",
        data: [120, 180, 240, 280, 350, 420],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,.2)",
        tension: 0.4,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    }
  };

  return (
    <div className="chart-card">
      <h2>📈 Production Trend</h2>
      <Line data={data} options={options}/>
    </div>
  );

}

export default ProductionChart;