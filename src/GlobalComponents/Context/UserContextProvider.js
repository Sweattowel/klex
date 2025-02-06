import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ( { children } ) => {
    const [ UserData, setUserData ] = useState({
        AccountName: "",
        AccountEmail: "",
        AccountID: -1,
        AccountPassword: "",
        AccountStartDate: new Date("2022-01-15"),
        AccountBillingPeriod: "Monthly",
        AccountLastBillDate: new Date("2024-11-01"),
        AccountComingBillDate: new Date("2024-12-01"),
        AccountPriorBillings: [],
        SubScriptionDetails: {
            CurrentPlan: "",
            AutoRenew: false,
            FollowUpDate: ""
        },    
        AccountDiscrepency: {
            Count: -1,
            DiscrepencyDates: []
        },
        AccountSettings: {
            SelectedTheme: "Light",
            PushAdvertisement: false,
            Active: false,
            NotificationPreferences: {
                Email: false,
                SMS: false,
                PH: false,
                PushNotifications: false
            },
            PrivacySettings: {
                SensitiveData: false,
                DataShare: false
            }
        },
        LastLoginDate: new Date("1/12/2015"),
        CountLogins: 0,
        Security: {
            TwoFactorAuthentication: false,
            LoginAlert: false,
            SecurityQuestions: [],
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
        PriorSupport: [ ]
    });

    return (
        <UserContext.Provider value={{ UserData, setUserData}}>
            {children}
        </UserContext.Provider>
    );
};