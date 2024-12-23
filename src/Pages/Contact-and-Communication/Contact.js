import { useContext, useState } from "react";
import { ThemeContext } from "../../GlobalComponents/Context/ThemeContextProvider";
import "./Contact.css"

const services = [
    {
        ServiceName: "Electrical",
        ServiceType: "General",
        ServiceDescription: "Provides electrical repairs, installations, and maintenance services for residential and commercial properties.",
        SuccessfullUsage: "Handled over @ projects with a 95% customer satisfaction rate.",
        CallOutCount: 300,
        workDisplay: [
            {
                workDisplayTitle: "Code Compliance Excellence",
                workDisplayImage: "https://s3-ap-southeast-2.amazonaws.com/os-data-2/electrotraining-com-au/images/pageattached/76/blogskale__big_eelctrician-female.jpg",
            },
            {
                workDisplayTitle: "Expert Wiring Services",
                workDisplayImage: "https://s3-ap-southeast-2.amazonaws.com/os-data-2/electrotraining-com-au/images/pageattached/76/blogskale__big_eelctrician-female.jpg",
            },
            {
                workDisplayTitle: "Safe and Reliable Repairs",
                workDisplayImage: "https://s3-ap-southeast-2.amazonaws.com/os-data-2/electrotraining-com-au/images/pageattached/76/blogskale__big_eelctrician-female.jpg",
            },
        ],
        Phone: "0143237089123",
        Email: "www.KlexEnergyAndIndustry/Electrical@General.com.au"
    },
    {
        ServiceName: "Data",
        ServiceType: "Data & Information",
        ServiceDescription: "Offers data analysis, cloud storage solutions, and IT infrastructure support.",
        SuccessfullUsage: "Supported @+ clients with optimized data storage and processing solutions.",
        CallOutCount: 300,
        workDisplay: [
            {
                workDisplayTitle: "Cutting-Edge Cloud Storage",
                workDisplayImage: "https://s3-ap-southeast-2.amazonaws.com/os-data-2/electrotraining-com-au/images/pageattached/76/blogskale__big_eelctrician-female.jpg",
            },
            {
                workDisplayTitle: "Seamless Data Solutions",
                workDisplayImage: "https://s3-ap-southeast-2.amazonaws.com/os-data-2/electrotraining-com-au/images/pageattached/76/blogskale__big_eelctrician-female.jpg",
            },
            {
                workDisplayTitle: "Reliable IT Infrastructure",
                workDisplayImage: "https://s3-ap-southeast-2.amazonaws.com/os-data-2/electrotraining-com-au/images/pageattached/76/blogskale__big_eelctrician-female.jpg",
            },
        ],
        Phone: "0145482093654",
        Email: "www.KlexEnergyAndIndustry/Data@Info.com.au"
    },
    {
        ServiceName: "Electrical Infrastructure",
        ServiceType: "Government",
        ServiceDescription: "Specializes in setting up and maintaining large-scale electrical systems for public infrastructure.",
        SuccessfullUsage: "Successfully completed @ government projects, ensuring compliance with regulations.",
        CallOutCount: 300,
        workDisplay: [
            {
                workDisplayTitle: "Innovative Power Solutions",
                workDisplayImage: "https://s3-ap-southeast-2.amazonaws.com/os-data-2/electrotraining-com-au/images/pageattached/76/blogskale__big_eelctrician-female.jpg",
            },
            {
                workDisplayTitle: "Scalable Infrastructure Projects",
                workDisplayImage: "https://s3-ap-southeast-2.amazonaws.com/os-data-2/electrotraining-com-au/images/pageattached/76/blogskale__big_eelctrician-female.jpg",
            },
            {
                workDisplayTitle: "Government Compliance Guaranteed",
                workDisplayImage: "https://s3-ap-southeast-2.amazonaws.com/os-data-2/electrotraining-com-au/images/pageattached/76/blogskale__big_eelctrician-female.jpg",
            },
        ],
        Phone: "0147834591263",
        Email: "www.KlexEnergyAndIndustry/Electrical@Government.com.au"
    },
    {
        ServiceName: "Commercial Fitouts",
        ServiceType: "Commercial",
        ServiceDescription: "Provides interior fit-out solutions for retail and office spaces, including custom designs.",
        SuccessfullUsage: "Completed @+ fit-out projects with a focus on functionality and aesthetics.",
        CallOutCount: 300,
        workDisplay: [
            {
                workDisplayTitle: "Functional Design Solutions",
                workDisplayImage: "https://s3-ap-southeast-2.amazonaws.com/os-data-2/electrotraining-com-au/images/pageattached/76/blogskale__big_eelctrician-female.jpg",
            },
            {
                workDisplayTitle: "Bespoke Office Spaces",
                workDisplayImage: "https://s3-ap-southeast-2.amazonaws.com/os-data-2/electrotraining-com-au/images/pageattached/76/blogskale__big_eelctrician-female.jpg",
            },
            {
                workDisplayTitle: "Retail Space Transformations",
                workDisplayImage: "https://s3-ap-southeast-2.amazonaws.com/os-data-2/electrotraining-com-au/images/pageattached/76/blogskale__big_eelctrician-female.jpg",
            },
        ],
        Phone: "0149637824510",
        Email: "www.KlexEnergyAndIndustry/Fitouts@Commercial.com.au"
    },
    {
        ServiceName: "Commercial Fitouts",
        ServiceType: "Industrial",
        ServiceDescription: "Delivers tailored fit-out solutions for warehouses, factories, and industrial facilities.",
        SuccessfullUsage: "Transformed over @ industrial spaces to enhance operational efficiency.",
        CallOutCount: 300,
        workDisplay: [
            {
                workDisplayTitle: "Optimized Warehouse Layouts",
                workDisplayImage: "https://s3-ap-southeast-2.amazonaws.com/os-data-2/electrotraining-com-au/images/pageattached/76/blogskale__big_eelctrician-female.jpg",
            },
            {
                workDisplayTitle: "Custom Industrial Fitouts",
                workDisplayImage: "https://s3-ap-southeast-2.amazonaws.com/os-data-2/electrotraining-com-au/images/pageattached/76/blogskale__big_eelctrician-female.jpg",
            },
            {
                workDisplayTitle: "Factory Efficiency Upgrades",
                workDisplayImage: "https://s3-ap-southeast-2.amazonaws.com/os-data-2/electrotraining-com-au/images/pageattached/76/blogskale__big_eelctrician-female.jpg",
            },
        ],
        Phone: "0142948573165",
        Email: "www.KlexEnergyAndIndustry/Fitouts@Industrial.com.au"
    }
];


export default function Contact() {
    const {theme, setTheme, themeAlt, setThemeAlt} = useContext(ThemeContext);
    const [selectedService, setSelectedService] = useState("");

    return (
        <main className={`ContactPage ${theme}`}>
            <h2 className="ContactPageTitle">
                Contact a member of our team!
            </h2>
            <section className='ServiceSection'>
                <h2 className={`ServicesSectionTitle ${themeAlt}`}>
                    Our Services
                </h2>
                <ul className='ServicesContainer'>
                    {services.map((service, index) => (
                        <li className='Service'
                            key={index}
                        >
                            <h2 className={`ServiceName ${themeAlt}`}>
                                {service.ServiceName}
                            </h2>
                            <p  className='ServiceType'>{service.ServiceType}</p>
                            <p  className='ServiceDescription'>{service.ServiceDescription}</p>
                            <p  className='ServiceUsage'>{service.SuccessfullUsage.split("@")[0]} {service.CallOutCount} {service.SuccessfullUsage.split("@")[1]}</p>
                            <section className="WorkDisplayItemContainer">
                                {service.workDisplay.map((workDisplayItem, workDisplayItemIndex) => (
                                    <div className="WorkDisplayItem"
                                        key={workDisplayItemIndex}
                                    >
                                        <h4 className={`WorkDisplayItemTitle ${themeAlt}`}>{workDisplayItem.workDisplayTitle}</h4>
                                        <img className="WorkDisplayItemPicture" src={workDisplayItem.workDisplayImage} alt={workDisplayItem.workDisplayTitle}/>
                                    </div>
                                ))}                                
                            </section>
                            <p className={`ContactInformation ${themeAlt}`}>Section Email: {service.Email}</p>
                            <p className={`ContactInformation ${themeAlt}`}>Section Phone: {service.Phone}</p>
                        </li>
                    ))}
                </ul>
            </section>


        </main>
    )
}