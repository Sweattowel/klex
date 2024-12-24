import "./AccountAndBilling.css"
import { useContext, useEffect } from "react";
import { useState } from "react";
import { ThemeContext } from "../../GlobalComponents/Context/ThemeContextProvider";
import { neon } from "@neondatabase/serverless";
import Login from "../../GlobalComponents/Login/Login";
import { UserContext } from "../../GlobalComponents/Context/UserContextProvider";
import { useParams } from "react-router-dom";

export default function AccountAndBilling(){
    const {theme, setTheme, themeAlt, setThemeAlt} = useContext(ThemeContext);
    const {UserData, setUserData} = useContext(UserContext);
    const {UserID} = useParams();
    

    useEffect(() => {
        if (UserID){
            HandleCollectData();
        }
    },[])
    

    
    async function HandleCollectData(){
        try {
            const sql = neon(process.env.REACT_APP_DATABASE_URL)
            const CleanUserID = Number(UserID);
            console.log(UserID, CleanUserID, "USERID HERE");

            if (isNaN(CleanUserID)) {
                throw new Error(`Invalid UserID: ${UserID}. Expected a valid integer.`);
            }
            return
            const response = await sql`
                SELECT * 
                FROM "Klex_UserData_General"
                WHERE "AccountID" = ${CleanUserID};
            `;
            
            if (response){
                console.log(response);
            }
        } catch (error) {
            console.error(error);
        }
    };    

    if (!UserData || UserData.AccountID === -1){
        return(
            <main className={`${theme}`}>
                <Login />
            </main>
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
                    <p className="AccountDivisionItem">{UserData.AccountName}</p>
                    <p className="AccountDivisionItem">{UserData.AccountID}</p>
                    <p className="AccountDivisionItem">{UserData.AccountEmail}</p>
                    <p className="AccountDivisionItem">{UserData.AccountBillingPeriod}</p>
                    <p className="AccountDivisionItem">
                        {UserData.AccountLastBillDate.toISOString().split("T")[0]}
                    </p>
                    <p className="AccountDivisionItem">
                        {UserData.AccountComingBillDate.toISOString().split("T")[0]}
                    </p>
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
                        {UserData.AccountPriorBillings.map((Billing, index) => (
                            <li key={index} className="AccountDivisionListItemContainer">
                                <p className="AccountDivisionListItem">
                                    {Billing.Date.toISOString().split("T")[0]}
                                </p>
                                <p className="AccountDivisionListItem">{Billing.Amount}</p>
                                <p className="AccountDivisionListItem">{Billing.Status}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="AccountDivisionDivision">
                        <h3 className={`${themeAlt}`}>
                            Subscription Details
                        </h3>
                        <p className="AccountDivisionDivisionItem">
                            {UserData.SubScriptionDetails.CurrentPlan}
                        </p>
                        <p className="AccountDivisionDivisionItem">
                            {UserData.SubScriptionDetails.AutoRenew
                                ? "AutoRenew"
                                : "No AutoRenew"}
                        </p>
                        <p className="AccountDivisionDivisionItem">
                            {UserData.SubScriptionDetails.FollowUpDate.toISOString().split("T")[0]}
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
                        <p className="AccountDivisionDivisionItem">{UserData.AccountSettings.NotificationPreferences.Email ? "ON" : "OFF"}</p>
                        <p className="AccountDivisionDivisionItem">{UserData.AccountSettings.NotificationPreferences.PushNotifications ? "ON" : "OFF"}</p>
                        <p className="AccountDivisionDivisionItem">{UserData.AccountSettings.NotificationPreferences.SMS ? "ON" : "OFF"}</p>
                    </div>
                    <div className="AccountDivisionDivision">
                        <h3 className={`${themeAlt}`}>
                            Privacy Settings
                        </h3>
                        <p className="AccountDivisionDivisionItem">{UserData.AccountSettings.PrivacySettings.DataShare ? "ON" : "OFF"}</p>
                        <p className="AccountDivisionDivisionItem">{UserData.AccountSettings.PrivacySettings.SensitiveData ? "ON" : "OFF"}</p>
                    </div>
                    <div className="AccountDivisionDivision">
                        <h3 className={`${themeAlt}`}>
                            Other
                        </h3>
                        <p className="AccountDivisionItem">{UserData.AccountSettings.PushAdvertisement}</p>
                        <p className="AccountDivisionItem">{UserData.AccountSettings.SelectedTheme}</p>                        
                        <p className="AccountDivisionItem">{UserData.LanguageAndLocation.Language}</p>                        
                        <p className="AccountDivisionItem">{UserData.LanguageAndLocation.TimeZone}</p>                         
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
                                    <p className="AccountDivisionListItem">{Support.CustomerSupportOfficer}</p>
                                    <p className="AccountDivisionListItem">{Support.CustomerSupportOfficerID}</p>
                                    <p className="AccountDivisionListItem">{Support.Issue}</p>
                                    <p className="AccountDivisionListItem">{Support.TicketID}</p>
                                    <p className="AccountDivisionListItem">{Support.TicketStatus}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <button className="SaveButton"
                    onClick={() => HandleCollectData()}
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