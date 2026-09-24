import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiRequest } from "../utils/api";

const ClientDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [applicantCounts, setApplicantCounts] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // null = creating new, otherwise editing this project id
  const [loading, setLoading] = useState(true);

  const [newProject, setNewProject] = useState({
    title: "",
    category: "Web Development",
    budget: "",
    duration: "",
    description: "",
  });

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplicantCounts = async () => {
    try {
      const data = await apiRequest("/bids/counts/mine");
      setApplicantCounts(data);
    } catch (error) {
      console.error("Error fetching applicant counts:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchApplicantCounts();
  }, []);

  // Dynamic metrics calculation for the stats section
  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status !== "Closed").length;
  const closedProjects = projects.filter((p) => p.status === "Closed").length;

  const recentActivities = [
    { id: 1, text: "Rahul Sharma applied for Web Development project", time: "2 hours ago" },
    { id: 2, text: "Status changed to 'Closed' for Logo Design", time: "Yesterday" },
  ];

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await apiRequest(`/projects/${id}`, { method: "DELETE" });
      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
      alert(error.message || "Failed to delete project. Try again.");
    }
  };

  const handleToggleStatus = async (project) => {
    const newStatus = project.status === "Closed" ? "Open" : "Closed";
    try {
      const response = await apiRequest(`/projects/${project.id}`, {
        method: "PUT",
        body: { status: newStatus },
      });
      setProjects(projects.map((p) => (p.id === project.id ? response.project : p)));
    } catch (error) {
      console.error("Error updating project status:", error);
      alert(error.message || "Failed to update project status. Try again.");
    }
  };

  const handleEditClick = (project) => {
    setEditingId(project.id);
    setNewProject({
      title: project.title || "",
      category: project.category || "Web Development",
      // strip the leading "₹" so the number input keeps working
      budget: (project.budget || "").toString().replace(/[₹,]/g, ""),
      duration: (project.duration || "").toString().replace(/\s*Days?$/i, ""),
      description: project.description || "",
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setNewProject({ title: "", category: "Web Development", budget: "", duration: "", description: "" });
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handlePostProject = async (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.budget || !newProject.duration) {
      alert("Please fill all required fields!");
      return;
    }

    const payload = {
      title: newProject.title,
      category: newProject.category,
      budget: `₹${newProject.budget}`,
      duration: `${newProject.duration} Days`,
      description: newProject.description,
    };

    try {
      if (editingId) {
        const response = await apiRequest(`/projects/${editingId}`, { method: "PUT", body: payload });
        setProjects(projects.map((p) => (p.id === editingId ? response.project : p)));
        alert("Project Updated Successfully!");
      } else {
        const response = await apiRequest("/projects", { method: "POST", body: payload });
        setProjects([response.project, ...projects]);
        alert("Project Posted Successfully!");
      }
      resetForm();
    } catch (error) {
      console.error("Error saving project:", error);
      alert(error.message || "Failed to save project. Is your backend server running?");
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50/30 p-4 md:p-8">


      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 md:p-8 text-white shadow-xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome Back, Client! 👋</h1>
        <p className="text-emerald-100 text-lg">Manage your active listings and hire top freelancers globally.</p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-emerald-100">
          <p className="text-sm font-semibold text-gray-500 uppercase">Total Posted</p>
          <h3 className="text-3xl font-extrabold text-gray-800 mt-2">{totalProjects}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border border-emerald-100">
          <p className="text-sm font-semibold text-gray-500 uppercase">Active (Open)</p>
          <h3 className="text-3xl font-extrabold text-emerald-600 mt-2">{activeProjects}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border border-emerald-100">
          <p className="text-sm font-semibold text-gray-500 uppercase">Closed</p>
          <h3 className="text-3xl font-extrabold text-red-500 mt-2">{closedProjects}</h3>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">My Posted Projects</h2>
            <button
              onClick={() => { resetForm(); setIsModalOpen(true); }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl transition shadow-md"
            >
              + Post New Project
            </button>
          </div>

          {loading ? (
            <div className="bg-white p-8 text-center rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-500">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="bg-white p-8 text-center rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-500">No projects found. Post a new project description to start hiring!</p>
            </div>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                  <button
                    onClick={() => handleToggleStatus(project)}
                    title="Click to toggle Open/Closed"
                    className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${project.status === "Closed" ? "bg-red-100 text-red-800 hover:bg-red-200" : "bg-green-100 text-green-800 hover:bg-green-200"}`}
                  >
                    {project.status || "Open"}
                  </button>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {project.category} • Budget: <span className="text-emerald-600 font-bold">{project.budget}</span> • Duration: {project.duration}
                </p>

                <div className="flex justify-between items-center border-t pt-4 border-gray-100">
                  <span className="text-sm text-gray-500 font-medium">👥 {applicantCounts[project.id] || 0} Applicants</span>
                  <div className="flex gap-3">
                    <button onClick={() => handleEditClick(project)} className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition">Edit</button>
                    <button onClick={() => handleDelete(project.id)} className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition">Delete</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>


        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-emerald-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivities.map((act) => (
                <div key={act.id} className="border-l-4 border-emerald-500 pl-3 py-1">
                  <p className="text-sm text-gray-700 font-medium">{act.text}</p>
                  <span className="text-xs text-gray-400">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>


      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50 animate-fadeIn">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{editingId ? "Edit Project" : "Post a New Project"}</h3>
            <form onSubmit={handlePostProject} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Project Title</label>
                <input type="text" placeholder="e.g., Build Food Delivery App" className="w-full border p-2.5 rounded-xl outline-emerald-500" value={newProject.title} onChange={(e) => setNewProject({...newProject, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Category</label>
                <select className="w-full border p-2.5 rounded-xl outline-emerald-500" value={newProject.category} onChange={(e) => setNewProject({...newProject, category: e.target.value})}>
                  <option>Web Development</option>
                  <option>App Development</option>
                  <option>UI/UX Design</option>
                  <option>Graphic Design</option>
                  <option>Content Writing</option>
                  <option>Digital Marketing</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Budget (₹)</label>
                  <input type="number" placeholder="10000" className="w-full border p-2.5 rounded-xl outline-emerald-500" value={newProject.budget} onChange={(e) => setNewProject({...newProject, budget: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Duration (Days)</label>
                  <input type="number" placeholder="7" className="w-full border p-2.5 rounded-xl outline-emerald-500" value={newProject.duration} onChange={(e) => setNewProject({...newProject, duration: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Description</label>
                <textarea rows="3" placeholder="Provide clear requirements about the project goals..." className="w-full border p-2.5 rounded-xl outline-emerald-500" value={newProject.description} onChange={(e) => setNewProject({...newProject, description: e.target.value})}></textarea>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={resetForm} className="w-1/2 bg-gray-100 hover:bg-gray-200 py-2.5 rounded-xl font-semibold text-gray-700 transition">Cancel</button>
                <button type="submit" className="w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-semibold transition shadow-md">{editingId ? "Save Changes" : "Post Project"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ClientDashboard;
