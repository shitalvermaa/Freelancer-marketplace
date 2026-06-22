import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">

      <div className="border p-6 rounded w-80">

        <h2 className="text-2xl font-bold text-center mb-4">
          Sign Up
        </h2>

        <input type="text" placeholder="Enter Name" className="border p-2 w-full mb-3 rounded"/>

        <input type="email" placeholder="Enter Email" className="border p-2 w-full mb-3 rounded"/>

        <input type="password" placeholder="Enter Password" className="border p-2 w-full mb-3 rounded"/>

        <button className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600">
          Sign Up
        </button>

        <p className="text-center mt-4">
          Already have an account?
          <Link to="/login" className="text-green-500 ml-1">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;