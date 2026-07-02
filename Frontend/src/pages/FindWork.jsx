import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FindWork() {
  const navigate = useNavigate();

  // Active validation state synchronization
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Static mock projects data - Keeping object architecture safe for tomorrow's GET mapping
  const projects = [
    {
      id: 1,
      title: "Build React Portfolio Website",
      category: "Web Development",
      budget: "₹15,000",
      duration: "7 Days",
      client: "Tech Solutions",
      description: "Need a React developer to build a responsive portfolio website.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
    },
    {
      id: 2,
      title: "Modern Mobile UI Design",
      category: "UI/UX Design",
      budget: "₹8,000",
      duration: "5 Days",
      client: "Creative Studio",
      description: "Design a modern mobile application interface using Figma.",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600",
    },
    {
      id: 3,
      title: "Logo Design",
      category: "Graphic Design",
      budget: "₹4,000",
      duration: "3 Days",
      client: "Brandify",
      description: "Need a professional logo for a startup company.",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600",
    },
    {
      id: 4,
      title: "Content Writing",
      category: "Content Writing",
      budget: "₹6,000",
      duration: "4 Days",
      client: "Digital Blogs",
      description: "Write SEO friendly blogs for a technology website.",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600",
    },
    {
      id: 5,
      title: "Digital Marketing Campaign",
      category: "Digital Marketing",
      budget: "₹12,000",
      duration: "10 Days",
      client: "Growth Agency",
      description: "Run social media marketing campaign for product launch.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
    },
    {
      id: 6,
      title: "Android App Development",
      category: "App Development",
      budget: "₹35,000",
      duration: "20 Days",
      client: "StartupX",
      description: "Need an Android application with Firebase integration.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600",
    }
  ];

  // Functional Interface States
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCategories, setShowCategories] = useState(true);
  const [appliedProjects, setAppliedProjects] = useState([]);

  // Controlled verification submission interceptor
  const handleApply = (id) => {
     if (!isLoggedIn) {
      alert("Access Restricted! Please Login First to apply for listings.");
      navigate("/login");
      return;
    }

    if (!appliedProjects.includes(id)) {
      setAppliedProjects([...appliedProjects, id]);
  
      const currentCount = Number(localStorage.getItem("appliedCount")) || 0;
    localStorage.setItem("appliedCount", currentCount + 1);
      
    alert("Application Submitted Successfully!");
    }
  };

  // Live Query Evaluation Loop
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
      
      {/* PAGE HEADER */}
      <h1 className="text-4xl font-extrabold text-center text-emerald-600 mb-10 tracking-tight">
        Available Jobs Board 💼
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* LEFT COLUMN: FILTER SIDEBAR PANEL */}
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

        {/* RIGHT COLUMN: SEARCH STREAM & PROJECT ENTRIES */}
        <div className="w-full lg:w-3/4 space-y-6">
          
          {/* Enhanced Search Input */}
          <input
            type="text"
            placeholder="Search projects by listing name or criteria..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl p-4 shadow-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition duration-200 text-sm font-medium"
          />

          {/* Cards Dynamic Output Rendering Stream */}
          <div className="space-y-6">
            {filteredProjects.length === 0 ? (
              <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-12 text-center text-gray-500">
                No matching contract operations located. Adjust criteria options.
              </div>
            ) : (
              filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white border border-emerald-100/70 rounded-3xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-xl hover:-translate-y-0.5 transition duration-300"
                >
                  
                  {/* CARD INNER LEFT DATA COMPONENT */}
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

                    {/* METRICS ROW SECTION */}
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
                          {project.client}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* CARD INNER RIGHT MEDIA COMPONENT */}
                  <div className="w-full md:w-1/3 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-6">
                    <div className="w-full max-w-[240px] h-36 rounded-2xl overflow-hidden shadow-inner border border-gray-100">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                      />
                    </div>

                    <button
                      onClick={() => handleApply(project.id)}
                      disabled={appliedProjects.includes(project.id)}
                      className={`mt-5 w-full max-w-[240px] py-3 rounded-xl text-sm font-bold tracking-wide transition transform hover:-translate-y-0.5 cursor-pointer text-center ${
                        appliedProjects.includes(project.id)
                          ? "bg-gray-400 text-white cursor-not-allowed shadow-none transform-none"
                          : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg"
                      }`}
                    >
                      {appliedProjects.includes(project.id) ? "Applied ✓" : "Apply to Job"}
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default FindWork;









