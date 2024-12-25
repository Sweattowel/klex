import "./AccountAndBilling.css"
import { useContext, useEffect } from "react";
import { useState } from "react";
import { ThemeContext } from "../../GlobalComponents/Context/ThemeContextProvider";
import { neon } from "@neondatabase/serverless";
import Login from "../../GlobalComponents/Login/Login";
import { UserContext } from "../../GlobalComponents/Context/UserContextProvider";
import { useParams } from "react-router-dom";
import Loading from "../../GlobalComponents/Loading/Loading";

export default function AccountAndBilling(){
    const {theme, setTheme, themeAlt, setThemeAlt} = useContext(ThemeContext);
    const {UserData, setUserData} = useContext(UserContext);
    const {UserID} = useParams();
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        if (UserData.AccountID){
            InitData();
        }
    },[])
    

    
    async function InitData(){
        try {
            setLoading(true);
            const DB = neon(process.env.REACT_APP_DATABASE_URL)
            

            const Billings = await DB`
                SELECT * 
                FROM "Klex_UserData_PriorBillings"
                WHERE "AccountID" = ${UserData.AccountID};
            `;
            const SubScriptionDetails = await DB`
                SELECT * 
                FROM "Klex_UserData_SubscriptionDetails"
                WHERE "AccountID" = ${UserData.AccountID};
            `;
            const Discrepancies = await DB`
                SELECT * 
                FROM "Klex_UserData_Discrepency"
                WHERE "AccountID" = ${UserData.AccountID};
            `;
            const AccountSettings = await DB`
                SELECT * 
                FROM "Klex_UserData_AccountSettings"
                WHERE "AccountID" = ${UserData.AccountID};
            `;
            console.log(Billings,
                SubScriptionDetails,
                Discrepancies,
                AccountSettings,
            "HERE DUMB CUNT")
                return
            setUserData((prevData) => ({
                ...prevData,
                AccountPriorBillings: [{...Billings[0]}],
                SubScriptionDetails: {...SubScriptionDetails},
                Discrepancies: [{...Discrepancies}],
                AccountSettings: {...AccountSettings}
            }))
            
        } catch (error) {
            console.error(error);
        } finally {
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
                    <p className="AccountDivisionItem">Billing Period{UserData.AccountBillingPeriod}</p>
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
                        {GetAge(UserData.AccountStartDate)} Days old
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
                        <p className="AccountDivisionDivisionItem">Email: {UserData.AccountSettings.NotificationPreferences.Email && UserData.AccountSettings.NotificationPreferences.Email ? "ON" : "OFF"}</p>
                        <p className="AccountDivisionDivisionItem">Push Notifications: {UserData.AccountSettings.NotificationPreferences.PushNotifications ? "ON" : "OFF"}</p>
                        <p className="AccountDivisionDivisionItem">SMS: {UserData.AccountSettings.NotificationPreferences.SMS ? "ON" : "OFF"}</p>
                    </div>
                    <div className="AccountDivisionDivision">
                        <h3 className={`${themeAlt}`}>
                            Privacy Settings
                        </h3>
                        <p className="AccountDivisionDivisionItem">Share data: {UserData.AccountSettings.PrivacySettings.DataShare ? "ON" : "OFF"}</p>
                        <p className="AccountDivisionDivisionItem">Account is sensitive: {UserData.AccountSettings.PrivacySettings.SensitiveData ? "ON" : "OFF"}</p>
                    </div>
                    <div className="AccountDivisionDivision">
                        <h3 className={`${themeAlt}`}>
                            Other
                        </h3>
                        <p className="AccountDivisionItem">Receive Product Offers: {UserData.AccountSettings.PushAdvertisement}</p>
                        <p className="AccountDivisionItem">SelectedTheme: {UserData.AccountSettings.SelectedTheme}</p>                        
                        <p className="AccountDivisionItem">Language: {UserData.LanguageAndLocation.Language}</p>                        
                        <p className="AccountDivisionItem">TimeZone: {UserData.LanguageAndLocation.TimeZone}</p>                         
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
                    onClick={() => InitData()}
                >
                    SAVE
                </button>
            </section>
        </main>

    )
}    
function GetAge(StartDate){
    const StartAsDate = new Date(StartDate);
    const CurrDate = new Date();

    return ((CurrDate.getTime() - StartAsDate.getTime()) / 1000 / 60 / 60 / 24).toFixed(0);
}