import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import NavBar from "../pages/Shared/NavBar/NavBar";

const Main = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes("login") || location.pathname.includes("signup");

    return (
        <div className="min-h-screen flex flex-col">
            {!noHeaderFooter && 
            <div >

                <NavBar />
            </div>}

            <div className='max-w-screen-xl mx-auto pt-20 flex-grow'>
                <Outlet />
            </div>

            {!noHeaderFooter && <Footer />}
        </div>
    );
};

export default Main;
