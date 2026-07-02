import { Link } from "react-router-dom";

function Dashboard() {
  // Reading stored session payload exactly matching your original architecture
  const portfolio = JSON.parse(localStorage.getItem("portfolio"));

  if (!portfolio) {
    return (
      <div className="text-center min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-4">
        <div className="bg-white border border-red-100 p-8 md:p-12 rounded-3xl shadow-xl max-w-md w-full">
          <div className="text-5xl mb-4">💼</div>
          <h1 className="text-3xl font-extrabold text-red-500 tracking-tight">
            No Portfolio Found
          </h1>
          <p className="mt-3 text-gray-500 text-sm leading-relaxed">
            Please configure your professional freelance details first to activate your personal overview dashboard.
          </p>
          <Link to="/portfolioform">
            <button className="mt-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold px-6 py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition duration-300 transform hover:-translate-y-0.5 shadow-md cursor-pointer">
              Create Portfolio Setup
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* HERO GREETING HEADER BANNER */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl shadow-xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6 mb-10 text-white">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-white/30 shadow-lg object-cover"
          />
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Welcome Back, {portfolio.name} 👋
            </h1>
            <p className="text-emerald-100 text-lg mt-1 font-medium">
              {portfolio.profession}
            </p>
          </div>
        </div>

        {/* TOP LEVEL NAVIGATION SHORTCUTS */}
        <div className="flex gap-3 w-full sm:w-auto">
          <Link to="/portfolioform" className="w-1/2 sm:w-auto text-center">
            <button className="w-full bg-white text-emerald-700 font-bold px-5 py-3 rounded-xl hover:bg-emerald-50 transition shadow-sm text-sm cursor-pointer">
              Edit Portfolio
            </button>
          </Link>
          <Link to="/findwork" className="w-1/2 sm:w-auto text-center">
            <button className="w-full bg-gray-900 text-white font-bold px-5 py-3 rounded-xl hover:bg-gray-800 transition shadow-sm text-sm cursor-pointer">
              Find Work
            </button>
          </Link>
        </div>
      </div>

      {/* DASHBOARD NUMERIC OVERVIEW SECTION */}
      <h2 className="text-2xl font-extrabold mb-6 text-gray-900 tracking-tight">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {/* Status Verification Card */}
        <div className="bg-white border border-emerald-100/70 rounded-2xl shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition">
          <div className="text-4xl p-3 bg-emerald-50 rounded-xl">✅</div>
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Portfolio Status</h3>
            <p className="text-emerald-600 font-extrabold text-lg mt-0.5">Completed</p>
          </div>
        </div>

        {/* Applications Counter Card */}
        <div className="bg-white border border-emerald-100/70 rounded-2xl shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition">
          <div className="text-4xl p-3 bg-emerald-50 rounded-xl">📂</div>
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Projects Applied</h3>
            <p className="text-gray-900 font-extrabold text-2xl mt-0.5">{localStorage.getItem("appliedCount") || "0"}</p>
          </div>
        </div>

        {/* Tenure Display Card */}
        <div className="bg-white border border-emerald-100/70 rounded-2xl shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition">
          <div className="text-4xl p-3 bg-emerald-50 rounded-xl">💼</div>
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Experience</h3>
            <p className="text-gray-900 font-extrabold text-2xl mt-0.5">{portfolio.experience}</p>
          </div>
        </div>
      </div>

      {/* TWO-COLUMN CONFIGURATION DETAIL DESK */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: CORE CREDENTIALS PROFILE CARD */}
        <div className="bg-white border border-emerald-100/70 rounded-2xl shadow-sm p-6 sm:p-8 hover:shadow-md transition">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">
            Profile Information
          </h2>

          <div className="space-y-5">
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">👤 Full Name</h3>
              <p className="text-gray-800 font-semibold text-base mt-1">{portfolio.name}</p>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">💼 Marketplace Identity</h3>
              <p className="text-gray-800 font-semibold text-base mt-1">{portfolio.profession}</p>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">📧 Communication Mail</h3>
              <p className="text-gray-800 font-semibold text-base mt-1 break-all">{portfolio.email}</p>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">🌐 Live Workspace Channel</h3>
              <a
                href={portfolio.portfolioLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-semibold hover:text-blue-700 underline text-sm block mt-1 break-all"
              >
                {portfolio.portfolioLink}
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CORE SUMMARY / TECH SKILL MATRIX PILLS */}
        <div className="space-y-6">
          
          {/* Verified Skills Display */}
          <div className="bg-white border border-emerald-100/70 rounded-2xl shadow-sm p-6 hover:shadow-md transition">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">
              My Core Skills
            </h2>
            <div className="flex flex-wrap gap-2 pt-2">
              {portfolio.skills.split(",").map((skill, index) => (
                <span
                  key={index}
                  className="bg-emerald-50 text-emerald-700 border border-emerald-100/50 px-3.5 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wide"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* About Summary Block */}
          <div className="bg-white border border-emerald-100/70 rounded-2xl shadow-sm p-6 hover:shadow-md transition">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">
              Professional Biography
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
              {portfolio.about}
            </p>
          </div>

          {/* Operational Fast Actions Panel */}
          <div className="bg-white border border-emerald-100/70 rounded-2xl shadow-sm p-6 hover:shadow-md transition">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4 pt-1">
              <Link to="/portfolioform">
                <button className="w-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold py-3 rounded-xl transition text-sm cursor-pointer text-center">
                  ✏️ Edit Profile
                </button>
              </Link>
              <Link to="/findwork">
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition text-sm shadow-sm cursor-pointer text-center">
                  💼 Search Listings
                </button>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;












// import { Link } from "react-router-dom";

// function Dashboard() {

//   const portfolio = JSON.parse(localStorage.getItem("portfolio"));

//   if (!portfolio) {
//     return (
//       <div className="text-center mt-24">

//         <h1 className="text-4xl font-bold text-red-500">
//           No Portfolio Found
//         </h1>

//         <p className="text-gray-600 mt-4">
//           Please create your portfolio first.
//         </p>

//         <Link to="/portfolioform">
//           <button className="mt-6 bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 cursor-pointer">
//             Create Portfolio
//           </button>
//         </Link>

//       </div>
//     );
//   }

//   return (

//     <div className="max-w-7xl mx-auto px-10 py-10">

//       {/* Header */}

//       <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl shadow-xl p-8 flex justify-between items-center mb-8">

//         <div className="flex items-center gap-6">

//           <img
//             src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//             alt="profile"
//             className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
//           />

//           <div>

//             <h1 className="text-4xl font-bold text-white">
//               Welcome Back, {portfolio.name} 👋
//             </h1>

//             <p className="text-white text-xl mt-2">
//               {portfolio.profession}
//             </p>

//           </div>

//         </div>

//         <div className="flex gap-4">

//           <Link to="/portfolioform">
//             <button className="bg-white text-emerald-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 cursor-pointer transition">
//               Edit Portfolio
//             </button>
//           </Link>

//           <Link to="/findwork">
//             <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 cursor-pointer transition">
//               Find Work
//             </button>
//           </Link>

//         </div>

//       </div>

//       {/* Dashboard Stats */}

//       <h2 className="text-3xl font-bold mb-6 text-gray-800">
//         Dashboard Overview
//       </h2>

//       <div className="grid grid-cols-3 gap-6 mb-10">

//         <div className="bg-white border rounded-2xl shadow-lg p-7 hover:-translate-y-1 hover:shadow-2xl transition">

//           <div className="text-5xl mb-3">
//             ✅
//           </div>

//           <h3 className="text-xl font-bold">
//             Portfolio
//           </h3>

//           <p className="text-emerald-600 font-semibold mt-2">
//             Completed
//           </p>

//         </div>

//         <div className="bg-white border rounded-2xl shadow-lg p-7 hover:-translate-y-1 hover:shadow-2xl transition">

//           <div className="text-5xl mb-3">
//             📂
//           </div>

//           <h3 className="text-xl font-bold">
//             Projects Applied
//           </h3>

//           <p className="text-3xl font-bold text-emerald-600 mt-2">
//             0
//           </p>

//         </div>

//         <div className="bg-white border rounded-2xl shadow-lg p-7 hover:-translate-y-1 hover:shadow-2xl transition">

//           <div className="text-5xl mb-3">
//             💼
//           </div>

//           <h3 className="text-xl font-bold">
//             Experience
//           </h3>

//           <p className="text-3xl font-bold text-emerald-600 mt-2">
//             {portfolio.experience}
//           </p>

//         </div>

//       </div>

//       {/* Main Content */}

//       <div className="grid grid-cols-2 gap-8">

//         {/* Profile Card */}

//         <div className="bg-white border rounded-2xl shadow-lg p-8 hover:shadow-xl transition">

//           <h2 className="text-2xl font-bold text-emerald-700 mb-6">
//             Profile Information
//           </h2>

//           <div className="space-y-5">

//             <div>

//               <h3 className="font-semibold text-gray-600">
//                 👤 Full Name
//               </h3>

//               <p className="text-lg mt-1">
//                 {portfolio.name}
//               </p>

//             </div>

//             <div>

//               <h3 className="font-semibold text-gray-600">
//                 💼 Profession
//               </h3>

//               <p className="text-lg mt-1">
//                 {portfolio.profession}
//               </p>

//             </div>

//             <div>

//               <h3 className="font-semibold text-gray-600">
//                 📧 Email
//               </h3>

//               <p className="text-lg mt-1">
//                 {portfolio.email}
//               </p>

//             </div>

//             <div>

//               <h3 className="font-semibold text-gray-600">
//                 🌐 Portfolio
//               </h3>

//               <a
//                 href={portfolio.portfolioLink}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-blue-600 underline"
//               >
//                 {portfolio.portfolioLink}
//               </a>

//             </div>

//           </div>

//         </div>
//                 {/* Right Side */}

//         <div className="space-y-8">

//           {/* Skills */}

//           <div className="bg-white border rounded-2xl shadow-lg p-8 hover:shadow-xl transition">

//             <h2 className="text-2xl font-bold text-emerald-700 mb-6">
//               My Skills
//             </h2>

//             <div className="flex flex-wrap gap-3">

//               {portfolio.skills.split(",").map((skill, index) => (

//                 <span
//                   key={index}
//                   className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-semibold hover:bg-emerald-600 hover:text-white transition cursor-pointer"
//                 >
//                   {skill.trim()}
//                 </span>

//               ))}

//             </div>

//           </div>

//           {/* About */}

//           <div className="bg-white border rounded-2xl shadow-lg p-8 hover:shadow-xl transition">

//             <h2 className="text-2xl font-bold text-emerald-700 mb-6">
//               About Me
//             </h2>

//             <p className="text-gray-700 leading-8">
//               {portfolio.about}
//             </p>

//           </div>

//           {/* Quick Actions */}

//           <div className="bg-white border rounded-2xl shadow-lg p-8 hover:shadow-xl transition">

//             <h2 className="text-2xl font-bold text-emerald-700 mb-6">
//               Quick Actions
//             </h2>

//             <div className="flex flex-col gap-5">

//               <Link to="/portfolioform">

//                 <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition cursor-pointer">

//                   ✏ Edit Portfolio

//                 </button>

//               </Link>

//               <Link to="/findwork">

//                 <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition cursor-pointer">

//                   💼 Find Work

//                 </button>

//               </Link>

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// }

// export default Dashboard;