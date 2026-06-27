import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSignup = () => {

    if (!name || !email || !password || !role) {
      alert("Please fill all fields");
      return;
    }

    const user = {
      name,
      email,
      password,
      role,
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Signup Successful");

    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">

      <div className="border p-6 rounded w-80">

        <h2 className="text-2xl font-bold text-center mb-4">
          Sign Up
        </h2>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        {/* Role Selection */}

        <div className="mb-4">

          <p className="font-semibold mb-2">
            Select Role
          </p>

          <label className="mr-4">
            <input
              type="radio"
              name="role"
              value="Freelancer"
              onChange={(e) => setRole(e.target.value)}
            />{" "}
            Freelancer
          </label>

          <label>
            <input
              type="radio"
              name="role"
              value="Client"
              onChange={(e) => setRole(e.target.value)}
            />{" "}
            Client
          </label>

        </div>

        <button
          onClick={handleSignup}
          className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600 cursor-pointer"
        >
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