import React, { useContext, useEffect, useState } from "react";
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
import { ThemeContext } from "../../GlobalComponents/Context/ThemeContextProvider";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function EnergyChart({ ChartData, Labels, DESC  }) {
  const {theme, setTheme, themeAlt, setThemeAlt} = useContext(ThemeContext);


  const [data, setData] = useState({
    Labels: Labels,
    datasets: [
      {
        label: "AVG Energy Usage",
        data: ChartData,
        borderColor: `gray`,
        backgroundColor: themeAlt,
        tension: 0.3,
        pointRadius: 2,
      }
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: DESC },
    }
  };

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      labels: Labels,
      datasets: prevData.datasets.map((dataset) => ({
        ...dataset,
        data: ChartData,
      })),
    }));
  }, [ChartData, Labels, DESC]);

  return (
    <div className="GraphContainer">
        <Line className={`Graph ${theme}`} data={data} options={options} />
    </div>
  );
}
