import "./Nav.css";

export default function Nav(){
    const navLinks = [
        {Name: "Home", Directory: "/"},
        {Name: "Your Use", Directory: "/EnergyStatistics/101"},
        {Name: "Transfer", Directory: "/Account/101"},
        {Name: "Contact", Directory: "/Contact"},
    ]
    return (
        <main className="NavBar">
            <section className="NavBarTitlingContainer">
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