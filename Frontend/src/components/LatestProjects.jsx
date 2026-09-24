import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LatestProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects");
        // show the most recently posted projects first
        setProjects([...response.data].reverse().slice(0, 6));
      } catch (error) {
        console.error("Error fetching latest projects:", error);
      }
    };
    fetchLatest();
  }, []);

  if (projects.length === 0) return null;

  return (
    <section className="py-10 bg-gray-50">

      <h2 className="text-3xl font-bold text-center mb-8">
        Latest Projects
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 max-w-7xl mx-auto">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => navigate("/findwork")}
            className="border border-emerald-200 p-6 rounded-3xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer text-white"
          >
            <span className="text-xs font-bold uppercase tracking-wider opacity-80">{project.category}</span>
            <h3 className="font-bold text-lg mt-1">{project.title}</h3>
            <p className="text-sm mt-1 opacity-90 line-clamp-2">{project.description}</p>
            <p className="text-sm mt-3 font-semibold">{project.budget}</p>
          </div>
        ))}
      </div>

    </section>
  );
}

export default LatestProjects;
