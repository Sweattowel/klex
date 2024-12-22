import { useContext } from "react";
import "./Nav.css";
import { UserContext } from "../Context/UserContextProvider";
import { ThemeContext } from "../Context/ThemeContextProvider";

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
                <h1 className="NavBarTitle">
                    Klex
                </h1>      
                <h2 className="NavBarSubTitle">
                    Energy Management Solutions
                </h2>          
            </section>

            <ul className="NavBarItemContainer">
                {navLinks.map((link, index) => (
                    <a className="NavBarItems" href={link.Directory} key={index}>
                        {link.Name}
                    </a>
                ))}
                <button className="NavBarItems"
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