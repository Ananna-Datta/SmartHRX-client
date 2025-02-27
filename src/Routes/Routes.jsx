import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
// import Menu from "../pages/Menu/Menu/Menu";
// import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
// import Secret from "../pages/Shared/Secret/Secret";
import Contact from "../pages/Contact/Contact";
import Dashboard from "../Layout/Dashboard";
// import Cart from "../pages/Dashboard/Cart/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
// import AddItems from "../pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
// import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
// import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import AllEmployee from "../pages/Dashboard/AllUsers/AllEmployee";
import EmployeeWorkLog from "../pages/Dashboard/AllUsers/EmployeeWorkLog";
import ViewDetails from "../pages/Dashboard/Details/ViewDetails";
import Services from "../pages/Login/Sevices/Services";
import EmployeePerformance from "../pages/Home/Testimonials/EmployeePerformance";
import EmployeeAttendance from "../pages/Home/Testimonials/EmployeeAttendance";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        }, 
        {
          path: '/contact', 
          element: <Contact></Contact>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        },
        {
          path: 'services',
          element: <Services></Services>
        },
        {
          path: 'employeePerformance',
          element: <EmployeePerformance></EmployeePerformance>
        },
        {
          path: 'EmployeeAttendance',
          element: <EmployeeAttendance></EmployeeAttendance>
        },
      ]
    },
    {
      path: 'dashboard',
      element:<Dashboard></Dashboard>,
      children: [
    //     // normal user routes
        {
          path: 'userHome',
          element: <UserHome></UserHome>
        },
        { 
          path: "details/:id",  // Ensure it's properly nested with "dashboard"
          element: <ViewDetails />,
          loader: ({ params }) => fetch(`/details/${params.id}`), // Fetch data based on the id parameter
        },
      
        
        {
          path: 'payment',
          element: <Payment></Payment>
        },
        {
          path: 'payment-history',
          element: <PaymentHistory></PaymentHistory>
        },

        // admin only routes
        {
          path: 'adminHome',
          element:<AdminHome></AdminHome>
        },
        // {
        //   path: 'updateItem/:id',
        //   element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
        //   loader: ({params}) => fetch(`https://bistro-boss-server-seven-sage.vercel.app/menu/${params.id}`)
        // },
        {
          path: 'users',
          element: <AllUsers></AllUsers>
        },
        {
          path: 'employee',
          element: <AllEmployee></AllEmployee>
        },
        {
          path: 'work',
          element: <EmployeeWorkLog></EmployeeWorkLog>
        }

      ]
    }
  ]);