import { useContext, useState } from "react";
import "./Login.css";
import { ThemeContext } from "../Context/ThemeContextProvider";
import { neon } from "@neondatabase/serverless";
import { UserContext } from "../Context/UserContextProvider";
import API from "../Interceptor/Interceptor";

export default function Login(){
    
    const {theme, setTheme, themeAlt, setThemeAlt} = useContext(ThemeContext);
    const {UserData, setUserData} = useContext(UserContext);

    const [loginFormData, setLoginFormData] = useState({
        UserName: "",
        Email: "",
        Password: "",
    });
    async function HandleLogin(e){
        e.preventDefault();

        try {
            const response = await API.post(`API/UserData/UserLogin`, loginFormData, {
                headers: {
                    RequestType: "LoginRequest",
                    RequestDateSent: new Date(),
                    RelevantID: `NULL`,
                    UserType: "N/A"
                }  
            })
            if (response.status === 200){
                setUserData((prevData) => ({
                    ...prevData,
                    ...response.data.UserData
                }));
                console.log(response.data, "   v28CYN5 4T")
                setTheme(response.data.SelectedTheme[0].SelectedTheme);
                setThemeAlt(response.data.SelectedTheme[0].SelectedTheme === "Light" ? "altLight" : "altDark")
                console.log("Logged in")                    
            }

            
        } catch (error) {
            console.error(error)
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
                    <button type="submit" className={`LoginSubmitButton ${themeAlt}`}>
                        Login
                    </button>
                </form>                
            </section>

        </main>
    )
}