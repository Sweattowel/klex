import { useContext, useState } from "react";
import { ThemeContext } from "../../GlobalComponents/Context/ThemeContextProvider";
import "./Registration.css"
import { UserContext } from "../../GlobalComponents/Context/UserContextProvider";
import API from "../../GlobalComponents/Interceptor/Interceptor";

export default function Registration(){
    const {theme, setTheme, themeAlt, setThemeAlt} = useContext(ThemeContext);
    const {userData, setUserData} = useContext(UserContext);
    const [error, setError] = useState("");
    const [registerFormData, setRegisterFormData] = useState({
        UserName: "",
        Email: "",
        Password: "",
        PasswordSecondEntry: "",
    });
    async function HandleRegister(e){
        try {
            e.preventDefault();
            const response = await API.post("/API/UserData/HandleRegistration", registerFormData, 
            {
                headers: {
                    RequestType: "RegistrationOfUserRequest",
                    RequestDateSent: new Date(),
                    RelevantID: "NULL",
                    UserType: "Standard"
                }             
            });
            console.log(response)
            if (response.status === 200){
                console.log("Success")
                setError("Successfully created account");
            };

        } catch (error) {
            if (error.response && error.response.status === 409) {
                setError("UserData conflict, please enter new Username/Password");
            }
        };
    };

    return (
        <main className={`RegistrationPage`}>
            <h2 className="RegisterTitle">
                Register
            </h2>
            <section className="RegisterContainer">
                <p className={`RegisterSubtitle ${themeAlt}`}>
                    Having second thoughts? why not check out reviews and our catalogue while you decide <a href="/" className={`${theme}`}>CLICK HERE</a>
                </p>
                <form onSubmit={(e) => HandleRegister(e)} className="RegisterFormContainer">
                    <h3>Username</h3>
                    <input onChange={(e) => setRegisterFormData((prevData) => ({...prevData, UserName: e.target.value}))} value={ registerFormData.UserName}
                        className="RegisterTextInput" placeholder="Enter Username"
                    />
                    <h3>Email</h3>
                    <input onChange={(e) => setRegisterFormData((prevData) => ({...prevData, Email: e.target.value}))} value={ registerFormData.Email}
                        className="RegisterTextInput" placeholder="Enter Email"
                    />
                    <h3>Password</h3>
                    <input onChange={(e) => setRegisterFormData((prevData) => ({...prevData, Password: e.target.value}))} value={ registerFormData.Password}
                        className="RegisterTextInput" placeholder="Enter Password"
                    />
                    <h3>Password</h3>
                    <input onChange={(e) => setRegisterFormData((prevData) => ({...prevData, PasswordSecondEntry: e.target.value}))} value={ registerFormData.PasswordSecondEntry}
                        className="RegisterTextInput" placeholder="Enter Reenter Password"
                    />
                    <button type="submit" className={`RegisterSubmitButton ${themeAlt}`}>
                        Register
                    </button>
                    <p className="ErrorMessage">{error}</p>
                </form>                
            </section>

        </main>
    )
}