import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const testimonials = [
    {
        _id: "1",
        rating: 4.5,
        details: "Great service! Highly recommended.",
        name: "John Doe"
    },
    {
        _id: "2",
        rating: 5,
        details: "Exceptional experience! Will come back again.",
        name: "Jane Smith"
    },
    {
        _id: "3",
        rating: 4,
        details: "Very professional and friendly staff.",
        name: "Mike Johnson"
    }
];

const Testimonials = () => {
    return (
        <section className="my-20 px-6 lg:px-16">
            <SectionTitle
                subHeading="What Our Clients Say"
                heading="Testimonials"
            />

            <div className="max-w-4xl mx-auto bg-gray-100 p-8 rounded-2xl shadow-lg">
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {testimonials.map(review => (
                        <SwiperSlide key={review._id}>
                            <div className="flex flex-col items-center text-center px-6 py-10 bg-white shadow-md rounded-xl">
                                <Rating style={{ maxWidth: 180 }} value={review.rating} readOnly className="mb-4" />
                                <p className="py-6 text-gray-600 italic">“{review.details}”</p>
                                <h3 className="text-2xl font-semibold text-orange-500">{review.name}</h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;
