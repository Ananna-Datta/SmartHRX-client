import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Featured from "../Featured/Featured";
import Testimonials from "../Testimonials/Testimonials";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Services from "../../Login/Sevices/Services";
import EmployeePerformance from "../Testimonials/EmployeePerformance";
import EmployeeAttendance from "../Testimonials/EmployeeAttendance";
import CompanyNews from "../Testimonials/CompanyNews";
import EmployeeBenefits from "../Testimonials/EmployeeBenefits";
import Team from "./Team";
import FAQ from "./FAQ.JSX";

const Home = () => {

    const axiosPublic = useAxiosPublic();
    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    });
    return (
        <div>

            <Helmet>
                <title>SmartHRX | Home</title>
            </Helmet>
            <Banner></Banner>
            {/* <h2 className="text-3xl">Total Users: {users.length}</h2> */} 
             {/* <Category></Category> */}
            <Services></Services>
            <Featured></Featured>
            <Testimonials></Testimonials>
            <CompanyNews></CompanyNews>
            <EmployeePerformance></EmployeePerformance>
            <EmployeeBenefits></EmployeeBenefits>
            <Team></Team>
            <EmployeeAttendance></EmployeeAttendance>
            <FAQ></FAQ>


        </div>
    );
};

export default Home;