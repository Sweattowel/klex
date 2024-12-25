import { useContext, useState } from "react";
import { ThemeContext } from "../../GlobalComponents/Context/ThemeContextProvider";
import "./Registration.css"
import { neon } from "@neondatabase/serverless";
import { UserContext } from "../../GlobalComponents/Context/UserContextProvider";
export default function Registration(){
    const {theme, setTheme, themeAlt, setThemeAlt} = useContext(ThemeContext);
    const {userData, setUserData} = useContext(UserContext);
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
            const DB = neon(process.env.REACT_APP_DATABASE_URL);
            
            const VerifyNoError = await DB`
                SELECT COUNT(*) 
                FROM "Klex_UserData_General"
                WHERE "AccountName" = ${registerFormData.UserName}
                OR "AccountEmail" = ${registerFormData.Email};
            `          
            if (VerifyNoError[0].count === "0" || VerifyNoError[0].count === 0){
                const InsertGeneral = await DB`
                    INSERT INTO "Klex_UserData_General"("AccountName", "AccountEmail", "AccountPassword","AccountCreated")
                    VALUES (${registerFormData.UserName}, ${registerFormData.Email}, ${registerFormData.Password}, ${new Date()});
                `;   

                // NEED TO GET VALUES LIKE USERNAME AND DATE AFTERWARDS

                const CollectUserData = await DB`
                    SELECT * FROM "Klex_UserData_General"
                    WHERE "AccountName" = ${registerFormData.UserName} AND "AccountEmail" = ${registerFormData.Email} AND "AccountPassword" = ${registerFormData.Password};
                `
                if(CollectUserData[0]){
                    const dataToPlace = registerFormData[0];
                    const currDate = new Date();
    
                    const VerifyLogin = await DB`
                        UPDATE "Klex_UserData_General"
                        SET "LastLoginDate" = ${currDate}, "CountLogins" = ${Number(dataToPlace.CountLogins) + 1}
                        WHERE "AccountID" = ${Number(dataToPlace.AccountID)}
                    `
                    if (VerifyLogin){
                        console.log(registerFormData[0])
                        setUserData((prevData) => ({
                            ...prevData,
                            ...dataToPlace
                        }));
                        console.log("Logged in");
                        // USE DATA TO PLACE HERE FOR INIT OF ACCOUNT DATA
                        const InsertAccountSettings= await DB`
                            INSERT INTO "Klex_UserData_AccountSettings"("AccountID", "SelectedTheme","PushAdvertisement","Active","NotifyByEmail","NotifyBySMS","NotifyByPH","PushNotifications","PrivacySensitiveShare","PrivacyDataShare","SecurityTwoFactor","LoginAlert")
                            VALUES (${registerFormData.UserName}, ${registerFormData.Email}, ${registerFormData.Password}, ${new Date()});
                        `;  
                        const InsertGeneralSubscriptionDetails = await DB`
                            INSERT INTO "Klex_UserData_SubscriptionDetails"("CurrentPlan", "AutoRenew", "FollowUpDate","AccountID")
                            VALUES (${registerFormData.UserName}, ${registerFormData.Email}, ${registerFormData.Password}, ${new Date()});
                        `;                                              
                    }
                }

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