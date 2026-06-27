import { Link } from "react-router-dom";

function Dashboard() {

  const portfolio = JSON.parse(localStorage.getItem("portfolio"));

  if (!portfolio) {
    return (
      <div className="text-center mt-24">

        <h1 className="text-4xl font-bold text-red-500">
          No Portfolio Found
        </h1>

        <p className="text-gray-600 mt-4">
          Please create your portfolio first.
        </p>

        <Link to="/portfolioform">
          <button className="mt-6 bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 cursor-pointer">
            Create Portfolio
          </button>
        </Link>

      </div>
    );
  }

  return (

    <div className="max-w-7xl mx-auto px-10 py-10">

      {/* Header */}

      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl shadow-xl p-8 flex justify-between items-center mb-8">

        <div className="flex items-center gap-6">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
          />

          <div>

            <h1 className="text-4xl font-bold text-white">
              Welcome Back, {portfolio.name} 👋
            </h1>

            <p className="text-white text-xl mt-2">
              {portfolio.profession}
            </p>

          </div>

        </div>

        <div className="flex gap-4">

          <Link to="/portfolioform">
            <button className="bg-white text-emerald-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 cursor-pointer transition">
              Edit Portfolio
            </button>
          </Link>

          <Link to="/findwork">
            <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 cursor-pointer transition">
              Find Work
            </button>
          </Link>

        </div>

      </div>

      {/* Dashboard Stats */}

      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-3 gap-6 mb-10">

        <div className="bg-white border rounded-2xl shadow-lg p-7 hover:-translate-y-1 hover:shadow-2xl transition">

          <div className="text-5xl mb-3">
            ✅
          </div>

          <h3 className="text-xl font-bold">
            Portfolio
          </h3>

          <p className="text-emerald-600 font-semibold mt-2">
            Completed
          </p>

        </div>

        <div className="bg-white border rounded-2xl shadow-lg p-7 hover:-translate-y-1 hover:shadow-2xl transition">

          <div className="text-5xl mb-3">
            📂
          </div>

          <h3 className="text-xl font-bold">
            Projects Applied
          </h3>

          <p className="text-3xl font-bold text-emerald-600 mt-2">
            0
          </p>

        </div>

        <div className="bg-white border rounded-2xl shadow-lg p-7 hover:-translate-y-1 hover:shadow-2xl transition">

          <div className="text-5xl mb-3">
            💼
          </div>

          <h3 className="text-xl font-bold">
            Experience
          </h3>

          <p className="text-3xl font-bold text-emerald-600 mt-2">
            {portfolio.experience}
          </p>

        </div>

      </div>

      {/* Main Content */}

      <div className="grid grid-cols-2 gap-8">

        {/* Profile Card */}

        <div className="bg-white border rounded-2xl shadow-lg p-8 hover:shadow-xl transition">

          <h2 className="text-2xl font-bold text-emerald-700 mb-6">
            Profile Information
          </h2>

          <div className="space-y-5">

            <div>

              <h3 className="font-semibold text-gray-600">
                👤 Full Name
              </h3>

              <p className="text-lg mt-1">
                {portfolio.name}
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-gray-600">
                💼 Profession
              </h3>

              <p className="text-lg mt-1">
                {portfolio.profession}
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-gray-600">
                📧 Email
              </h3>

              <p className="text-lg mt-1">
                {portfolio.email}
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-gray-600">
                🌐 Portfolio
              </h3>

              <a
                href={portfolio.portfolioLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                {portfolio.portfolioLink}
              </a>

            </div>

          </div>

        </div>
                {/* Right Side */}

        <div className="space-y-8">

          {/* Skills */}

          <div className="bg-white border rounded-2xl shadow-lg p-8 hover:shadow-xl transition">

            <h2 className="text-2xl font-bold text-emerald-700 mb-6">
              My Skills
            </h2>

            <div className="flex flex-wrap gap-3">

              {portfolio.skills.split(",").map((skill, index) => (

                <span
                  key={index}
                  className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-semibold hover:bg-emerald-600 hover:text-white transition cursor-pointer"
                >
                  {skill.trim()}
                </span>

              ))}

            </div>

          </div>

          {/* About */}

          <div className="bg-white border rounded-2xl shadow-lg p-8 hover:shadow-xl transition">

            <h2 className="text-2xl font-bold text-emerald-700 mb-6">
              About Me
            </h2>

            <p className="text-gray-700 leading-8">
              {portfolio.about}
            </p>

          </div>

          {/* Quick Actions */}

          <div className="bg-white border rounded-2xl shadow-lg p-8 hover:shadow-xl transition">

            <h2 className="text-2xl font-bold text-emerald-700 mb-6">
              Quick Actions
            </h2>

            <div className="flex flex-col gap-5">

              <Link to="/portfolioform">

                <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition cursor-pointer">

                  ✏ Edit Portfolio

                </button>

              </Link>

              <Link to="/findwork">

                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition cursor-pointer">

                  💼 Find Work

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