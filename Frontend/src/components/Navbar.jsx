import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const syncUser = () => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  useEffect(() => {
    syncUser();
  }, [location]);

  useEffect(() => {
    // Catches login/logout/profile updates immediately, even without a route change
    window.addEventListener("authchange", syncUser);
    window.addEventListener("storage", syncUser);
    return () => {
      window.removeEventListener("authchange", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.dispatchEvent(new Event("authchange"));
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between px-8 py-5 h-20 border-b bg-white">
      <h1 className="text-3xl font-extrabold text-emerald-600">
        💼FreelancerHub
      </h1>

      <ul className="flex items-center gap-6 cursor-pointer">
        <li className="relative hover:text-emerald-500 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-emerald-600 after:transition-all hover:after:w-full">
          <Link to="/">Home</Link>
        </li>

        {!user && (
          <>
            <li className="relative hover:text-emerald-500 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-emerald-600 after:transition-all hover:after:w-full">
              <Link to="/aboutus">About Us</Link>
            </li>
            <li className="relative hover:text-emerald-500 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-[2px] after:bg-emerald-600 after:transition-all hover:after:w-full">
              <Link to="/findwork">Find Work</Link>
            </li>
            <li className="relative hover:text-emerald-500 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-emerald-600 after:transition-all hover:after:w-full">
              <Link to="/findtalent">Find Talent</Link>
            </li>
          </>
        )}

        {user && (
          <>
            {user.role === "Client" ? (
              <>
                {/* 🚨 FIXED: Client ke liye Find Talent, Portfolio aur Dashboard TEENO rakha hai */}
                <li className="relative hover:text-emerald-500 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-emerald-600 after:transition-all hover:after:w-full">
                  <Link to="/findtalent">Find Talent</Link>
                </li>
                <li className="relative hover:text-emerald-500 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-emerald-600 after:transition-all hover:after:w-full">
                  <Link to="/portfolioform">Portfolio</Link>
                </li>
                <li className="relative hover:text-emerald-500 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-emerald-600 after:transition-all hover:after:w-full">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              </>
            ) : (
              <>
                <li className="relative hover:text-emerald-500 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-emerald-600 after:transition-all hover:after:w-full">
                  <Link to="/findwork">Find Work</Link>
                </li>
                <li className="relative hover:text-emerald-500 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-emerald-600 after:transition-all hover:after:w-full">
                  <Link to="/portfolioform">Portfolio</Link>
                </li>
                <li className="relative hover:text-emerald-500 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-emerald-600 after:transition-all hover:after:w-full">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              </>
            )}
          </>
        )}
      </ul>

      {!user ? (
        <div className="flex gap-3">
          <Link to="/login">
            <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded hover:from-emerald-600 hover:to-teal-700 cursor-pointer">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded hover:from-emerald-600 hover:to-teal-700 cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      ) : (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
        >
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;