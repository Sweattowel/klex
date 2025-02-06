import { useContext, useState } from "react";
import "./Login.css";
import { ThemeContext } from "../Context/ThemeContextProvider";
import { UserContext } from "../Context/UserContextProvider";
import API from "../Interceptor/Interceptor";

export default function Login(){
    
    const {theme, setTheme, themeAlt, setThemeAlt} = useContext(ThemeContext);
    const {UserData, setUserData} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [loginFormData, setLoginFormData] = useState({
        UserName: "",
        Email: "",
        Password: "",
    });
    async function HandleLogin(e){
        e.preventDefault();
        setLoading(true);
        try {
            const responseGeneral = await API.post(`API/General/LoginAccount`, loginFormData, {
                headers: { RequestType: "LoginRequest", RequestDateSent: new Date(), RelevantID: `NULL`, UserType: "General" }  
            })
            if (responseGeneral.status === 200){
                const UserSettings = await API.get(`API/AccountSettings/GetAccountSettings/${responseGeneral.data.UserData[0].AccountID}`, {}, {headers: { RequestType: "SettingRequest", RequestDateSent: new Date(), RelevantID: responseGeneral.data.UserData[0].AccountID, UserType: "General" }});
                console.log({                    
                    ...responseGeneral.data.UserData[0],
                    ...UserSettings.data.AccountSettings[0]
                })
                setUserData((prevData) => ({
                    ...prevData,
                    ...responseGeneral.data.UserData[0],
                    AccountSettings: {
                        ...prevData.AccountSettings,
                        AccountID: UserSettings.data.AccountSettings[0].AccountID,
                        Active: UserSettings.data.AccountSettings[0].Active,
                        Language: UserSettings.data.AccountSettings[0].Language,
                        LoginAlert: UserSettings.data.AccountSettings[0].LoginAlert,
                        NotificationPreferences: {
                            NotifyByEmail: UserSettings.data.AccountSettings[0].NotifyByEmail,
                            NotifyBySMS: UserSettings.data.AccountSettings[0].NotifyBySMS,
                            NotifyByPH: UserSettings.data.AccountSettings[0].NotifyByPH,
                            PushNotifications: UserSettings.data.AccountSettings[0].PushNotifications,
                        },
                        Security: {
                            SecurityTwoFactor: UserSettings.data.AccountSettings[0].SecurityTwoFactor,
                            LoginAlert: UserSettings.data.AccountSettings[0].LoginAlert,
                            SecurityQuestions: [],
                            RegisteredLoginLocations: [
                                {
                                    HardWare: "", IP: "", LoginCount: 2
                                }
                            ]
                        },
                        LanguageAndLocation: {
                            Language: UserSettings.data.AccountSettings[0].Language,
                            TimeZone: UserSettings.data.AccountSettings[0].TimeZone,
                        },      
                    },
                }));
                setTheme(UserSettings.data.AccountSettings[0].SelectedTheme);
                setThemeAlt(UserSettings.data.AccountSettings[0].SelectedTheme === "Light" ? "altLight" : "altDark")
                console.log("Logged in")                    
            }

            
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    
    return(
        <main className={`LoginPage ${theme}`}>
            <h2 className="LoginTitle">
                Log in
            </h2>
            <section className="LoginContainer">
                <p className={`LoginSubtitle ${themeAlt}`}>
                    Please Enter your details in here, Or if your not yet registered <a className={`${theme}`} href="/UserRegistration">CLICK HERE</a>
                </p>
                <form onSubmit={(e) => HandleLogin(e)} className="LoginFormContainer">
                    <h3>Username</h3>
                    <input onChange={(e) => setLoginFormData((prevData) => ({...prevData, UserName: e.target.value}))} value={ loginFormData.UserName}
                        className="LoginTextInput" placeholder="Enter Username"
                    />
                    <h3>Email</h3>
                    <input onChange={(e) => setLoginFormData((prevData) => ({...prevData, Email: e.target.value}))} value={ loginFormData.Email}
                        className="LoginTextInput" placeholder="Enter Email"
                    />
                    <h3>Password</h3>
                    <input onChange={(e) => setLoginFormData((prevData) => ({...prevData, Password: e.target.value}))} value={ loginFormData.Password}
                        className="LoginTextInput" placeholder="Enter Password"
                    />
                    {!loading ?
                    <button type="submit" className={`LoginSubmitButton ${themeAlt}`}>
                        Login
                    </button>
                    :
                    <p>Loading</p>
                    }
                </form>                
            </section>

        </main>
    )
}