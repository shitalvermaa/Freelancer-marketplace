import { Link } from "react-router-dom";
function Login() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-green-100">

      <div className="border p-8 rounded-lg w-80">

        <h2 className=" text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <input type="email" placeholder="Enter Email" className="border p-2 w-full mb-4 rounded"/>

        <input type="password" placeholder="Enter Password" className="border p-2 w-full mb-4 rounded"/>

        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full bg-green-500 hover:bg-green-600 cursor-pointer">
          Login
        </button>

        <p className="text-center mt-4">
          Don't have an account?
          <Link to="/signup" className="text-green-500 ml-1">Sign Up</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;