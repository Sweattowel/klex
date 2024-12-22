import { useContext } from "react";
import "./Nav.css";
import { UserContext } from "../Context/UserContextProvider";

export default function Nav(){

    const { UserData, setUserData } = useContext(UserContext);

    const navLinks = [
        {Name: "Home", Directory: "/"},
        {Name: "Your Use", Directory: `/EnergyStatistics/?UserID=${UserData.ID || "NULL"}`},
        {Name: "Transfer", Directory: `/Account/?UserID=${UserData.ID || "NULL"}`},
        {Name: "Contact", Directory: "/Contact"},
    ]
    return (
        <main className="NavBar">
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
            </ul>
        </main>
    )
}