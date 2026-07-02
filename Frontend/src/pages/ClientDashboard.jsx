import React, { useState } from "react";
import clientProjectsData from "../data/clientProjects";

const ClientDashboard = () => {
  const [projects, setProjects] = useState(clientProjectsData);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [newProject, setNewProject] = useState({
    title: "",
    category: "Web Development",
    budget: "",
    duration: "",
    description: "",
  });

  // Dynamic metrics calculation for the stats section
  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status === "Open").length;
  const closedProjects = projects.filter((p) => p.status === "Closed").length;

  
  const recentActivities = [
    { id: 1, text: "Rahul Sharma applied for Web Development project", time: "2 hours ago" },
    { id: 2, text: "Status changed to 'Closed' for Logo Design", time: "Yesterday" },
  ];

  
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((project) => project.id !== id));
    }
  };

  
  const handleEdit = (id) => {
    alert(`Edit Project (ID: ${id}) feature - Form will auto-fill once backend API is integrated!`);
  };

  
  const handlePostProject = (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.budget || !newProject.duration) {
      alert("Please fill all required fields!");
      return;
    }

    const projectToAdd = {
      id: Date.now(), 
      title: newProject.title,
      category: newProject.category,
      budget: `₹${newProject.budget}`,
      duration: `${newProject.duration} Days`,
      status: "Open",
      applicants: 0,
      description: newProject.description,
    };

    setProjects([projectToAdd, ...projects]);
    setIsModalOpen(false); 
    setNewProject({ title: "", category: "Web Development", budget: "", duration: "", description: "" }); // Resetting state values
    alert("Project Posted Successfully!");
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
              onClick={() => setIsModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl transition shadow-md"
            >
              + Post New Project
            </button>
          </div>

          {projects.length === 0 ? (
            <div className="bg-white p-8 text-center rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-500">No projects found. Post a new project description to start hiring!</p>
            </div>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${project.status === "Open" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {project.category} • Budget: <span className="text-emerald-600 font-bold">{project.budget}</span> • Duration: {project.duration}
                </p>
                
                <div className="flex justify-between items-center border-t pt-4 border-gray-100">
                  <span className="text-sm text-gray-500 font-medium">👥 {project.applicants || 0} Applicants</span>
                  <div className="flex gap-3">
                    <button onClick={() => handleEdit(project.id)} className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition">Edit</button>
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
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Post a New Project</h3>
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
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-1/2 bg-gray-100 hover:bg-gray-200 py-2.5 rounded-xl font-semibold text-gray-700 transition">Cancel</button>
                <button type="submit" className="w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-semibold transition shadow-md">Post Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ClientDashboard;