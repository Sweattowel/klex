import "./Tail.css"


const Links = [
    {LinkName: "Home", Link: "/"},
    {LinkName: "Your use", Link: "/EnergyStatistics/101"},
    {LinkName: "Account & billing", Link: "/Account/101"},
    {LinkName: "Contact", Link: "/Contact"},
]

export default function Tail() {
    return (
        <main className="TailContainer">
            <section className="TailTopContainer">
                <h2 className="TailTitle">
                    Klex
                </h2>
                <ul className="PageLinkContainer">
                    {Links.map((link, index) => (
                        <a className="PageLink" href={link.Link}
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
                <button className="ReturnToTopButton"
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