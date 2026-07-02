import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PortfolioForm() {
  const navigate = useNavigate();

  // Core application states - Kept exactly identical to preserve logic integrity
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");

  // Auto-populating state fields dynamically if data already exists in LocalStorage
  useEffect(() => {
    const savedPortfolio = JSON.parse(localStorage.getItem("portfolio"));

    if (savedPortfolio) {
      setName(savedPortfolio.name);
      setProfession(savedPortfolio.profession);
      setSkills(savedPortfolio.skills);
      setExperience(savedPortfolio.experience);
      setPortfolioLink(savedPortfolio.portfolioLink);
      setEmail(savedPortfolio.email);
      setAbout(savedPortfolio.about);
    }
  }, []);

  // Form payload validation and routing logic sequence
  const handleSubmit = () => {
    if (
      !name ||
      !profession ||
      !skills ||
      !experience ||
      !portfolioLink ||
      !email ||
      !about
    ) {
      alert("Please fill all fields");
      return;
    }

    const portfolioData = {
      name,
      profession,
      skills,
      experience,
      portfolioLink,
      email,
      about,
    };

    localStorage.setItem("portfolio", JSON.stringify(portfolioData));
    alert("Portfolio Saved Successfully!");
    navigate("/portfolio-preview");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50/40 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-3xl mx-auto w-full">
        
        {/* HEADER BRANDING */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Share Your <span className="text-emerald-600">Portfolio</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Build your professional identity and start receiving direct project contract offers.
          </p>
        </div>

        {/* RESTRUCTURED FORM CARD */}
        <div className="bg-white border border-emerald-100/80 rounded-3xl shadow-xl p-6 sm:p-10 transition duration-300">
          <div className="space-y-6">
            
            {/* GRID LAYOUT FOR CORE DATA STRINGS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Full Name Input Field */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition duration-200"
                />
              </div>

              {/* Profession Designation Input Field */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Profession
                </label>
                <input
                  type="text"
                  placeholder="Web Developer, Designer, Writer..."
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition duration-200"
                />
              </div>

              {/* Tech/Creative Skills Core Input Field */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Skills
                </label>
                <input
                  type="text"
                  placeholder="React, HTML, CSS, JavaScript"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition duration-200"
                />
              </div>

              {/* Experience Duration Numeric String Field */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Experience
                </label>
                <input
                  type="text"
                  placeholder="e.g., 2 Years"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition duration-200"
                />
              </div>

              {/* Live Portfolio URL Address Destination Link */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Portfolio Link
                </label>
                <input
                  type="url"
                  placeholder="https://yourportfolio.com"
                  value={portfolioLink}
                  onChange={(e) => setPortfolioLink(e.target.value)}
                  className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition duration-200"
                />
              </div>

              {/* Secure Secondary Contact Communication Email */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition duration-200"
                />
              </div>

            </div>

            {/* FULL WIDTH BLOCK: PROFESSIONAL BIO SUMMARY DESC */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                About Yourself
              </label>
              <textarea
                rows="5"
                placeholder="Tell clients about your professional experiences, historical project completions, and overall tech stack strengths..."
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition duration-200 resize-none leading-relaxed"
              ></textarea>
            </div>

            {/* PRE-COMPUTED CALL TO ACTION INTERFACE SUBMIT BUTTON */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer text-center"
              >
                {localStorage.getItem("portfolio")
                  ? "Update Portfolio Setup"
                  : "Share Live Portfolio"}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default PortfolioForm;