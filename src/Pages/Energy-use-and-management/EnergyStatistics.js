import { useContext, useEffect, useState } from "react";
//import "./EnergyStatistics.css";
import EnergyChart from "./EnergyChart";
import { useParams } from "react-router-dom";
import API from "../../GlobalComponents/Interceptor/Interceptor";
import Login from "../../GlobalComponents/Login/Login";
import { ThemeContext } from "../../GlobalComponents/Context/ThemeContextProvider";

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
  const defaultGraphLabels = [
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
    "Dec"
  ];
  const measurementScales = [
    {Name: "W", Multiplier: 0.001},
    {Name: "kW", Multiplier: 1},
    {Name: "MG", Multiplier: 1000},
    {Name: "GW", Multiplier: 10000},
  ];
/////////////////////////////////////////////////////////////////////////////////
export default function EnergyStatistics(){
    // CONTEXT
    const {theme, setTheme, themeAlt, setThemeAlt} = useContext(ThemeContext);
    // SCALING AND MEASURMENT OF USE
    const [measureScale, setMeasureScale] = useState(1);
    const [totalUse, setTotalUse] = useState(0);
    // DATA TO SEND INTO CHART COMPONENT
    const [ChartData, setChartData] = useState(dummyData);
    const [chartLabels, setChartLabels] = useState(defaultGraphLabels);
    const [chartDesc, setChartDesc] = useState("Average monthly use");
    // COLLECTED ENERGY USE DATA
    const [userEnergyYearData, setUserEnergyYearData] = useState(dummyData);
    const { UserID } = useParams();
    const [loading, setLoading] = useState(false);
    
    // COLLECT USER DATA 
    async function CollectUserData(){  
      console.log(`Requesting Data for User:${UserID}`)
      try {
        setLoading(true)
        const response = await API.get(`/api/CollectUserEnergyData/${UserID}`,
          {
            headers: {
              "RequestType": "UserEnergyDataRequest",
              "RequestDateSent": new Date().toISOString(),
              "RelevantID": UserID,
              "UserType": "StandardUser"
            }
          }
        )

        console.log(response.data);
        setUserEnergyYearData(dummyData);

      } catch (error) {
        console.error(error, "Failed to complete request");
      } finally {
        setLoading(false);
      }
      
    }


    useEffect(() => {
      // STARTUP METHODS
      setTotalUse(collectTotal(userEnergyYearData))
      // COLLECT AND TRANSFORM DATA FOR USE IN GRAPH
      let newGraphData = generateYearlyGraph(dummyData);
      setChartData(newGraphData);
      //CollectUserData()
    },[])

    if (!UserID) {
      return (
        <main className={`NoDataContingent ${theme}`}>
          <Login />
        </main>
      )
    }
    return (
        <main className={`EnergyStatisticsPage ${theme}`}>
            <h1 className={`EnergyStatisticsPageTitle ${themeAlt}`}>
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
            <ul className="MonthItemsContainer">
                {userEnergyYearData.map((Data, index) => (
                    <li className="MonthItem" key={index} id={index}>
                      <section className="MonthItemTitleButtonAndStatistics">
                          <h2 className={`MonthItemTitle ${themeAlt}`}>
                              {Data.Month}
                          </h2>
                          <div className="MonthItemStatistic">
                            <p className="MonthlyItemTotalUse">
                              Monthly Total: {(Data.EnergyUse.reduce((sum, currentValue) => {
                                                  return sum + currentValue
                                              }, 0) / measurementScales[measureScale].Multiplier).toFixed(2)} {measurementScales[measureScale].Name}                            
                            </p>
                          <div className="ScrollButtonsContainer">
                            <button
                              className={`ScrollButton ${themeAlt}`}
                              id={index}
                              onClick={() => {
                                const prevElement = document.getElementById(Math.max(0, index - 1));
                                if (prevElement) {
                                  prevElement.scrollIntoView({ behavior: "smooth", block: "center" });
                                }
                              }}
                            >
                              Up
                            </button>
                            <button
                              className={`ScrollButton ${themeAlt}`}
                              id={index}
                              onClick={() => {
                                const prevElement = document.getElementById(Math.min(12, index + 1));
                                if (prevElement) {
                                  prevElement.scrollIntoView({ behavior: "smooth", block: "center" });
                                }
                              }}
                            >
                              Down
                            </button>
                            </div>
                          </div>   
                          <ul className="DailyEnergyUseContainer" >
                              {Data.EnergyUse.map((DayUse, DayUseIndex) => (
                                  <li className={`DailyEnergyUseItem ${DayUseIndex % 2 === 0 && themeAlt}`} key={DayUseIndex}>
                                      {DayUseIndex + 1}{getDayEnd(DayUseIndex + 1)} {(DayUse / measurementScales[measureScale].Multiplier).toFixed(2)} {measurementScales[measureScale].Name} <sup className="PeakDay">{DayUse === Math.max(...Data.EnergyUse) ? "PEAK" : DayUse === Math.min(...Data.EnergyUse) ? "MIN" : ""}</sup>
                                  </li>
                              ))}
                          </ul>                                          
                      </section>
                        <section className={`MonthGraph ${themeAlt}`}>
                          <EnergyChart ChartData={Data.EnergyUse} Labels={new Array(Data.EnergyUse.length).fill().map((_, i) => i)} DESC={`${Data.Month} Data`}/>                          
                        </section>
                    </li>
                ))}
            </ul>
            <section className={`YearGraph ${themeAlt}`}>
              {ChartData && <EnergyChart ChartData={ChartData} Labels={chartLabels} DESC={chartDesc}/>}
              
            </section>
        </main>
    )
};

function collectTotal(YearData){      
  const newTotalUse = YearData.reduce(
    (sum, data) => sum + data.EnergyUse.reduce((monthSum, value) => monthSum + value, 0),
    0
  );
  return newTotalUse;
}
function generateYearlyGraph(dummyData){
  let result = []

  for (const Data of Object.entries(dummyData)){
    let memory = 0;
    let endingDay = 0;
    for(const day of Data[1].EnergyUse){
      memory += day
      endingDay++
    }
    result.push(memory / endingDay)
  };

  return result
}

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