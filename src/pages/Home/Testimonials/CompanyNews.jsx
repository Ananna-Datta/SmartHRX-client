import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import emp1 from "../../../assets/home/emp1.png"
import emp2 from "../../../assets/home/emp2.png"
import emp3 from "../../../assets/home/emp3.png"

const CompanyNews = () => {
    return (
        <section className="my-20 px-6 lg:px-16  py-16 bg-gradient-to-r from-blue-500 to-teal-500 text-white">
            <SectionTitle
                subHeading="Stay Updated"
                heading="Company News & Updates"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                <div className="p-6 bg-white shadow-lg rounded-2xl text-center transform transition duration-300 hover:scale-105">
                    <img 
                        src={emp1} 
                        alt="New Branch" 
                        className="w-full h-48 object-cover rounded-xl mb-4" 
                    />
                    <h3 className="text-2xl font-semibold text-orange-500">New Branch Opening</h3>
                    <p className="text-gray-600 mt-4">We are excited to announce our new branch opening in the downtown area!</p>
                    {/* <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">Read More</button> */}
                </div>
                <div className="p-6 bg-white shadow-lg rounded-2xl text-center transform transition duration-300 hover:scale-105">
                    <img 
                        src={emp2} 
                        alt="Training" 
                        className="w-full h-48 object-cover rounded-xl mb-4" 
                    />
                    <h3 className="text-2xl font-semibold text-orange-500">Employee Training</h3>
                    <p className="text-gray-600 mt-4">Our employees recently completed an advanced training session to improve services.</p>
                    {/* <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">Read More</button> */}
                </div>
                <div className="p-6 bg-white shadow-lg rounded-2xl text-center transform transition duration-300 hover:scale-105">
                    <img 
                        src={emp3}
                        alt="Award" 
                        className="w-full h-48 object-cover rounded-xl mb-4" 
                    />
                    <h3 className="text-2xl font-semibold text-orange-500">Award Recognition</h3>
                    <p className="text-gray-600 mt-4">We have been recognized as the best service provider of the year.</p>
                    {/* <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">Read More</button> */}
                </div>
            </div>
        </section>
    );
};

export default CompanyNews;
