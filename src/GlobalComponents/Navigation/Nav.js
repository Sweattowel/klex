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
        {Name: "Your Use", Directory: `/EnergyStatistics/?UserID=${UserData.ID || "NULL"}`},
        {Name: "Transfer", Directory: `/Account/?UserID=${UserData.ID || "NULL"}`},
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
                <button className={`NavBarItems ${themeAlt}`}
                    onClick={() => {
                        setTheme(theme === "Dark" ? "Light" : "Dark")
                        setThemeAlt(themeAlt === "altDark" ? "altLight" : "altDark")
                    }}
                >
                    {theme}
                </button>                
            </ul>

        </main>
    )
}