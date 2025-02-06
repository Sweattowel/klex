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
                NotifyByEmail: false,
                NotifyBySMS: false,
                NotifyByPH: false,
                PushNotifications: false
            },
            PrivacySettings: {
                PrivacySensitiveData: false,
                PrivacyDataShare: false
            }
        },
        LastLoginDate: new Date("1/12/2015"),
        CountLogins: 0,
        Security: {
            SecurityTwoFactor: false,
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
/*
                "SelectedTheme" = ${UserData.AccountSettings.SelectedTheme},
                "PushAdvertisement" = ${UserData.AccountSettings.PushAdvertisement},
                "Active" = ${UserData.AccountSettings.Active},

                "NotifyByEmail" = ${UserData.AccountSettings.NotificationPreferences.NotifyByEmail},
                "NotifyBySMS" = ${UserData.AccountSettings.NotificationPreferences.NotifyBySMS},
                "NotifyByPH" = ${UserData.AccountSettings.NotificationPreferences.NotifyByPH},

                "PushNotifications" = ${UserData.AccountSettings.NotificationPreferences.PushNotifications},

                "PrivacySensitiveData" = ${UserData.AccountSettings.PrivacySettings.PrivacySensitiveData},
                "PrivacyDataShare" = ${UserData.AccountSettings.PrivacySettings.PrivacyDataShare},

                "SecurityTwoFactor" = ${UserData.Security.SecurityTwoFactor},
                "LoginAlert" = ${UserData.Security.LoginAlert},

                "Language" = ${UserData.LanguageAndLocation.Language},
                "TimeZone" = ${UserData.LanguageAndLocation.TimeZone}
*/