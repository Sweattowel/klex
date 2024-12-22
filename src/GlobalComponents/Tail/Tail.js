import { useContext } from "react"
import "./Tail.css"
import { ThemeContext } from "../Context/ThemeContextProvider";


const Links = [
    {LinkName: "Home", Link: "/"},
    {LinkName: "Your use", Link: "/EnergyStatistics/101"},
    {LinkName: "Account & billing", Link: "/Account/101"},
    {LinkName: "Contact", Link: "/Contact"},
]

export default function Tail() {

    const {theme, setTheme, themeAlt, setThemeAlt} = useContext(ThemeContext);
    return (
        <main className={`TailContainer ${theme}`}>
            <section className="TailTopContainer">
                <h2 className="TailTitle">
                    Klex
                </h2>
                <ul className="PageLinkContainer">
                    {Links.map((link, index) => (
                        <a className={`PageLink ${themeAlt}`} href={link.Link}
                            key={index}    
                        >
                            {link.LinkName}
                        </a>
                    ))}
                </ul>                
            </section>
            <section className="TailBottomContainer">
                <p className="TailBottomText">
                    Lorem Ipsum est Lorem Ipsum est Lorem Ipsum est Lorem Ipsum est Lorem Ipsum est Lorem Ipsum est Lorem Ipsum est Lorem Ipsum est Lorem Ipsum est Lorem Ipsum est Lorem Ipsum est Lorem Ipsum est Lorem Ipsum est Lorem Ipsum est
                </p>
                <button className={`ReturnToTopButton ${themeAlt}`}
                    onClick={() => 
                        document.getElementById("TopOfPage").scrollIntoView({behavior: "smooth", block: "start"})
                    }
                >
                    Return to top
                </button>
            </section>

        </main>
    )
}