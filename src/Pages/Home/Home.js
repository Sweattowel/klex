import './Home.css'

const reviews = [
    {ReviewName: "Cliff Unger", ReviewText: "Lorem Ipsum Sum", ReviewRating: 5},
    {ReviewName: "Werner", ReviewText: "Lorem Ipsum Sum Lorem Ipsum Sum Lorem Ipsum Sum", ReviewRating: 4},
    {ReviewName: "Tartarsckovsky", ReviewText: "Lorem Ipsum Sum", ReviewRating: 5},
    {ReviewName: "Peter Molyneux", ReviewText: "Lorem Ipsum Sum Lorem Ipsum Sum", ReviewRating: 4},
]

export default function Home(){
    return (
        <main>
            <h1 className='homeTitle'>
                Check it lout lout
            </h1>

            <section className='ProminentContainer'>
                <div className='ProminentReview'>
                    Prominent Review
                </div>
                <div className='ProminentPicture'>
                    Heartwarmingpicture
                </div>
            </section>

            <section className='ReviewListContainer'>
                <h2 className='ReviewListTitle'>
                    Our Reviews
                </h2>
                <ul className='ReviewList'>
                    {reviews.map((review, index) => (
                        <div className='Review'>
                            <h3 className='ReviewTitle'>
                                {review.ReviewName}
                            </h3>
                            <p className='ReviewText'>
                                {review.ReviewText}                                
                            </p>
                            <p className='ReviewRating'>
                                {review.ReviewRating} / 5
                            </p>
                        </div>
                    ))}                    
                </ul>

            </section>
            <section className='ServiceSection'>
                Services
            </section>
        </main>
    )
}