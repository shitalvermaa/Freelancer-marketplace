import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No account found. Please Sign Up first.");
      return;
    }

    if (
      email === storedUser.email &&
      password === storedUser.password
    ) {

      localStorage.setItem("isLoggedIn", "true");

      alert("Login Successful");

      navigate("/dashboard");

    } else {

      alert("Invalid Email or Password");

    }

  };

  return (
    <div className="min-h-screen flex justify-center items-center">

      <div className="border p-8 rounded-lg w-80">

        <h2 className=" text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />

        <button
          onClick={handleLogin}
          className="text-white px-4 py-2 rounded w-full bg-green-500 hover:bg-green-600 cursor-pointer"
        >
          Login
        </button>

        <p className="text-center mx-5">or</p>

        <button className="flex bg-white text-black rounded w-full border border-black px-4 py-2 gap-3 cursor-pointer hover:text-blue-500">
          <FcGoogle size={22} />
          Continue with Google
        </button>

        <p className="text-center mt-4">
          Don't have an account?
          <Link
            to="/signup"
            className="hover:text-green-700 text-green-500 ml-1"
          >
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;