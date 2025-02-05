import { useContext } from "react";
import "./Nav.css";
import { UserContext } from "../Context/UserContextProvider";
import { ThemeContext } from "../Context/ThemeContextProvider";
import { Link } from "react-router-dom";

export default function Nav(){

    const { UserData, setUserData } = useContext(UserContext);
    const {theme, setTheme, themeAlt, setThemeAlt} = useContext(ThemeContext);

    const navLinks = [
        {Name: "Home", Directory: "/"},
        {Name: "Your Use", Directory: `/EnergyStatistics/${UserData.AccountID || "NULL"}`},
        {Name: "Transfer", Directory: `/Account/${UserData.AccountID || "NULL"}`},
        {Name: "Contact", Directory: "/Contact"},
    ]
    return (
        <main className={`NavBar ${theme}`}>
            <section className="NavBarTitlingContainer" id="TopOfPage">
                <h1 className={`NavBarTitle ${themeAlt}`}>
                    Klex
                </h1>      
                <h2 className="NavBarSubTitle">
                    Energy Management Solutions
                </h2>          
            </section>

            <ul className="NavBarItemContainer">
                {navLinks.map((link, index) => (
                    <Link className={`NavBarItems ${themeAlt}`} to={link.Directory} key={index}>
                        {link.Name}
                    </Link>
                ))}           
            </ul>

        </main>
    )
}