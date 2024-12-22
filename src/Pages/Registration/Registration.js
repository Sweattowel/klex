import { useContext, useState } from "react";
import { ThemeContext } from "../../GlobalComponents/Context/ThemeContextProvider";
import "./Registration.css"
export default function Registration(){
    const {theme, setTheme, themeAlt, setThemeAlt} = useContext(ThemeContext);
    const [registerFormData, setRegisterFormData] = useState({
        UserName: "",
        Email: "",
        Password: "",
        PasswordSecondEntry: "",
    });
    function HandleRegister(e){
        e.preventDefault();

        console.log("{HAHA");
    }

    return (
        <main className={`RegistrationPage ${theme}`}>
            <h2 className="RegisterTitle">
                Register
            </h2>
            <section className="RegisterContainer">
                <p className={`RegisterSubtitle ${themeAlt}`}>
                    Having second thoughts? why not check out reviews and our catalogue while you decide <a href="/">CLICK HERE</a>
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
                    <button type="submit" className="RegisterSubmitButton">
                        Register
                    </button>
                </form>                
            </section>

        </main>
    )
}