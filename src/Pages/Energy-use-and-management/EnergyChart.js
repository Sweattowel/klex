import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./EnergyStatistics.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function EnergyChart({ ChartData }) {
  if (!ChartData || !Array.isArray(ChartData)) {
    return <div>No Data</div>;
  }

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dev"
  ]

  const data = {
    labels,
    datasets: [
      {
        label: "AVG Energy Usage",
        data: ChartData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
        pointRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Energy Usage Over Time" },
    },
  };

  return (
    <div className="GraphContainer">
        <h1 className="GraphTitle">
            Graphing
        </h1>
        <Line className="Graph" data={data} options={options} />
    </div>
  );
}
