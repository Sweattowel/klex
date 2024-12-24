import { useContext, useState } from "react";
import { ThemeContext } from "../../GlobalComponents/Context/ThemeContextProvider";
import "./Registration.css"
import { neon } from "@neondatabase/serverless";
export default function Registration(){
    const {theme, setTheme, themeAlt, setThemeAlt} = useContext(ThemeContext);
    const [registerFormData, setRegisterFormData] = useState({
        UserName: "",
        Email: "",
        Password: "",
        PasswordSecondEntry: "",
    });
    async function HandleRegister(e){
        try {
            e.preventDefault();

            console.log(`${Object.entries(registerFormData).map((key, value) => key[1])}`);
            const sql = neon(process.env.REACT_APP_DATABASE_URL);
            
            const VerifyNoError = await sql`
                SELECT COUNT(*) 
                FROM "Klex_UserData_General"
                WHERE "AccountName" = ${registerFormData.UserName}
                OR "AccountEmail" = ${registerFormData.Email};
            `          
            if (VerifyNoError[0].count === "0" || VerifyNoError[0].count === 0){
                const Insert = await sql`
                    INSERT INTO "Klex_UserData_General"("AccountName", "AccountEmail", "AccountPassword","AccountCreated")
                    VALUES (${registerFormData.UserName}, ${registerFormData.Email}, ${registerFormData.Password}, ${new Date()});
                `;   
                console.log("Success");
            } else {
                console.log("Details preOccupied")
            }
        } catch (error) {
            console.error(error);
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
                </form>                
            </section>

        </main>
    )
}