import React from "react";
import Footer from "../components/Footer";

function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50/50">

      {/* HERO SECTION - Informative & Minimalist */}
      <section className="text-center py-24 bg-gradient-to-b from-emerald-50 to-white px-4">
        <div className="max-w-4xl mx-auto">
          <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm bg-emerald-100/60 px-3 py-1 rounded-full">
            Our Vision
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4 mb-6 tracking-tight">
            Connecting Elite Global Talent
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            FreelancerHub bridges the gap between top-tier independent professionals 
            and visionary companies looking to scale their digital operations seamlessly.
          </p>
        </div>
      </section>

      {/* TRUSTED COMPANIES SECTION - Clean Layout */}
      <section className="py-12 border-y border-gray-100 bg-white px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs font-bold text-center tracking-widest text-gray-400 uppercase mb-8">
            Trusted By Professional Ecosystems
          </h2>
          <div className="flex justify-center items-center gap-8 md:gap-16 flex-wrap text-xl font-bold text-gray-400">
            <p className="hover:text-gray-600 transition cursor-default">Google</p>
            <p className="hover:text-gray-600 transition cursor-default">Microsoft</p>
            <p className="hover:text-gray-600 transition cursor-default">Amazon</p>
            <p className="hover:text-gray-600 transition cursor-default">Infosys</p>
            <p className="hover:text-gray-600 transition cursor-default">TCS</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION - Beautiful Dynamic Cards */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-2">
          How It Works
        </h2>
        <p className="text-center text-gray-500 mb-12">
          A streamlined execution pipeline designed for secure collaboration.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="bg-white border border-emerald-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition duration-300 relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 transform scale-y-0 group-hover:scale-y-100 transition duration-300"></div>
            <div className="text-3xl mb-4">👤</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              1. Profile Verification
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Users sign up and establish credentials, choosing explicit marketplace identities as either Freelancers or Clients.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-emerald-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition duration-300 relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 transform scale-y-0 group-hover:scale-y-100 transition duration-300"></div>
            <div className="text-3xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              2. Requirements Matching
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Clients deploy precise technical listings while looking through custom filters to locate relevant developer skill profiles.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-emerald-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition duration-300 relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 transform scale-y-0 group-hover:scale-y-100 transition duration-300"></div>
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              3. Secure Deployment
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Contracts are validated and jobs are assigned, enabling instant communication channels and robust milestone tracking.
            </p>
          </div>

        </div>
      </section>

      {/* CLIENT REVIEWS SECTION - Clean Blockquotes */}
      <section className="py-20 bg-emerald-50/40 border-t border-emerald-100 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
            What Our Ecosystem Says
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <p className="text-gray-600 italic text-sm leading-relaxed">
                "FreelancerHub helped us locate an excellent React Engineer within hours. The search filters minimized our typical vetting times down completely."
              </p>
              <h4 className="font-bold text-gray-800 text-sm mt-4 border-t pt-3 border-gray-50">
                — Rahul Sharma
              </h4>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <p className="text-gray-600 italic text-sm leading-relaxed">
                "The separation between freelancer profiles and client project tools makes management completely modular. Very reliable platform."
              </p>
              <h4 className="font-bold text-gray-800 text-sm mt-4 border-t pt-3 border-gray-50">
                — Priya Mehta
              </h4>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <p className="text-gray-600 italic text-sm leading-relaxed">
                "An absolute game-changer for high-growth startups requiring rapid technical deployment. Highly recommended deployment resource."
              </p>
              <h4 className="font-bold text-gray-800 text-sm mt-4 border-t pt-3 border-gray-50">
                — Aman Verma
              </h4>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default AboutUs;