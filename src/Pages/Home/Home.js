import { useContext } from 'react';
import { ThemeContext, ThemeContextProvider } from '../../GlobalComponents/Context/ThemeContextProvider';
import './Home.css'

const reviews = [
    {ReviewName: "Cliff Unger", ReviewText: "Lorem Ipsum Sum", ReviewRating: 5},
    {ReviewName: "Werner", ReviewText: "Lorem Ipsum Sum Lorem Ipsum Sum Lorem Ipsum Sum", ReviewRating: 4},
    {ReviewName: "Tartarsckovsky", ReviewText: "Lorem Ipsum Sum", ReviewRating: 5},
    {ReviewName: "Peter Molyneux", ReviewText: "Lorem Ipsum Sum Lorem Ipsum Sum", ReviewRating: 4},
]

const services = [
    {
        ServiceName: "Electrical",
        ServiceType: "General",
        ServiceDescription: "Provides electrical repairs, installations, and maintenance services for residential and commercial properties.",
        SuccessfullUsage: "Handled over @ projects with a 95% customer satisfaction rate.",
        CallOutCount: 300,
        Link: ""
    },
    {
        ServiceName: "Data",
        ServiceType: "Data & Information",
        ServiceDescription: "Offers data analysis, cloud storage solutions, and IT infrastructure support.",
        SuccessfullUsage: "Supported @+ clients with optimized data storage and processing solutions.",
        CallOutCount: 300,
        Link: ""
    },
    {
        ServiceName: "Electrical Infrastructure",
        ServiceType: "Government",
        ServiceDescription: "Specializes in setting up and maintaining large-scale electrical systems for public infrastructure.",
        SuccessfullUsage: "Successfully completed @ government projects, ensuring compliance with regulations.",
        CallOutCount: 300,
        Link: ""
    },
    {
        ServiceName: "Commercial Fitouts",
        ServiceType: "Commercial",
        ServiceDescription: "Provides interior fit-out solutions for retail and office spaces, including custom designs.",
        SuccessfullUsage: "Completed @+ fit-out projects with a focus on functionality and aesthetics.",
        CallOutCount: 300,
        Link: ""
    },
    {
        ServiceName: "Commercial Fitouts",
        ServiceType: "Industrial",
        ServiceDescription: "Delivers tailored fit-out solutions for warehouses, factories, and industrial facilities.",
        SuccessfullUsage: "Transformed over @ industrial spaces to enhance operational efficiency.",
        CallOutCount: 300,
        Link: ""
    }
];

export default function Home(){
    const {theme, setTheme, themeAlt, setThemeAlt} = useContext(ThemeContext);

    return (
        <main className={`${theme}`}>
            <h1 className={`homeTitle ${themeAlt}`}>
               Who are we?
            </h1>

            <section className={`ProminentContainer ${theme}`}>
                <div className='ProminentReview'>
                    <p className={`ProminentReviewText ${themeAlt}`}>
                    Lorem Ipsum Sum Lorem Ipsum SumLorem Ipsum Sum Lorem Ipsum SumLorem Ipsum Sum Lorem Ipsum SumLorem Ipsum Sum Lorem Ipsum SumLorem Ipsum Sum Lorem Ipsum SumLorem Ipsum Sum Lorem Ipsum SumLorem Ipsum Sum Lorem Ipsum SumLorem Ipsum Sum Lorem Ipsum SumLorem Ipsum Sum Lorem Ipsum SumLorem Ipsum Sum Lorem Ipsum Sum
                    </p>
                    <h2 className='ProminentReviewName'>
                        -Ian Makarov
                    </h2>
                </div>
                <img className='ProminentPicture'  src='https://media.istockphoto.com/id/1428504492/photo/female-engineers-at-work-at-the-power-plant.jpg?s=612x612&w=0&k=20&c=3WAUWL3yneoSHTfvECSxlQWY4uA1y-KjoBR9XYMW65M=' alt='Employees within worksite wearing safety gear, observing work' />
            </section>

            <section className="ReviewListContainer">
                <h2 className="ReviewListTitle">Our Reviews</h2>
                <ul className={`ReviewList`}>
                    {reviews.map((review, index) => (
                        <li key={index} className={`Review`}>
                            <h3 className={`ReviewTitle`}>{review.ReviewName}</h3>
                            <p className={`ReviewText ${themeAlt}`}>{review.ReviewText}</p>
                            <p className="ReviewRating">{review.ReviewRating} / 5</p>
                        </li>
                    ))}
                </ul>
            </section>
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
                            <p  className='ServiceType'>
                                {service.ServiceType}
                            </p>
                            <p  className='ServiceDescription'>
                                {service.ServiceDescription}
                            </p>
                            <p  className='ServiceUsage'>
                                {service.SuccessfullUsage.split("@")[0]} {service.CallOutCount} {service.SuccessfullUsage.split("@")[1]}
                            </p>
                            <a  className={`ServiceLink ${themeAlt}`}
                                href={service.Link}
                            >
                                Find out more
                            </a>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    )
}