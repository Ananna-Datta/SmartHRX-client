import SectionTitle from "../../../components/SectionTitle/SectionTitle";
// import healthIcon from "../../../assets/icons/health-icon.svg";
// import perksIcon from "../../../assets/icons/perks-icon.svg";
// import retirementIcon from "../../../assets/icons/retirement-icon.svg";
import emp3 from "../../../assets/home/emp3.png"

const EmployeeBenefits = () => {
    return (
        <section className="py-20 px-6 lg:px-16 bg-gradient-to-r from-blue-500 to-teal-500 text-white">
            <SectionTitle
                subHeading="Empowering You"
                heading="Explore Employee Benefits"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                {/* Health & Wellness Card */}
                <div className="p-8 bg-white text-center rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                    <img 
                        src={emp3} 
                        alt="Health & Wellness" 
                        className="w-16 h-16 mx-auto mb-6" 
                    />
                    <h3 className="text-3xl font-bold text-blue-600">Health & Wellness</h3>
                    <p className="text-gray-600 mt-4">Comprehensive health coverage to ensure you stay healthy and happy. Includes medical, dental, and vision benefits.</p>
                </div>

                {/* Employee Perks Card */}
                <div className="p-8 bg-white text-center rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                    <img 
                        src={emp3} 
                        alt="Employee Perks" 
                        className="w-16 h-16 mx-auto mb-6" 
                    />
                    <h3 className="text-3xl font-bold text-blue-600">Employee Perks</h3>
                    <p className="text-gray-600 mt-4">Enjoy exclusive discounts, wellness programs, and much more to improve your work-life balance.</p>
                </div>

                {/* Retirement Plans Card */}
                <div className="p-8 bg-white text-center rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                    <img 
                        src={emp3} 
                        alt="Retirement Plans" 
                        className="w-16 h-16 mx-auto mb-6" 
                    />
                    <h3 className="text-3xl font-bold text-blue-600">Retirement Plans</h3>
                    <p className="text-gray-600 mt-4">Secure your future with our retirement plans, including 401(k) and additional employer contributions.</p>
                </div>
            </div>
        </section>
    );
};

export default EmployeeBenefits;
