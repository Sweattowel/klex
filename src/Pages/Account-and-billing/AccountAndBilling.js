import { useParams } from "react-router-dom";
import "./AccountAndBilling.css"
import { useContext, useEffect } from "react";
import { useState } from "react";
import Login from "../../GlobalComponents/Login/Login";
import { ThemeContext } from "../../GlobalComponents/Context/ThemeContextProvider";


const DummyAccount = {
    AccountName: "John Doe",
    AccountEmail: "johndoe@example.com",
    AccountID: 101,
    AccountPassword: "TEST",
    AccountStartDate: new Date("2022-01-15"),
    AccountBillingPeriod: "Monthly",
    AccountLastBillDate: new Date("2024-11-01"),
    AccountComingBillDate: new Date("2024-12-01"),
    AccountPriorBillings: [
        { Amount: 9.99, Date: new Date("2024-11-01"), Status: "Pending" },
        { Amount: 9.99, Date: new Date("2024-10-01"), Status: "Paid" },
        { Amount: 9.99, Date: new Date("2024-09-01"), Status: "Paid" },
    ],
    SubScriptionDetails: {
        CurrentPlan: "General",
        AutoRenew: false,
        FollowUpDate: new Date("2026-01-01")
    },    
    AccountDiscrepency: {
        Count: 7,
        DiscrepencyDates: [
            new Date("1/01/2001"),
            new Date("1/01/2001"),
            new Date("1/01/2001"),
            new Date("1/01/2001"),
            new Date("1/01/2001"),
            new Date("1/01/2001"),
            new Date("1/12/2015"),
        ]
    },
    AccountSettings: {
        SelectedTheme: "Light",
        PushAdvertisement: false,
        Active: true,
        NotificationPreferences: {
            Email: true,
            SMS: false,
            PushNotifications: true
        },
        PrivacySettings: {
            SensitiveData: true,
            DataShare: false
        }
    },
    LastLoginDate: new Date("1/12/2015"),
    CountLogins: 0,
    Security: {
        TwoFactorAuthentication: true,
        LoginAlert: true,
        SecurityQuestions: [
            { Question: "What was your first pet's name?", Answer: "Fluffy" },
            { Question: "What city were you born in?", Answer: "New York" },
        ],
        RegisteredLoginLocations: [
            {
                HardWare: "JohnDoePC", IP: "192.168.0.1", LoginCount: 2
            }
        ]
    },
    LanguageAndLocation: {
      Language: "English",
      TimeZone: "Etc/GMT-16"  
    },
    PriorSupport: [
        { TicketID: 13489412, Issue: "Overcharged", CustomerSupportOfficer: "Jill Jane", CustomerSupportOfficerID: 3141245, TicketStatus: "Resolved"}
    ]

};


export default function AccountAndBilling(){
    const {theme, setTheme, themeAlt, setThemeAlt} = useContext(ThemeContext);
    const UserID = useParams();
    const [AccountData, setAccountData] = useState({
        AccountName: "",
        AccountEmail: "",
        AccountID: -1,
        AccountStartDate: new Date("2000-01-00"),
        AccountBillingPeriod: "Monthly",
        AccountLastBillDate: new Date("2000-01-00"),
        AccountComingBillDate: new Date("2000-01-00"),
        AccountDiscrepency: {
            Count: 0,
            DiscrepencyDates: []
        },
        AccountPriorBillings: -1
    })
    useEffect(() => {
        console.log(UserID)
    },[])
    
    /*if (!AccountData || AccountData.AccountID === -1){
        return(
            <main className={`${theme}`}>
                <Login />
            </main>
        )
    }*/
    return (
        <main className={`AccountAndBilling ${theme}`}>
            <section className="AccountContainer">
                <h1 className={`AccountTitle ${themeAlt}`}>
                    Account: {AccountData.AccountName}
                </h1>
                <div className="AccountDivisionContainer">
                    <h2 className={`AccountDivisionTitle ${themeAlt}`}>
                        General Information
                    </h2>
                    <p className="AccountDivisionItem">{DummyAccount.AccountName}</p>
                    <p className="AccountDivisionItem">{DummyAccount.AccountID}</p>
                    <p className="AccountDivisionItem">{DummyAccount.AccountEmail}</p>
                    <p className="AccountDivisionItem">{DummyAccount.AccountBillingPeriod}</p>
                    <p className="AccountDivisionItem">
                        {DummyAccount.AccountLastBillDate.toISOString().split("T")[0]}
                    </p>
                    <p className="AccountDivisionItem">
                        {DummyAccount.AccountComingBillDate.toISOString().split("T")[0]}
                    </p>
                    <p className="AccountDivisionItem">
                        {GetAge(DummyAccount.LastLoginDate)} Days since last login
                    </p>
                    <p className="AccountDivisionItem">
                        {GetAge(DummyAccount.AccountStartDate)} Days old
                    </p>
                </div>
                <div className="AccountDivisionContainer">
                    <h2 className={`AccountDivisionTitle ${themeAlt}`}>
                        Billings
                    </h2>
                    <ul className="AccountDivisionList">
                        {DummyAccount.AccountPriorBillings.map((Billing, index) => (
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
                            {DummyAccount.SubScriptionDetails.CurrentPlan}
                        </p>
                        <p className="AccountDivisionDivisionItem">
                            {DummyAccount.SubScriptionDetails.AutoRenew
                                ? "AutoRenew"
                                : "No AutoRenew"}
                        </p>
                        <p className="AccountDivisionDivisionItem">
                            {DummyAccount.SubScriptionDetails.FollowUpDate.toISOString().split("T")[0]}
                        </p>
                    </div>
                </div>
                <div className="AccountDivisionContainer">
                    <h2 className={`AccountDivisionTitle ${themeAlt}`}>
                        Account Settings
                    </h2>
                    <p className="AccountDivisionItem">{DummyAccount.AccountSettings.Active}</p>
                    <div className="AccountDivisionDivision">
                        <h3 className={`${themeAlt}`}>
                            Notification Preferences
                        </h3>
                        <p className="AccountDivisionDivisionItem">{DummyAccount.AccountSettings.NotificationPreferences.Email ? "ON" : "OFF"}</p>
                        <p className="AccountDivisionDivisionItem">{DummyAccount.AccountSettings.NotificationPreferences.PushNotifications ? "ON" : "OFF"}</p>
                        <p className="AccountDivisionDivisionItem">{DummyAccount.AccountSettings.NotificationPreferences.SMS ? "ON" : "OFF"}</p>
                    </div>
                    <div className="AccountDivisionDivision">
                        <h3 className={`${themeAlt}`}>
                            Privacy Settings
                        </h3>
                        <p className="AccountDivisionDivisionItem">{DummyAccount.AccountSettings.PrivacySettings.DataShare ? "ON" : "OFF"}</p>
                        <p className="AccountDivisionDivisionItem">{DummyAccount.AccountSettings.PrivacySettings.SensitiveData ? "ON" : "OFF"}</p>
                    </div>
                    <div className="AccountDivisionDivision">
                        <h3 className={`${themeAlt}`}>
                            Other
                        </h3>
                        <p className="AccountDivisionItem">{DummyAccount.AccountSettings.PushAdvertisement}</p>
                        <p className="AccountDivisionItem">{DummyAccount.AccountSettings.SelectedTheme}</p>                        
                        <p className="AccountDivisionItem">{DummyAccount.LanguageAndLocation.Language}</p>                        
                        <p className="AccountDivisionItem">{DummyAccount.LanguageAndLocation.TimeZone}</p>                         
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
                            {DummyAccount.AccountDiscrepency.DiscrepencyDates.map((Discrepency, index) => (
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
                            {DummyAccount.PriorSupport.map((Support, index) => (
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
                <button className="SaveButton">SAVE</button>
            </section>
        </main>

    )
}    
function GetAge(StartDate){
    const CurrDate = new Date();

    return ((CurrDate.getTime() - StartDate.getTime()) / 1000 / 60 / 60 / 24).toFixed(0);
}