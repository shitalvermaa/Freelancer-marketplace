import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ClientDashboard from "./ClientDashboard";
import { apiRequest } from "../utils/api";
import {
  FiBriefcase,
  FiDollarSign,
  FiShield,
  FiArrowRight,
  FiEdit3,
  FiEye,
  FiCompass,
  FiInbox,
} from "react-icons/fi";

function getInitials(name = "") {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [appliedProjects, setAppliedProjects] = useState([]);
  const [loadingApplied, setLoadingApplied] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    if (parsedUser.role !== "Client") {
      apiRequest("/bids/my")
        .then((bids) =>
          setAppliedProjects(
            bids.filter((bid) => bid.project).map((bid) => bid.project)
          )
        )
        .catch((err) => console.error(err))
        .finally(() => setLoadingApplied(false));
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400 font-semibold text-sm">
          <span className="w-4 h-4 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
          Loading workspace...
        </div>
      </div>
    );
  }

  if (user.role === "Client") {
    return <ClientDashboard />;
  }

  return (
    <div className="min-h-screen bg-gray-50/40 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Welcome Banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white p-8 md:p-10 rounded-3xl shadow-xl mb-8 border border-emerald-500/20">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-xl font-black text-slate-900 shadow-lg">
                {getInitials(user.name)}
              </div>
              <div>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs uppercase font-extrabold px-3 py-1 rounded-full tracking-wider border border-emerald-500/30">
                  Freelancer Network Console
                </span>
                <h1 className="text-3xl md:text-4xl font-black mt-3 tracking-tight">
                  Welcome back, {user.name.split(" ")[0]} 👋
                </h1>
                <p className="text-gray-400 mt-1.5 text-sm font-medium">
                  Specialty:{" "}
                  <span className="text-emerald-400 font-bold">
                    {user.profession || "Not set — update your profile"}
                  </span>
                </p>
              </div>
            </div>
            <Link
              to="/portfolioform"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-xl text-sm transition shadow-md self-start md:self-center whitespace-nowrap"
            >
              <FiEdit3 size={16} /> Edit Profile
            </Link>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => navigate("/applied-projects")}
            className="text-left bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm hover:border-emerald-400 hover:shadow-md transition duration-300 cursor-pointer group flex justify-between items-start"
          >
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Projects Applied</p>
              <h2 className="text-4xl font-black text-gray-800 mt-2 group-hover:text-emerald-600 transition">
                {loadingApplied ? "…" : appliedProjects.length}
              </h2>
              <p className="text-xs text-emerald-600 font-semibold mt-2 inline-flex items-center gap-1">
                Review submissions <FiArrowRight size={12} />
              </p>
            </div>
            <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl">
              <FiBriefcase size={20} />
            </div>
          </button>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Verified Earnings</p>
              <h2 className="text-4xl font-black text-gray-800 mt-2">₹45,200</h2>
              <p className="text-xs text-gray-400 mt-2">Cleared &amp; available for payout</p>
            </div>
            <div className="bg-amber-50 text-amber-700 p-3 rounded-xl">
              <FiDollarSign size={20} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Profile Authority</p>
              <h2 className="text-4xl font-black text-gray-800 mt-2">98%</h2>
              <p className="text-xs text-emerald-600 font-semibold mt-2">Top Rated Plus Status</p>
            </div>
            <div className="bg-blue-50 text-blue-700 p-3 rounded-xl">
              <FiShield size={20} />
            </div>
          </div>
        </div>

        {/* Two column: recent applications + quick actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-gray-800">Recent Applications</h3>
              {appliedProjects.length > 0 && (
                <Link to="/applied-projects" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1">
                  View all <FiArrowRight size={12} />
                </Link>
              )}
            </div>

            {loadingApplied ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 rounded-xl bg-gray-100 animate-pulse" />
                ))}
              </div>
            ) : appliedProjects.length === 0 ? (
              <div className="border border-dashed border-gray-200 rounded-2xl p-10 text-center">
                <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <FiInbox size={20} />
                </div>
                <p className="text-gray-500 text-sm font-medium">You haven't applied to any projects yet.</p>
                <Link
                  to="/findwork"
                  className="inline-flex items-center gap-2 mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition shadow-sm"
                >
                  Browse open gigs <FiArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {appliedProjects.slice(0, 4).map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between gap-4 p-4 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition"
                  >
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {project.category}
                      </span>
                      <p className="font-bold text-gray-800 mt-1.5 truncate">{project.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{project.duration} • {project.client?.name || "Client"}</p>
                    </div>
                    <p className="text-emerald-600 font-extrabold text-sm whitespace-nowrap">{project.budget}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 px-1">Quick Actions</h3>

            <Link
              to="/findwork"
              className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-300 hover:shadow-md transition group"
            >
              <div className="bg-slate-900 text-white p-3 rounded-xl group-hover:bg-emerald-600 transition">
                <FiCompass size={18} />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">Browse Marketplace</p>
                <p className="text-xs text-gray-400">Find your next gig</p>
              </div>
            </Link>

            <Link
              to="/portfolio-preview"
              className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-300 hover:shadow-md transition group"
            >
              <div className="bg-slate-900 text-white p-3 rounded-xl group-hover:bg-emerald-600 transition">
                <FiEye size={18} />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">View Public Portfolio</p>
                <p className="text-xs text-gray-400">See what clients see</p>
              </div>
            </Link>

            <Link
              to="/portfolioform"
              className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-300 hover:shadow-md transition group"
            >
              <div className="bg-slate-900 text-white p-3 rounded-xl group-hover:bg-emerald-600 transition">
                <FiEdit3 size={18} />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">Edit Portfolio</p>
                <p className="text-xs text-gray-400">Keep your profile fresh</p>
              </div>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;
