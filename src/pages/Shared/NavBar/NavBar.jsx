import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut().catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/contact">Contact Us</Link></li>
      {user && (
        <li><Link to="/dashboard">Dashboard</Link></li>
      )}
    </>
  );

  return (
    <div className="navbar fixed z-10 bg-opacity-30 bg-black text-white w-full">
      <div className="navbar w-full max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-slate-500 rounded-box w-52">
              {navOptions}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">SmartHRX</Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-2">
              <span>{user?.displayName}</span>
              <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button>
            </div>
          ) : (
            <Link to="/login" className="btn bg-[#3492a1] text-white">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
