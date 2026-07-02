import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();

  // Core application input states - Perfectly matching your original setup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // Handler management to process simulation data storage safely
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
    <div className="min-h-screen bg-gradient-to-tr from-emerald-50 via-white to-teal-50/50 flex justify-center items-center p-4">
      
      {/* SHADOW CARD WRAPPER */}
      <div className="bg-white border border-emerald-100/70 p-8 rounded-3xl w-full max-w-md shadow-xl transition duration-300">
        
        {/* HEADING COMPONENT */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Create <span className="text-emerald-600">Account</span>
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Join the decentralized independent workforce network.
          </p>
        </div>

        {/* INPUT LAYOUT GROUPS */}
        <div className="space-y-4">
          
          {/* Name Field */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your professional name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition duration-200 text-sm"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition duration-200 text-sm"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition duration-200 text-sm"
            />
          </div>

          {/* ROLE SELECTOR PANEL */}
          <div className="pt-2">
            <p className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
              Select Market Identity Role
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              
              {/* Freelancer Choice Card */}
              <label className={`border p-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition text-sm font-semibold selection:bg-transparent ${role === "Freelancer" ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-bold shadow-sm" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                <input
                  type="radio"
                  name="role"
                  value="Freelancer"
                  checked={role === "Freelancer"}
                  onChange={(e) => setRole(e.target.value)}
                  className="accent-emerald-600"
                />
                Freelancer
              </label>

              {/* Client Choice Card */}
              <label className={`border p-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition text-sm font-semibold selection:bg-transparent ${role === "Client" ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-bold shadow-sm" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                <input
                  type="radio"
                  name="role"
                  value="Client"
                  checked={role === "Client"}
                  onChange={(e) => setRole(e.target.value)}
                  className="accent-emerald-600"
                />
                Client
              </label>

            </div>
          </div>

        </div>

        {/* RE-STYLED ACTION MASTER TRIGGER */}
        <button
          onClick={handleSignup}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3.5 rounded-xl transition duration-300 transform hover:-translate-y-0.5 mt-6 shadow-md hover:shadow-xl cursor-pointer text-sm tracking-wide"
        >
          Sign Up
        </button>

        {/* NAVIGATION ACCOUNT REDIRECT RE-ROUTE */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?
          <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold ml-1 transition">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;




















// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";

// function Signup() {

//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");

//   const handleSignup = () => {

//     if (!name || !email || !password || !role) {
//       alert("Please fill all fields");
//       return;
//     }

//     const user = {
//       name,
//       email,
//       password,
//       role,
//     };

//     localStorage.setItem("user", JSON.stringify(user));

//     alert("Signup Successful");

//     navigate("/login");
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-green-100">

//       <div className="border p-6 rounded w-80">

//         <h2 className="text-2xl font-bold text-center mb-4">
//           Sign Up
//         </h2>

//         <input
//           type="text"
//           placeholder="Enter Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="border p-2 w-full mb-3 rounded"
//         />

//         <input
//           type="email"
//           placeholder="Enter Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border p-2 w-full mb-3 rounded"
//         />

//         <input
//           type="password"
//           placeholder="Enter Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border p-2 w-full mb-3 rounded"
//         />

//         {/* Role Selection */}

//         <div className="mb-4">

//           <p className="font-semibold mb-2">
//             Select Role
//           </p>

//           <label className="mr-4">
//             <input
//               type="radio"
//               name="role"
//               value="Freelancer"
//               onChange={(e) => setRole(e.target.value)}
//             />{" "}
//             Freelancer
//           </label>

//           <label>
//             <input
//               type="radio"
//               name="role"
//               value="Client"
//               onChange={(e) => setRole(e.target.value)}
//             />{" "}
//             Client
//           </label>

//         </div>

//         <button
//           onClick={handleSignup}
//           className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600 cursor-pointer"
//         >
//           Sign Up
//         </button>

//         <p className="text-center mt-4">
//           Already have an account?
//           <Link to="/login" className="text-green-500 ml-1">
//             Login
//           </Link>
//         </p>

//       </div>

//     </div>
//   );
// }

// export default Signup;