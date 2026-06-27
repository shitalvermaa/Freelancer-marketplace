import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
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

        {!isLoggedIn && (
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

        {isLoggedIn && user?.role === "Freelancer" && (
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

        {isLoggedIn && user?.role === "Client" && (
          <>
            <li className="relative hover:text-emerald-500 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-emerald-600 after:transition-all hover:after:w-full">
              <Link to="/findtalent">Find Talent</Link>
            </li>

            <li className="relative hover:text-emerald-500 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-emerald-600 after:transition-all hover:after:w-full">
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </>
        )}

      </ul>

      {!isLoggedIn ? (

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