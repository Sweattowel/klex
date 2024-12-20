import { useEffect, useState } from "react";
import "./EnergyStatistics.css";
import EnergyChart from "./EnergyChart";

const dummyData = [
    {
      Month: "January",
      EnergyUse: Array.from({ length: 31 }, () => Math.floor(Math.random() * 100) + 1),
    },
    {
      Month: "February",
      EnergyUse: Array.from({ length: 28 }, () => Math.floor(Math.random() * 100) + 1),
    },
    {
      Month: "March",
      EnergyUse: Array.from({ length: 31 }, () => Math.floor(Math.random() * 100) + 1),
    },
    {
      Month: "April",
      EnergyUse: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 1),
    },
    {
      Month: "May",
      EnergyUse: Array.from({ length: 31 }, () => Math.floor(Math.random() * 100) + 1),
    },
    {
      Month: "June",
      EnergyUse: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 1),
    },
    {
      Month: "July",
      EnergyUse: Array.from({ length: 31 }, () => Math.floor(Math.random() * 100) + 1),
    },
    {
      Month: "August",
      EnergyUse: Array.from({ length: 31 }, () => Math.floor(Math.random() * 100) + 1),
    },
    {
      Month: "September",
      EnergyUse: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 1),
    },
    {
      Month: "October",
      EnergyUse: Array.from({ length: 31 }, () => Math.floor(Math.random() * 100) + 1),
    },
    {
      Month: "November",
      EnergyUse: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 1),
    },
    {
      Month: "December",
      EnergyUse: Array.from({ length: 31 }, () => Math.floor(Math.random() * 100) + 1),
    },
  ];
  
  const measurementScales = [
    {Name: "W", Multiplier: 0.001},
    {Name: "kW", Multiplier: 1},
    {Name: "MG", Multiplier: 1000},
    {Name: "GW", Multiplier: 10000},
  ];

export default function EnergyStatistics(){
    const [measureScale, setMeasureScale] = useState(1);
    const [totalUse, setTotalUse] = useState(0);
    const [ChartData, setChartData] = useState([]);

    useEffect(() => {
        const newTotalUse = dummyData.reduce(
            (sum, data) => sum + data.EnergyUse.reduce((monthSum, value) => monthSum + value, 0),
        0
    );

    setTotalUse(newTotalUse)
    // COLLECT AND TRANSFORM DATA FOR USE IN GRAPH
    let newGraphData = [];
    for (const Data of Object.entries(dummyData)){
      let memory = 0;
      let endingDay = 0;
      for(const day of Data[1].EnergyUse){
        memory += day
        endingDay++
      }
      newGraphData.push(memory / endingDay)
    };
    setChartData(newGraphData);

    },[])

    return (
        <main className="EnergyUseContainer">
            <h1 className="EnergyUseTitle">
                Enjoy a personalised report on your usage
            </h1>
            <section className="TotalUseAndMeasurementContainer">
                <div className="TotalUseAveragesContainer">
                <h2 className="TotalUseTitle">
                    Total Usage {(totalUse / measurementScales[measureScale].Multiplier).toFixed(2)} {measurementScales[measureScale].Name}
                </h2>   
                <div className="AveragesContainer">
                  <p className="MonthlyUseAverage">
                      Average Monthly Use: {((totalUse / 12).toFixed(2) / measurementScales[measureScale].Multiplier).toFixed(2) } {measurementScales[measureScale].Name}
                  </p>
                  <p className="DailyUseAverage">
                      Average Daily Use: {((totalUse / 356).toFixed(2) / measurementScales[measureScale].Multiplier).toFixed(2)} {measurementScales[measureScale].Name}
                  </p>                  
                </div>               

                </div>
                <div className="MeasurementContainer">
                  <h2 className="MeasurementTitle">
                    Measurement scale
                  </h2>
                  <li className="MeasurementsScaleContainer">
                    {measurementScales.map((measurement, index) => (
                      <button className={`MeasurementScales ${measurementScales[measureScale].Name === measurement.Name && "selected"}`}
                        onClick={() => setMeasureScale(index)}
                        key={index}
                      >
                        {measurement.Name}
                      </button>
                    ))}                    
                  </li>

                </div>
            </section>
            <ul className="MonthlyUseContainer">
                {dummyData.map((Data, index) => (
                    <li className="MonthlyUseItemContainer" key={index} id={index}>
                        <h2 className="MonthlyUseTitle">
                            {Data.Month}
                        </h2>
                        <div className="MonthlyUseStatistic">
                            Monthly Total: {(Data.EnergyUse.reduce((sum, currentValue) => {
                                                return sum + currentValue
                                            }, 0) / measurementScales[measureScale].Multiplier).toFixed(2)} {measurementScales[measureScale].Name}
                        <div className="MobileScrollButtonsContainer">
                          <a className="MobileScrollButton"
                            href={`#${Math.max(0, index - 1) }`}
                          >
                           up
                          </a>
                          <a className="MobileScrollButton"
                            href={`#${Math.min(12, index + 1)}`}
                          >
                           down
                          </a>
                        </div>
                        </div>
                        
                        <ul className="MonthlyDayToDayContainer" >
                            {Data.EnergyUse.map((DayUse, DayUseIndex) => (
                                <li className="MonthlyDayToDayItems" key={DayUseIndex}>
                                    {DayUseIndex + 1}{getDayEnd(DayUseIndex + 1)} {(DayUse / measurementScales[measureScale].Multiplier).toFixed(2)} {measurementScales[measureScale].Name} <sup className="PeakDay">{DayUse === Math.max(...Data.EnergyUse) ? "PEAK" : DayUse === Math.min(...Data.EnergyUse) ? "MIN" : ""}</sup>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            <section>
              {ChartData && <EnergyChart ChartData={ChartData}/>}
              
            </section>
            <button onClick={() => console.log(dummyData)}>
                Log
            </button>
        </main>
    )
};

function getDayEnd(day){
  if (day > 3 && day < 21) return "th";

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  };
};