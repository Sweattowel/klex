import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ( { children } ) => {
    const [ UserData, setUserData ] = useState({
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
    });

    return (
        <UserContext.Provider value={{ UserData, setUserData}}>
            {children}
        </UserContext.Provider>
    );
};