import { FaHome, FaUsers, FaEnvelope, FaMoneyCheck, FaMoneyBill } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";


const Dashboard = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (user?.email) {
            axiosPublic.get(`/users`)
                .then(res => {
                    const loggedInUser = res.data.find(u => u.email === user.email);
                    if (loggedInUser) {
                        setRole(loggedInUser.role.toLowerCase()); 
                    } 
                })
                .catch(error => {
                    // console.error("Error fetching users:", error);
                });
        }
    }, [axiosPublic, user]);

    console.log("User Role:", role);
    // console.log(cart);


    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-64 min-h-screen bg-[#348BE9] text-white pt-9">
                <ul className="menu p-4">
                    {role === "admin" && (
                        <>
                            <li>
                                <NavLink to="/dashboard/adminHome">
                                    <FaHome /> Admin Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaUsers /> All Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/payment">
                                    <FaMoneyCheck /> Payroll
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/messages">
                                    <FaMoneyCheck /> All Messages
                                </NavLink>
                            </li>
                            
                        </>
                    )}

                    {role === "hr" && (
                        <>
                        <li>
                        <NavLink to="/dashboard/worklog">
                            <FaUsers /> Employee Working.........
                        </NavLink>
                        </li>
                        <li>
                        <NavLink to="/dashboard/employee">
                            <FaUsers /> All Employees
                        </NavLink>
                    </li></>
                    )}

                    {role === "employee" && (
                        <>
                        <li>
                        <NavLink to="/dashboard/work">
                            <FaUsers /> Employee Working
                        </NavLink>
                        <NavLink to="/dashboard/payment-history">
                            <FaMoneyBill /> Payment History
                        </NavLink>
                    </li>
                    </>
                    )}

                    {/* Shared Navigation */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">
                            <FaEnvelope /> Contact
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
