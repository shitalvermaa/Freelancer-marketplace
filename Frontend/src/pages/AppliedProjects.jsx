import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";

function AppliedProjects() {
  const navigate = useNavigate();
  const [appliedList, setAppliedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchAppliedProjects();
  }, []);

  const fetchAppliedProjects = async () => {
    try {
      const bids = await apiRequest("/bids/my");
      setAppliedList(bids.filter((bid) => bid.project));
    } catch (error) {
      console.error("Error fetching applied projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnapply = async (bidId) => {
    if (!window.confirm("Are you sure you want to unapply from this project?")) return;

    try {
      await apiRequest(`/bids/${bidId}`, { method: "DELETE" });
      alert("Successfully unapplied from the project!");
      setAppliedList(appliedList.filter((bid) => bid.id !== bidId));
    } catch (error) {
      console.error("Error unapplying:", error);
      alert(error.message || "Failed to unapply. Try again.");
    }
  };

  const statusStyles = {
    Pending: "bg-amber-100 text-amber-800",
    Accepted: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
    Withdrawn: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Applied Projects</h1>
            <p className="text-sm text-gray-500 mt-1">Track and manage all your project submissions here.</p>
          </div>
          <button onClick={() => navigate("/dashboard")} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-2 rounded-xl text-sm transition">
            Back to Dashboard
          </button>
        </div>

        {loading ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-3xl p-12 text-center text-gray-500">
            Loading your applications...
          </div>
        ) : appliedList.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-3xl p-12 text-center">
            <p className="text-gray-500 font-medium">You haven't applied to any projects yet.</p>
            <button onClick={() => navigate("/findwork")} className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition shadow-sm">
              Explore Available Gigs
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {appliedList.map((bid) => (
              <div key={bid.id} className="bg-white border border-emerald-100 p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:shadow-md transition">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold uppercase px-3 py-1 rounded-full">{bid.project.category}</span>
                    <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${statusStyles[bid.status] || "bg-gray-100 text-gray-600"}`}>{bid.status}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mt-2">{bid.project.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">Your Bid: <span className="text-emerald-600 font-bold">₹{bid.amount}</span> • Duration: {bid.duration || bid.project.duration}</p>
                </div>
                {bid.status === "Pending" && (
                  <button onClick={() => handleUnapply(bid.id)} className="bg-red-50 text-red-600 hover:bg-red-100 font-bold px-5 py-2.5 rounded-xl text-sm transition border border-red-100 self-start sm:self-center">
                    Withdraw
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default AppliedProjects;