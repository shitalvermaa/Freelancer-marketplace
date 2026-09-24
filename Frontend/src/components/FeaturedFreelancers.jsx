import React from "react";
import { useNavigate } from "react-router-dom";

function FeaturedFreelancers() {
  const navigate = useNavigate();

  const eliteFreelancers = [
    { id: 1, name: "Shashilata Chauhan", profession: "Web Developer", skills: "React, Node.js, Express, MongoDB", experience: "3 Years", about: "Full-stack engineer specializing in robust MERN stack applications." },
    { id: 2, name: "Kritika Singh", profession: "Graphic Designer", skills: "Photoshop, Figma, Illustrator", experience: "2 Years", about: "Creative visual artisan helping brands define their visual identities." },
    { id: 3, name: "Anushka Pandey", profession: "Content Writer", skills: "SEO Writing, Copywriting, Blogs", experience: "4 Years", about: "Wordsmith crafting search engine optimized promotional copy and blog structures." },
    { id: 4, name: "Sagar Verma", profession: "UI/UX Designer", skills: "Wireframing, Figma, Prototyping", experience: "3 Years", about: "Designing engaging digital customer user experiences with research-driven interfaces." },
  ];

  const handleViewPortfolioPreview = (freelancer) => {
    // Creating temporary user payload mirroring future backend queries
    const temporaryProfilePayload = {
      name: freelancer.name,
      profession: freelancer.profession,
      skills: freelancer.skills,
      experience: freelancer.experience,
      portfolioLink: "https://github.com",
      email: `${freelancer.name.toLowerCase().replace(" ", "")}@gmail.com`,
      about: freelancer.about,
    };
    
    // Storing data so PortfolioPreview page can catch it immediately
    localStorage.setItem("portfolio", JSON.stringify(temporaryProfilePayload));
    navigate("/portfolio-preview");
  };

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Featured Freelancers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {eliteFreelancers.map((freelancer) => (
          <div 
            key={freelancer.id} 
            className="border border-emerald-100 p-6 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-xl flex flex-col justify-between"
          >
            <div>
              <h3 className="font-bold text-white text-xl tracking-tight">{freelancer.name}</h3>
              <p className="text-emerald-100 text-sm font-medium mt-1 mb-3">{freelancer.profession}</p>
              <p className="text-white text-xs opacity-90 line-clamp-3">{freelancer.about}</p>
            </div>
            
            <button 
              onClick={() => handleViewPortfolioPreview(freelancer)} // Triggers navigation to portfolio presentation preview page
              className="bg-white text-emerald-700 font-semibold text-sm px-4 py-2.5 rounded-xl mt-5 hover:bg-emerald-50 hover:text-teal-800 transition-all duration-200 shadow-sm cursor-pointer w-full"
            >
              View Portfolio
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedFreelancers;


















// function FeaturedFreelancers() {
//   return (
//     <section className="py-10">

//       <h2 className="text-3xl font-bold text-center mb-8">
//         Featured Freelancers
//       </h2>

//       <div className="flex justify-center gap-6 flex-wrap">

//          <div className="border border-emerald-200 p-6 rounded-3xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-default">
//           <h3 className="font-bold text-white text-lg">Shashilata Chauhan</h3>
//           <p className="text-emerald-50">Web Developer</p>
//           <button className="bg-white text-emerald-700 px-4 py-2 rounded-xl mt-3 hover:bg-emerald-50 hover:text-teal-700 transition-all duration-300 cursor-pointer font-medium">
//             View Portfolio
//           </button>
//         </div>

//         <div className="border border-emerald-200 p-6 rounded-3xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-default">
//           <h3 className="font-bold text-white text-lg">Kritika Singh</h3>
//           <p className="text-emerald-50">Graphic Designer</p>
//           <button className="bg-white text-emerald-700 px-4 py-2 rounded-xl mt-3 hover:bg-emerald-50 hover:text-teal-700 transition-all duration-300 cursor-pointer font-medium">
//             View Portfolio
//           </button>
//         </div>

//         <div className="border border-emerald-200 p-6 rounded-3xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-default">
//           <h3 className="font-bold text-white text-lg">Anushka Pandey</h3>
//           <p className="text-emerald-50">Content Writer</p>
//           <button className="bg-white text-emerald-700 px-4 py-2 rounded-xl mt-3 hover:bg-emerald-50 hover:text-teal-700 transition-all duration-300 cursor-pointer font-medium">
//             View Portfolio
//           </button>
//         </div>

//         <div className="border border-emerald-200 p-6 rounded-3xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-default">
//           <h3 className="font-bold text-white text-lg">Sagar Verma</h3>
//           <p className="text-emerald-50">UI/UX Designer</p>
//           <button className="bg-white text-emerald-700 px-4 py-2 rounded-xl mt-3 hover:bg-emerald-50 hover:text-teal-700 transition-all duration-300 cursor-pointer font-medium">
//             View Portfolio
//           </button>
//         </div>

//         <div className="border border-emerald-200 p-6 rounded-3xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-default">
//           <h3 className="font-bold text-white text-lg">Ishika Singh</h3>
//           <p className="text-emerald-50">Mobile App Developer</p>
//           <button className="bg-white text-emerald-700 px-4 py-2 rounded-xl mt-3 hover:bg-emerald-50 hover:text-teal-700 transition-all duration-300 cursor-pointer font-medium">
//             View Portfolio
//           </button>
//         </div>

//         <div className="border border-emerald-200 p-6 rounded-3xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-default">
//           <h3 className="font-bold text-white text-lg">Arjun Mehta</h3>
//           <p className="text-emerald-50">Digital Marketer</p>
//           <button className="bg-white text-emerald-700 px-4 py-2 rounded-xl mt-3 hover:bg-emerald-50 hover:text-teal-700 transition-all duration-300 cursor-pointer font-medium">
//             View Portfolio
//           </button>
//         </div>


//       </div>

//     </section>
//   );
// }

// export default FeaturedFreelancers;