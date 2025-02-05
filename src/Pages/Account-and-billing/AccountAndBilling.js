import "./AccountAndBilling.css"
import { useContext, useEffect } from "react";
import { useState } from "react";
import { ThemeContext } from "../../GlobalComponents/Context/ThemeContextProvider";
import Login from "../../GlobalComponents/Login/Login";
import { UserContext } from "../../GlobalComponents/Context/UserContextProvider";
import Loading from "../../GlobalComponents/Loading/Loading";
import API from "../../GlobalComponents/Interceptor/Interceptor";

export default function AccountAndBilling(){
    const {theme, setTheme, themeAlt, setThemeAlt} = useContext(ThemeContext);
    const {UserData, setUserData} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        if (UserData.AccountID && UserData.AccountCreated !== ""){
            CollectUserData();
        }
    },[])
    
    async function CollectUserData(){
        try {

            setLoading(true);
            if (!UserData.AccountID || !UserData.AccountName) return;
            let cachedData = sessionStorage.getItem("AccountData");
            if (cachedData && cachedData !== ""){
                setUserData((prevData) => ({...prevData, ...JSON.parse(cachedData)}));
                return
            }
            const response = await API.get(`/API/UserData/CollectSingleUser/${UserData.AccountID}`, {}, 
                {
                    headers: {
                        RequestType: "CollectUserDataRequest",
                        RequestDateSent: new Date(),
                        RelevantID: `${UserData.AccountID}`,
                        UserType: "Standard"
                    }             
                });

            if (response.status === 200) {
                setUserData((prevData) => ({...prevData, ...response.data}));
                sessionStorage.setItem("AccountData", JSON.stringify(response));
            }
            
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => setLoading(false), 200000)
            setLoading(false);
        }
    };  
      
    if (!UserData || UserData.AccountID === -1){
        return(
            <main className={`${theme}`}>
                <Login />
            </main>
        )
    }
    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <main className={`AccountAndBilling ${theme}`}>
            <section className="AccountContainer">
                <h1 className={`AccountTitle ${themeAlt}`}>
                    Account: {UserData.AccountName}
                </h1>
                <div className="AccountDivisionContainer">
                    <h2 className={`AccountDivisionTitle ${themeAlt}`}>
                        General Information
                    </h2>
                    <p className="AccountDivisionItem">Name: {UserData.AccountName}</p>
                    <p className="AccountDivisionItem">ID: {UserData.AccountID}</p>
                    <p className="AccountDivisionItem">Email Address: {UserData.AccountEmail}</p>
                    <p className="AccountDivisionItem">Billing Period: {UserData.AccountBillingPeriod || "None"}</p>
                    {UserData.AccountBillingPeriod &&
                        <div>
                            <p className="AccountDivisionItem">
                                Last bill date: {UserData.AccountLastBillDate === null ? UserData.AccountLastBillDate.toISOString().split("T")[0] : "NO DATA"}
                            </p>
                            <p className="AccountDivisionItem">
                                Coming bill date: {UserData.AccountComingBillDate === null ? UserData.AccountComingBillDate.toISOString().split("T")[0] : "NO DATA"}
                            </p>                            
                        </div>
                    }

                    <p className="AccountDivisionItem">
                        {GetAge(UserData.LastLoginDate)} Days since last login
                    </p>
                    <p className="AccountDivisionItem">
                        {GetAge(UserData.AccountCreated)} Days old
                    </p>
                </div>
                <div className="AccountDivisionContainer">
                    <h2 className={`AccountDivisionTitle ${themeAlt}`}>
                        Billings
                    </h2>
                    <ul className="AccountDivisionList">
                        {UserData.AccountBillingPeriod && UserData.AccountPriorBillings.map((Billing, index) => (
                            <li key={index} className="AccountDivisionListItemContainer">
                                <p className="AccountDivisionListItem">
                                    BilledDate: {Billing.Date.toISOString().split("T")[0]}
                                </p>
                                <p className="AccountDivisionListItem">Value: {Billing.Amount}</p>
                                <p className="AccountDivisionListItem">Status: {Billing.Status}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="AccountDivisionDivision">
                        <h3 className={`${themeAlt}`}>
                            Subscription Details
                        </h3>
                        <p className="AccountDivisionDivisionItem">
                            CurrentPlan: {UserData.SubScriptionDetails.CurrentPlan}
                        </p>
                        <p className="AccountDivisionDivisionItem">
                            Renew automatically? {UserData.SubScriptionDetails.AutoRenew
                                ? "Yes"
                                : "No"}
                        </p>
                        <p className="AccountDivisionDivisionItem">
                            FollowUpDate: {UserData.SubScriptionDetails.FollowUpDate && UserData.SubScriptionDetails.FollowUpDate.toISOString().split("T")[0]}
                        </p>
                    </div>
                </div>
                <div className="AccountDivisionContainer">
                    <h2 className={`AccountDivisionTitle ${themeAlt}`}>
                        Account Settings
                    </h2>
                    <p className="AccountDivisionItem">{UserData.AccountSettings.Active}</p>
                    <div className="AccountDivisionDivision">
                        <h3 className={`${themeAlt}`}>
                            Notification Preferences
                        </h3>
                        <p className="AccountDivisionDivisionItem">
                            Email: 
                            <button
                                onClick={() => 
                                    setUserData((prevData) => ({...prevData, AccountSettings: {
                                        ...prevData.AccountSettings,
                                            NotificationPreferences: {
                                                ...prevData.AccountSettings.NotificationPreferences,
                                                Email: !prevData.AccountSettings.NotificationPreferences.Email
                                            }
                                    }}))
                                }
                            > 
                                {UserData.AccountSettings.NotificationPreferences.Email && UserData.AccountSettings.NotificationPreferences.Email ? "ON" : "OFF"}
                            </button> 
                        </p>
                        <p className="AccountDivisionDivisionItem">
                            Push Notifications: 
                            <button
                                onClick={() => 
                                    setUserData((prevData) => ({...prevData, AccountSettings: {
                                        ...prevData.AccountSettings,
                                            NotificationPreferences: {
                                                ...prevData.AccountSettings.NotificationPreferences,
                                                PushNotifications: !prevData.AccountSettings.NotificationPreferences.PushNotifications
                                            }
                                    }}))
                                }
                            > 
                                {UserData.AccountSettings.NotificationPreferences.PushNotifications ? "ON" : "OFF"}
                            </button> 
                        </p>
                        <p className="AccountDivisionDivisionItem">
                            SMS: 
                            <button
                                onClick={() => 
                                    setUserData((prevData) => ({...prevData, AccountSettings: {
                                        ...prevData.AccountSettings,
                                            NotificationPreferences: {
                                                ...prevData.AccountSettings.NotificationPreferences,
                                                SMS: !UserData.AccountSettings.NotificationPreferences.SMS
                                            }
                                    }}))
                                }
                            > 
                                {UserData.AccountSettings.NotificationPreferences.SMS ? "ON" : "OFF"}
                            </button>  
                        </p>
                    </div>
                    <div className="AccountDivisionDivision">
                        <h3 className={`${themeAlt}`}>
                            Privacy Settings
                        </h3>
                        <p className="AccountDivisionDivisionItem">
                            Share data: 
                            <button
                                onClick={() => 
                                    setUserData((prevData) => ({...prevData, AccountSettings: {
                                        ...prevData.AccountSettings,
                                            PrivacySettings: {
                                                ...prevData.AccountSettings.PrivacySettings,
                                                DataShare: !UserData.AccountSettings.PrivacySettings.DataShare
                                            }
                                    }}))
                                }
                            > 
                                {UserData.AccountSettings.PrivacySettings.DataShare ? "ON" : "OFF"}
                            </button> 
                        </p>
                        <p className="AccountDivisionDivisionItem">
                            Account is sensitive: 
                            <button
                                onClick={() => 
                                    setUserData((prevData) => ({...prevData, AccountSettings: {
                                        ...prevData.AccountSettings,
                                            PrivacySettings: {
                                                ...prevData.AccountSettings.PrivacySettings,
                                                SensitiveData: !UserData.AccountSettings.PrivacySettings.SensitiveData
                                            }
                                    }}))
                                }
                            > 
                                {UserData.AccountSettings.PrivacySettings.SensitiveData ? "ON" : "OFF"}
                            </button> 
                        </p>
                    </div>
                    <div className="AccountDivisionDivision">
                        <h3 className={`${themeAlt}`}>
                            Other
                        </h3>
                        <p className="AccountDivisionItem">
                            Receive Product Offers: 
                            <button
                                onClick={() => setUserData((prevData) => ({...prevData, AccountSettings: {
                                    ...prevData.AccountSettings,
                                    PushAdvertisement: !UserData.AccountSettings.PushAdvertisement
                                }}))}
                            > 
                                {UserData.AccountSettings.PushAdvertisement ? "On" : "Off"}
                            </button> 
                        </p>
                        <p className="AccountDivisionItem">
                            SelectedTheme:
                            <button
                                onClick={() => {
                                    setUserData((prevData) => ({...prevData, AccountSettings: {
                                    ...prevData.AccountSettings,
                                    SelectedTheme: UserData.AccountSettings.SelectedTheme === "Light" ? "Dark" : "Light"
                                }}))
                                setTheme(UserData.AccountSettings.SelectedTheme === "Dark" ? "Light" : "Dark")
                                setThemeAlt(UserData.AccountSettings.SelectedTheme === "Dark" ? "altLight" : "altDark")   
                                }}
                            > 
                                {UserData.AccountSettings.SelectedTheme}
                            </button>  
                        </p>                        
                        <div className="AccountDivisionItemDropDown"
                        >
                            Language: {UserData.LanguageAndLocation.Language}
                            <DropDownMenu MenuChoice={"Language"}/>
                        </div>                        
                        <div className="AccountDivisionItemDropDown">
                            TimeZone: {UserData.LanguageAndLocation.TimeZone}
                            <DropDownMenu MenuChoice={"TimeZone"}/>
                        </div>                         
                    </div>
                </div>
                <div className="AccountDivisionContainer">
                    <h2 className={`AccountDivisionTitle ${themeAlt}`}>
                        Discrepancies & Support
                    </h2>
                    <div className="AccountDivisionDivision">
                        <h3 className={`${themeAlt}`}>
                            Discrepancies
                        </h3>
                        <ul className="AccountDivisionList">
                            {UserData.AccountDiscrepency.DiscrepencyDates.map((Discrepency, index) => (
                                <li key={index} className="AccountDivisionListItem">
                                    {Discrepency.toISOString().split("T")[0]}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="AccountDivisionDivision">
                        <h3 className={`${themeAlt}`}>
                            Support
                        </h3>
                        <ul className="AccountDivisionList">
                            {UserData.PriorSupport.map((Support, index) => (
                                <li key={index} className="AccountDivisionListItemContainer">
                                    <p className="AccountDivisionListItem">Officer: {Support.CustomerSupportOfficer}</p>
                                    <p className="AccountDivisionListItem">OfficerID: {Support.CustomerSupportOfficerID}</p>
                                    <p className="AccountDivisionListItem">Issue: {Support.Issue}</p>
                                    <p className="AccountDivisionListItem">TicketID: {Support.TicketID}</p>
                                    <p className="AccountDivisionListItem">Status: {Support.TicketStatus}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <button className="SaveButton"
                    onClick={() => CollectUserData()}
                >
                    SAVE
                </button>
            </section>
        </main>

    )
    function GetAge(StartDate){
        const StartAsDate = new Date(StartDate);
        const CurrDate = new Date();

        return ((CurrDate.getTime() - StartAsDate.getTime()) / 1000 / 60 / 60 / 24).toFixed(0);
    }

    function DropDownMenu({MenuChoice}){
        const [visible, setVisible] = useState(false);
        
        const Languages = [
            "English",
            "Español",
            "Français",
            "Deutsch",
            "日本語",
            "Italiano",
            "New ze.. ACk new ze COUGH COUGH i cant, i cant do this",
        ];
        const TimeZones = [
            "UTC-12:00 (Baker Island, Howland Island)",
            "UTC-11:00 (American Samoa, Niue)",
            "UTC-10:00 (Hawaii, Tahiti)",
            "UTC-9:30 (Marquesas Islands)",
            "UTC-9:00 (Alaska, Gambier Islands)",
            "UTC-8:00 (Pacific Time - Los Angeles, Vancouver)",
            "UTC-7:00 (Mountain Time - Denver, Phoenix)",
            "UTC-6:00 (Central Time - Chicago, Mexico City)",
            "UTC-5:00 (Eastern Time - New York, Toronto, Lima)",
            "UTC-4:30 (Venezuela Time - Caracas)",
            "UTC-4:00 (Atlantic Time - Santiago, La Paz, Halifax)",
            "UTC-3:30 (Newfoundland Time - St. John's)",
            "UTC-3:00 (Buenos Aires, São Paulo, Montevideo)",
            "UTC-2:00 (South Georgia & South Sandwich Islands)",
            "UTC-1:00 (Azores, Cape Verde)",
            "UTC+0:00 (Greenwich Mean Time - London, Lisbon, Accra)",
            "UTC+1:00 (Central European Time - Berlin, Paris, Rome, Madrid)",
            "UTC+2:00 (Eastern European Time - Athens, Cairo, Johannesburg)",
            "UTC+3:00 (Moscow, Istanbul, Nairobi, Riyadh)",
            "UTC+3:30 (Iran Standard Time - Tehran)",
            "UTC+4:00 (Dubai, Baku, Samara)",
            "UTC+4:30 (Afghanistan - Kabul)",
            "UTC+5:00 (Pakistan, Yekaterinburg, Maldives)",
            "UTC+5:30 (India, Sri Lanka)",
            "UTC+5:45 (Nepal - Kathmandu)",
            "UTC+6:00 (Bangladesh, Bhutan, Omsk)",
            "UTC+6:30 (Myanmar, Cocos Islands)",
            "UTC+7:00 (Bangkok, Jakarta, Ho Chi Minh City)",
            "UTC+8:00 (China, Singapore, Perth, Manila)",
            "UTC+8:45 (Western Australia - Eucla)",
            "UTC+9:00 (Japan, Korea, Yakutsk)",
            "UTC+9:30 (Central Australia - Adelaide, Darwin)",
            "UTC+10:00 (Eastern Australia - Sydney, Melbourne, Vladivostok)",
            "UTC+10:30 (Lord Howe Island)",
            "UTC+11:00 (Solomon Islands, Magadan, Nouméa)",
            "UTC+12:00 (New Zealand, Fiji, Kamchatka)",
            "UTC+12:45 (New Zealand - Chatham Islands)",
            "UTC+13:00 (Samoa, Tonga, Tokelau)",
            "UTC+14:00 (Line Islands, Kiritimati)",
        ];

        if (!visible){
            return (
                <button
                    onClick={() => setVisible(!visible)}
                >
                    Menu
                </button>
            );
        }
        return (
            <ul
                className="AccountDivisionList"
            >
                {MenuChoice === "Language" && Languages.map((Language, index) => (
                    <button key={index} className="AccountDivisionListItem"
                        onClick={() => {
                            setUserData((prevData) => ({
                                ...prevData,
                                LanguageAndLocation: {
                                    ...prevData.LanguageAndLocation,
                                    Language: Language
                                }
                            }))
                            setVisible(false);
                        }}
                    >
                        {Language}
                    </button>
                ))}
                {MenuChoice === "TimeZone" && TimeZones.map((TimeZone, index) => (
                    <button key={index} className="AccountDivisionListItem"
                        onClick={() => {
                            setUserData((prevData) => ({
                                ...prevData,
                                LanguageAndLocation: {
                                    ...prevData.LanguageAndLocation,
                                    TimeZone: TimeZone
                                }
                            }))
                            setVisible(false);
                        }}
                    >
                        {TimeZone}
                    </button>
                ))}
            </ul>
        )
    }    
}    

