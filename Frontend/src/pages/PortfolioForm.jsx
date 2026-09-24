import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";

function PortfolioForm() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Core application states
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [skills, setSkills] = useState(""); // comma-separated string in the UI
  const [experience, setExperience] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      alert("Please login first to create your portfolio.");
      navigate("/login");
      return;
    }

    // Load the freelancer's real, saved profile from the backend
    apiRequest("/auth/me")
      .then(({ user: freshUser }) => {
        setName(freshUser.name || "");
        setEmail(freshUser.email || "");
        setProfession(freshUser.profession || "");
        setSkills((freshUser.skills || []).join(", "));
        setExperience(freshUser.experience || "");
        setPortfolioLink(freshUser.portfolioLink || "");
        setAbout(freshUser.about || "");
      })
      .catch((err) => {
        console.error("Failed to load profile:", err);
        // Fall back to whatever we already have in the session
        setName(user.name || "");
        setEmail(user.email || "");
        setProfession(user.profession || "");
        setSkills((user.skills || []).join(", "));
        setExperience(user.experience || "");
        setPortfolioLink(user.portfolioLink || "");
        setAbout(user.about || "");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !profession || !skills || !experience || !about) {
      alert("Please fill all fields");
      return;
    }

    const skillsArray = skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    setSaving(true);
    try {
      const { user: updatedUser } = await apiRequest("/portfolio/profile", {
        method: "PUT",
        body: { name, profession, skills: skillsArray, experience, portfolioLink, about },
      });

      // Keep the local session in sync so Dashboard/Navbar reflect the change immediately
      const mergedSession = { ...user, ...updatedUser, id: updatedUser._id || user.id };
      localStorage.setItem("user", JSON.stringify(mergedSession));
      window.dispatchEvent(new Event("authchange"));

      alert("Portfolio Saved Successfully!");
      navigate("/portfolio-preview");
    } catch (error) {
      console.error("Error saving portfolio:", error);
      alert(error.message || "Failed to save portfolio. Is your backend server running?");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400 font-semibold text-sm">
          <span className="w-4 h-4 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
          Loading your profile...
        </div>
      </div>
    );
  }

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
          <form onSubmit={handleSubmit} className="space-y-6">
            
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
                  Profession / Speciality
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
                  Skills <span className="text-gray-400 font-normal normal-case">(comma separated)</span>
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
                  Portfolio Link <span className="text-gray-400 font-normal normal-case">(optional)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://yourportfolio.com"
                  value={portfolioLink}
                  onChange={(e) => setPortfolioLink(e.target.value)}
                  className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition duration-200"
                />
              </div>

              {/* Account Email - read only, changing login email isn't supported here */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Account Email
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  title="Your login email can't be changed from here"
                  className="w-full border border-gray-200 bg-gray-50 text-gray-500 p-3 rounded-xl outline-none cursor-not-allowed"
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
                type="submit"
                disabled={saving}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-60 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer text-center"
              >
                {saving ? "Saving..." : "Save Portfolio"}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}

export default PortfolioForm;
