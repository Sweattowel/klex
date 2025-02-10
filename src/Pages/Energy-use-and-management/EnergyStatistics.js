import { useContext, useEffect, useState } from "react";
//import "./EnergyStatistics.css";
import EnergyChart from "./EnergyChart";
import { useParams } from "react-router-dom";
import API from "../../GlobalComponents/Interceptor/Interceptor";
import Login from "../../GlobalComponents/Login/Login";
import { ThemeContext } from "../../GlobalComponents/Context/ThemeContextProvider";
import { UserContext } from "../../GlobalComponents/Context/UserContextProvider";

  const Months = [
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
    const {UserData, setUserData} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [responseCache, setResponseCache] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [error, setError] = useState("");

    async function TestInsertData(){
      const EnergyYear = createNewYear(2025);

      await API.patch("API/EnergyHandling/UpdateEnergy", {UserData, EnergyYear});
    };

    async function CreateLocalUserProfile(){
      try {
        setLoading(true);
        
        await API.post("API/EnergyHandling/CreateLocalUserProfile", UserData);
        
        
        setError("New AccountData created, please try again, if errors persist contact administrator")
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
 
    async function CollectYearData(e) {
      try {
        e.preventDefault();
        setLoading(true);
        setError("");
    
        const response = await API.get(`API/EnergyHandling/GetEnergyHandling/${UserData.AccountName}/${selectedYear}`);
        
        setResponseCache(response.data.ParsedUserData.EnergyYear);
        setError(`Data collected for Year ${selectedYear}`);
      } catch (error) {
        console.error(error);
    
        if (error.response) {
          switch (error.response.status) {
            case 404:
              setError("No Data for that year");
              break;
            case 500:
              setError("Server Error");
              CreateLocalUserProfile();
              break;
            case 1404:
              setError("File has not been created, creating now");
              CreateLocalUserProfile();
              break;
            default:
              setError("Unknown error occurred");
              break;
          }
        } else {
          setError("Network error");
        }
      } finally {
        setLoading(false);
      }
    }


    if (!UserData.AccountID || UserData.AccountID === -1) {
      return (
        <main className={`NoDataContingent ${theme}`}>
          <Login />
        </main>
      )
    };

    return (
        <main className="EnergyStatisticsContainer">
          <section className="EnergyStatisticsTopBar">
            <div>
              Select Year <input type="number" min="2000" max="2099" step="1" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}/>
            </div>
            {loading ? (
              <p>
                Loading...
              </p>
            ) : (
              <button
                onClick={(e) => CollectYearData(e)}
              >
                Get Data 
              </button>              
            )}
            <p className="ErrorMessage">{error}</p>
          </section>
          <section className="EnergyStatisticsMainContainer">
            <ol className="EnergyStatisticsSideBar">
              {Months.map((month, index) => (
                <button key={index}
                  className={`EnergyStatisticsSideBarItem ${selectedMonth === index && "EnergyStatisticsSelectedMonth"}`}
                  onClick={() => setSelectedMonth(index)}
                >
                  {month}
                </button>
              ))}
            </ol>
            <div className="EnergyStatisticsDataDisplay">
              <ul className="EnergyStatisticsMonthList">
                {responseCache.length > 0 ? responseCache[selectedMonth].EnergyUse.map((Use, index) => (
                  <li key={index}
                    className="EnergyStatisticsMonthDay"
                  >
                    <p>{index + 1}{getDayEnd(index)}</p>
                    <p>{Use}</p>
                  </li>
                ))
                : 
                <div>
                  No Data
                </div>
              }                
              </ul>
              {responseCache.length > 0 && responseCache[selectedMonth] && (
                  <EnergyChart 
                      ChartData={responseCache[selectedMonth].EnergyUse} 
                      Labels={Array.from({ length: responseCache[selectedMonth].EnergyUse.length }, (_, index) => index + 1)}
                      DESC={responseCache[selectedMonth].Month}
                  />
              )}
            </div>
          </section>
          { responseCache.length > 0 &&
            <section className="EnergyStatisticsDataSum">
              <p>Total use for {Months[selectedMonth]}: {responseCache[selectedMonth]?.EnergyUse.reduce((sum, data) => sum + data, 0)}</p>
              <p>Min use Day: {Math.min(...responseCache[selectedMonth]?.EnergyUse)}</p>
              <p>Peak use Day: {Math.max(...responseCache[selectedMonth]?.EnergyUse)}</p>
              <p>Percent of total for {Months[selectedMonth]}: {((responseCache[selectedMonth]?.EnergyUse.reduce((sum, data) => sum + data, 0) / collectTotal(responseCache)) * 100).toFixed(2)}%</p>
              <p>Total yearly use: {collectTotal(responseCache)}</p>
            </section>            
          }
        <button onClick={() => TestInsertData()}>Test</button>
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
function generateYearlyGraph(EnergyYear){
  let result = []

  for (const Data of Object.entries(EnergyYear)){
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
function createNewYear(year){
  return {
      Year: year,
      EnergyYear: [
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
        }
      ]
    };
  }