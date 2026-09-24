import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FindTalent() {
  const navigate = useNavigate();

  const [freelancersList, setFreelancersList] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [selectedExp, setSelectedExp] = useState("All");

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/freelancers");
        setFreelancersList(response.data);
      } catch (error) {
        console.error("Error fetching freelancers from backend:", error);
      }
    };
    fetchFreelancers();
  }, []);

  const filteredFreelancers = freelancersList.filter((free) => {
    const matchesSearch = free.name.toLowerCase().includes(search.toLowerCase());
    const matchesSkill = selectedSkill === "All" || free.profession === selectedSkill;

    let matchesExp = true;
    if (selectedExp !== "All") {
      matchesExp = (free.experience || "").includes(selectedExp);
    }

    return matchesSearch && matchesSkill && matchesExp;
  });

  const handleViewPortfolio = (freelancer) => {
    const realPortfolioData = {
      name: freelancer.name,
      profession: freelancer.profession,
      skills: freelancer.skills,
      experience: freelancer.experience,
      portfolioLink: freelancer.portfolioLink || "",
      email: freelancer.email || "Not shared",
      about: freelancer.about,
    };

    // Passed via router state (not localStorage) so viewing someone else's
    // portfolio never overwrites the logged-in user's own saved portfolio.
    navigate("/portfolio-preview", { state: { viewedPortfolio: realPortfolioData } });
  };

  const handleHireAction = (freelancerName) => {
    const userSession = JSON.parse(localStorage.getItem("user"));

    if (!userSession) {
      alert("Access Denied! Please sign up or log in as a Client to hire freelancers.");
      navigate("/signup");
      return;
    }

    alert(`Success! Hiring request sent to ${freelancerName}. Confirmation notification dispatched.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:p-8">
      <h1 className="text-4xl font-extrabold text-center text-emerald-600 mb-10">Find Best Talent 🌟</h1>

      <div className="flex flex-col md:flex-row gap-8">
        
        <div className="w-full md:w-1/4 bg-white p-6 rounded-2xl shadow-md border border-emerald-100 h-fit space-y-6">
          <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Filters</h3>
          
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-2">Category Skill</label>
            <select className="w-full border p-2.5 rounded-xl outline-emerald-500" value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)}>
              <option>All</option>
              <option>Web Development</option>
              <option>Graphic Design</option>
              <option>Content Writing</option>
              <option>UI/UX Design</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-600 mb-2">Experience</label>
            <select className="w-full border p-2.5 rounded-xl outline-emerald-500" value={selectedExp} onChange={(e) => setSelectedExp(e.target.value)}>
              <option>All</option>
              <option>1 Year</option>
              <option>2 Years</option>
              <option>3 Years</option>
              <option>4 Years</option>
            </select>
          </div>
        </div>

        <div className="w-full md:w-3/4 space-y-6">
          
          <input 
            type="text" 
            placeholder="Search freelancers by name..." 
            className="w-full border p-4 rounded-2xl shadow-sm outline-emerald-500 border-emerald-100" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredFreelancers.length === 0 ? (
              <p className="text-gray-500 text-center col-span-2 py-10">No matching freelancers found with selected search parameters.</p>
            ) : (
              filteredFreelancers.map((free) => (
                <div key={free.id} className="bg-white border border-emerald-100 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                  <div>
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold uppercase px-3 py-1 rounded-full">{free.profession}</span>
                    <h3 className="text-xl font-bold text-gray-800 mt-3">{free.name}</h3>
                    <p className="text-sm text-gray-400 font-medium mt-1">💼 Exp: {free.experience || "Not specified"}</p>
                    <p className="text-gray-600 text-sm mt-3 line-clamp-3">{free.about}</p>
                    
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {(free.skills || []).map((skill, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-lg font-medium">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6 pt-4 border-t border-gray-50">
                    <button onClick={() => handleViewPortfolio(free)} className="w-1/2 text-center bg-gray-100 hover:bg-emerald-50 text-emerald-700 font-bold py-2.5 rounded-xl transition text-sm">
                      View Portfolio
                    </button>
                    <button 
                      onClick={() => handleHireAction(free.name)}
                      className="w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl transition text-sm shadow-md"
                    >
                      Hire Now
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

export default FindTalent;











