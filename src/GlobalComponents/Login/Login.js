import { useState } from "react";
import "./Login.css";

export default function Login(){
    const [loginFormData, setLoginFormData] = useState({
        UserName: "",
        Email: "",
        Password: "",
    });
    function HandleLogin(e){
        e.preventDefault();

        console.log("{HAHA");
    }
    
    return(
        <main className="LoginPage">
            <h2 className="LoginTitle">
                Log in
            </h2>
            <section className="LoginContainer">
                <p className="LoginSubtitle">
                    Please Enter your details in here, Or if your not yet registered <a href="/UserRegistration">CLICK HERE</a>
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
                    <button type="submit" className="LoginSubmitButton">
                        Login
                    </button>
                </form>                
            </section>

        </main>
    )
}