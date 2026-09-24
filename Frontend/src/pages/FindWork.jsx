import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";

function FindWork() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCategories, setShowCategories] = useState(true);
  const [appliedProjects, setAppliedProjects] = useState([]);
  const [applyingProject, setApplyingProject] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [bidDuration, setBidDuration] = useState("");
  const [bidProposal, setBidProposal] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    let currentUser = null;
    
    if (storedUser) {
      currentUser = JSON.parse(storedUser);
      setUser(currentUser);
    }

    const fetchProjects = async () => {
      try {
        const data = await apiRequest("/projects");
        // Defensive: drop any malformed entries so a bad record can't crash the page
        setProjects((data || []).filter((p) => p && p._id));
      } catch (error) {
        console.error("Error fetching projects from backend:", error);
      }
    };

    const fetchAppliedStatus = async () => {
      if (currentUser && currentUser.role !== "Client") {
        try {
          const myBids = await apiRequest("/bids/my");
          const appliedIds = myBids
            .filter((bid) => bid.status !== "Withdrawn" && bid.project)
            .map((bid) => bid.project._id.toString());
          setAppliedProjects(appliedIds);
        } catch (error) {
          console.error("Error fetching user applications status:", error);
        }
      }
    };

    fetchProjects();
    fetchAppliedStatus();
  }, []);

  const openApplyModal = (project) => {
    if (!user) {
      alert("Access Restricted! Please Login First to apply for listings.");
      navigate("/login");
      return;
    }
    setBidAmount("");
    setBidDuration("");
    setBidProposal("");
    setApplyingProject(project);
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!bidAmount || !bidProposal) {
      alert("Please enter your bid amount and a short proposal.");
      return;
    }

    const projectIdStr = applyingProject._id.toString();
    setSubmitting(true);
    try {
      await apiRequest("/bids", {
        method: "POST",
        body: {
          projectId: projectIdStr,
          amount: Number(bidAmount),
          duration: bidDuration,
          proposal: bidProposal,
        },
      });
      setAppliedProjects([...appliedProjects, projectIdStr]);
      alert("Application Submitted Successfully!");
      setApplyingProject(null);
    } catch (error) {
      console.error("Error submitting application payload:", error);
      alert(error.message || "Failed to submit application. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50/30 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-emerald-600 mb-10 tracking-tight">
        Available Jobs Board 💼
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4 space-y-4">
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="bg-emerald-600 text-white px-5 py-3.5 rounded-xl font-bold hover:bg-emerald-700 transition shadow-md w-full flex items-center justify-between cursor-pointer"
          >
            <span>☰ Categories Filter</span>
            <span className="text-xs opacity-70">{showCategories ? "▲ Close" : "▼ Open"}</span>
          </button>

          {showCategories && (
            <div className="bg-white border border-emerald-100/70 rounded-2xl shadow-sm p-4 space-y-1">
              {[
                "All",
                "Web Development",
                "App Development",
                "UI/UX Design",
                "Graphic Design",
                "Content Writing",
                "Digital Marketing",
              ].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition cursor-pointer ${
                    selectedCategory === category
                      ? "bg-emerald-600 text-white shadow-sm font-bold"
                      : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-full lg:w-3/4 space-y-6">
          <input
            type="text"
            placeholder="Search projects by listing name or criteria..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl p-4 shadow-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition duration-200 text-sm font-medium"
          />

          <div className="space-y-6">
            {filteredProjects.length === 0 ? (
              <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-12 text-center text-gray-500">
                No matching contract operations located. Adjust criteria options.
              </div>
            ) : (
              filteredProjects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white border border-emerald-100/70 rounded-3xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-xl hover:-translate-y-0.5 transition duration-300"
                >
                  <div className="w-full md:w-2/3 flex flex-col justify-between h-full">
                    <div>
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-100/50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {project.category}
                      </span>

                      <h2 className="text-2xl font-extrabold text-gray-900 mt-3 tracking-tight">
                        {project.title}
                      </h2>

                      <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-50">
                      <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Budget
                        </h3>
                        <p className="text-emerald-600 font-extrabold text-base mt-0.5">
                          {project.budget}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Duration
                        </h3>
                        <p className="text-gray-700 font-semibold text-sm mt-0.5">
                          {project.duration}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Client
                        </h3>
                        <p className="text-gray-700 font-semibold text-sm mt-0.5">
                          {project.client?.name || "Client"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/3 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-6">
                    <div className="w-full max-w-[240px] h-36 rounded-2xl overflow-hidden shadow-inner border border-gray-100">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                      />
                    </div>

                    <button
                      onClick={() => openApplyModal(project)}
                      disabled={appliedProjects.includes(project._id.toString())}
                      className={`mt-5 w-full max-w-[240px] py-3 rounded-xl text-sm font-bold tracking-wide transition transform hover:-translate-y-0.5 cursor-pointer text-center ${
                        appliedProjects.includes(project._id.toString())
                          ? "bg-gray-400 text-white cursor-not-allowed shadow-none transform-none"
                          : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg"
                      }`}
                    >
                      {appliedProjects.includes(project._id.toString()) ? "Applied ✓" : "Apply to Job"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {applyingProject && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Apply to "{applyingProject.title}"</h3>
            <p className="text-sm text-gray-500 mb-4">Send your bid amount and a short proposal to the client.</p>
            <form onSubmit={handleSubmitApplication} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Your Bid Amount (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 8000"
                  className="w-full border p-2.5 rounded-xl outline-emerald-500"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Estimated Duration (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. 7 Days"
                  className="w-full border p-2.5 rounded-xl outline-emerald-500"
                  value={bidDuration}
                  onChange={(e) => setBidDuration(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Proposal</label>
                <textarea
                  rows="3"
                  placeholder="Tell the client why you're a good fit..."
                  className="w-full border p-2.5 rounded-xl outline-emerald-500"
                  value={bidProposal}
                  onChange={(e) => setBidProposal(e.target.value)}
                ></textarea>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setApplyingProject(null)} className="w-1/2 bg-gray-100 hover:bg-gray-200 py-2.5 rounded-xl font-semibold text-gray-700 transition">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="w-1/2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white py-2.5 rounded-xl font-semibold transition shadow-md">
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FindWork;