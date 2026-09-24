import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [profession, setProfession] = useState("");
  const [customProfession, setCustomProfession] = useState("");

  const professionOptions = [
    "Web Development",
    "Graphic Design",
    "Content Writing",
    "Digital Marketing",
    "UI/UX Design",
    "App Development",
    "Other",
  ];

  const finalProfession = profession === "Other" ? customProfession.trim() : profession;

  const handleSignup = async () => {
    if (!name || !email || !password || !role) {
      alert("Please fill all fields");
      return;
    }

    if (role === "Freelancer" && !finalProfession) {
      alert("Please select or enter your speciality");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          profession: role === "Freelancer" ? finalProfession : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup Successful");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Something went wrong. Is your backend server running?");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-emerald-50 via-white to-teal-50/50 flex justify-center items-center p-4">
      <div className="bg-white border border-emerald-100/70 p-8 rounded-3xl w-full max-w-md shadow-xl transition duration-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Create <span className="text-emerald-600">Account</span>
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Join the decentralized independent workforce network.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
            <input type="text" placeholder="Enter your professional name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition duration-200 text-sm" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
            <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition duration-200 text-sm" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition duration-200 text-sm" />
          </div>

          <div className="pt-2">
            <p className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">Select Market Identity Role</p>
            <div className="grid grid-cols-2 gap-4">
              <label className={`border p-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition text-sm font-semibold selection:bg-transparent ${role === "Freelancer" ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-bold shadow-sm" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                <input type="radio" name="role" value="Freelancer" checked={role === "Freelancer"} onChange={(e) => setRole(e.target.value)} className="accent-emerald-600" />
                Freelancer
              </label>

              <label className={`border p-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition text-sm font-semibold selection:bg-transparent ${role === "Client" ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-bold shadow-sm" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                <input type="radio" name="role" value="Client" checked={role === "Client"} onChange={(e) => setRole(e.target.value)} className="accent-emerald-600" />
                Client
              </label>
            </div>
          </div>

          {role === "Freelancer" && (
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Your Speciality</label>
              <select
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition duration-200 text-sm bg-white"
              >
                <option value="" disabled>Select your speciality</option>
                {professionOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>

              {profession === "Other" && (
                <input
                  type="text"
                  placeholder="Enter your speciality (e.g. Video Editing)"
                  value={customProfession}
                  onChange={(e) => setCustomProfession(e.target.value)}
                  className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition duration-200 text-sm mt-2.5"
                />
              )}
            </div>
          )}
        </div>

        <button onClick={handleSignup} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3.5 rounded-xl transition duration-300 transform hover:-translate-y-0.5 mt-6 shadow-md hover:shadow-xl cursor-pointer text-sm tracking-wide">
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?
          <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold ml-1 transition">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;