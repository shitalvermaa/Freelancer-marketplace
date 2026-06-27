import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FindWork() {

  const navigate = useNavigate();

const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const projects = [

    {
      id: 1,
      title: "Build React Portfolio Website",
      category: "Web Development",
      budget: "₹15,000",
      duration: "7 Days",
      client: "Tech Solutions",
      description:
        "Need a React developer to build a responsive portfolio website.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
    },

    {
      id: 2,
      title: "Modern Mobile UI Design",
      category: "UI/UX Design",
      budget: "₹8,000",
      duration: "5 Days",
      client: "Creative Studio",
      description:
        "Design a modern mobile application interface using Figma.",
      image:
        "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600",
    },

    {
      id: 3,
      title: "Logo Design",
      category: "Graphic Design",
      budget: "₹4,000",
      duration: "3 Days",
      client: "Brandify",
      description:
        "Need a professional logo for a startup company.",
      image:
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600",
    },

    {
      id: 4,
      title: "Content Writing",
      category: "Content Writing",
      budget: "₹6,000",
      duration: "4 Days",
      client: "Digital Blogs",
      description:
        "Write SEO friendly blogs for a technology website.",
      image:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600",
    },

    {
      id: 5,
      title: "Digital Marketing Campaign",
      category: "Digital Marketing",
      budget: "₹12,000",
      duration: "10 Days",
      client: "Growth Agency",
      description:
        "Run social media marketing campaign for product launch.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
    },

    {
      id: 6,
      title: "Android App Development",
      category: "App Development",
      budget: "₹35,000",
      duration: "20 Days",
      client: "StartupX",
      description:
        "Need an Android application with Firebase integration.",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600",
    }

  ];

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCategories, setShowCategories] = useState(true);
  const [appliedProjects, setAppliedProjects] = useState([]);

  const handleApply = (id) => {

  if (!isLoggedIn) {

    alert("Please Login First!");

    navigate("/login");

    return;

  }

  if (!appliedProjects.includes(id)) {

    setAppliedProjects([...appliedProjects, id]);

    alert("Application Submitted Successfully!");

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

    <div className="max-w-7xl mx-auto px-8 py-8">

      <h1 className="text-4xl font-bold text-center text-emerald-600 mb-10">
        Find Work
      </h1>

      <div className="flex gap-8">

        {/* Sidebar */}

        <div className="w-1/4">

           <button
    onClick={() => setShowCategories(!showCategories)}
    className="bg-emerald-600 text-white px-5 py-3 rounded-xl mb-5 hover:bg-emerald-700 cursor-pointer w-full"
  >
    ☰ Categories
  </button>

  {showCategories && (

    <div className="border rounded-2xl shadow-lg p-5">

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
          className={`w-full text-left px-4 py-3 rounded-lg mb-3 transition cursor-pointer

          ${
            selectedCategory === category
              ? "bg-emerald-600 text-white"
              : "hover:bg-emerald-100"
          }`}
        >
          {category}
        </button>

      ))}

    </div>

  )}


          
        </div>

        {/* Right Side */}

        <div className="w-3/4">

          <input
            type="text"
            placeholder="Search Projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl p-4 mb-8 focus:outline-none focus:border-emerald-500"
          />

          <div className="space-y-6">

                        {filteredProjects.map((project) => (

              <div
                key={project.id}
                className="border rounded-2xl shadow-lg p-6 flex justify-between items-center hover:shadow-2xl transition"
              >

                {/* Left Side */}

                <div className="w-2/3">

                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {project.category}
                  </span>

                  <h2 className="text-2xl font-bold mt-4">
                    {project.title}
                  </h2>

                  <p className="text-gray-600 mt-3">
                    {project.description}
                  </p>

                  <div className="flex gap-8 mt-5">

                    <div>

                      <h3 className="font-semibold">
                        Budget
                      </h3>

                      <p className="text-emerald-600">
                        {project.budget}
                      </p>

                    </div>

                    <div>

                      <h3 className="font-semibold">
                        Duration
                      </h3>

                      <p>
                        {project.duration}
                      </p>

                    </div>

                    <div>

                      <h3 className="font-semibold">
                        Client
                      </h3>

                      <p>
                        {project.client}
                      </p>

                    </div>

                  </div>

                </div>

                {/* Right Side */}

                <div className="w-1/3 flex flex-col items-center">

                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-56 h-36 object-cover rounded-xl shadow-md hover:scale-105 transition duration-300"
                  />

                  <button
                    onClick={() => handleApply(project.id)}
                    disabled={appliedProjects.includes(project.id)}
                    className={`mt-5 px-8 py-3 rounded-xl text-white font-semibold transition cursor-pointer

                    ${
                      appliedProjects.includes(project.id)
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-emerald-600 hover:bg-emerald-700"
                    }`}
                  >

                    {appliedProjects.includes(project.id)
                      ? "Applied ✓"
                      : "Apply"}

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}

export default FindWork;


          