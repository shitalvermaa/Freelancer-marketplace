import { Link } from "react-router-dom";

function PortfolioPreview() {
  // Reading session configuration precisely like your original logic
  const portfolio = JSON.parse(localStorage.getItem("portfolio"));

  if (!portfolio) {
    return (
      <div className="text-center min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-4">
        <div className="bg-white border border-red-100 p-8 md:p-12 rounded-3xl shadow-xl max-w-md w-full">
          <div className="text-5xl mb-4">📂</div>
          <h1 className="text-3xl font-extrabold text-red-500 tracking-tight">
            No Portfolio Found
          </h1>
          <p className="mt-3 text-gray-500 text-sm leading-relaxed">
            Please build and configure your professional freelance details first before attempting live validation checks.
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
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50/40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        
        {/* VIEW TITLE HEADER */}
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10 tracking-tight">
          Portfolio <span className="text-emerald-600">Preview</span>
        </h1>

        {/* HIGH-END PRESENTATION PROFILE CARD */}
        <div className="bg-white border border-emerald-100/80 rounded-3xl shadow-xl p-6 sm:p-10 transition duration-300">
          
          {/* PROFILE INTRO HEADER BLOCK */}
          <div className="border-b border-gray-100 pb-6 mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                {portfolio.name}
              </h2>
              <p className="text-lg text-emerald-600 font-semibold mt-1">
                {portfolio.profession}
              </p>
            </div>
            <span className="bg-emerald-50 text-emerald-700 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wide border border-emerald-100 self-start">
              Live Verified Profile
            </span>
          </div>

          {/* PROFILE BREAKDOWN AREAS */}
          <div className="space-y-6">
            
            {/* ABOUT SECTION */}
            <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider mb-2">
                📝 Professional Summary
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                {portfolio.about}
              </p>
            </div>

            {/* TWO COLUMN GRID FOR METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* EXPERIENCE DISPLAY */}
              <div className="p-5 border border-gray-100 rounded-2xl">
                <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider mb-2">
                  💼 Experience Tenure
                </h3>
                <p className="text-gray-700 font-medium text-base">
                  {portfolio.experience}
                </p>
              </div>

              {/* EMAIL CHANNEL DISPLAY */}
              <div className="p-5 border border-gray-100 rounded-2xl">
                <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider mb-2">
                  📧 Secure Contact Email
                </h3>
                <p className="text-gray-700 font-medium text-base break-all">
                  {portfolio.email}
                </p>
              </div>

            </div>

            {/* DYNAMIC SKILL PILLS RENDER */}
            <div className="p-5 border border-gray-100 rounded-2xl">
              <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider mb-3">
                🛡️ Verified Core Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {portfolio.skills.split(",").map((skill, index) => (
                  <span
                    key={index}
                    className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl font-semibold text-xs border border-emerald-100/60"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* EXTERNAL PORTFOLIO HYPERLINK BLOCK */}
            <div className="p-5 border border-gray-100 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">
                  🌐 Live Portfolio URL Destination
                </h3>
                <p className="text-gray-400 text-xs mt-0.5">Click the anchor channel to verify active workspace deployments.</p>
              </div>
              <a
                href={portfolio.portfolioLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-semibold hover:text-blue-700 underline text-sm break-all"
              >
                {portfolio.portfolioLink}
              </a>
            </div>

          </div>

          {/* EDIT ROUTING INTERFACE FOOTER CONTROL */}
          <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
            <Link to="/portfolioform" className="w-full sm:w-auto">
              <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-xl transition duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer text-center text-sm">
                ✏️ Edit Profile Configuration
              </button>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default PortfolioPreview;