import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function CategoryDetail() {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  // Dynamic content mapping - Keys must match perfectly with categoriesList titles
  const categoryData = {
    "Web Development": {
      description: "Web Development involves building, creating, and maintaining websites. It includes aspects such as web design, web publishing, web programming, and database management using technologies like React, Node.js, and modern cloud infrastructures.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"
    },
    "Graphic Design": {
      description: "Graphic Design is the craft of creating visual content to communicate messages. Applying visual hierarchy and page layout techniques, designers use typography and pictures to meet users' specific needs and focus on the logic of displaying elements in interactive designs visually.",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800"
    },
    "Content Writing": {
      description: "Content Writing is the process of planning, writing, and editing web content, typically for digital marketing purposes. It can include writing blog posts and articles, scripts for videos and podcasts, as well as content for specific platforms.",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800"
    },
    "Digital Marketing": {
      description: "Digital Marketing helps businesses reach target audiences through the internet and other digital communication channels. This includes not only email, social media, and web-based advertising, but also text and multimedia messages as a marketing channel.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
    },
    // FIXED KEY: Changed from custom typo string to standard "UI/UX Design" matching Categories.jsx array exactly
    "UI-UX Design": {
      description: "UI-UX Design aims to create user-friendly interfaces that enable users to understand how to use complex technical products. If you enjoy making things beautiful, organized, and highly functional, this domain bridges the gap between layout engineering and aesthetics.",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800"
    },
    "App Development": {
      description: "App Development refers to the creation of computer applications for use on mobile devices such as tablets and smartphones. It involves creating high-performance binary packages, managing device storage, state, and optimizing interfaces for small screens.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800"
    }
  };

  // Safe Fallback mapping if any character string mismatches occur
  const currentCategory = categoryData[categoryName] || {
    description: "Explore top freelance opportunities and services available inside this professional domain.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 min-h-[calc(100vh-80px)] flex flex-col justify-center">
      <button 
        onClick={() => navigate("/")} 
        className="mb-8 self-start bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl font-semibold hover:bg-emerald-100 transition"
      >
        ← Back to Home
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center border border-emerald-100 bg-white p-8 md:p-12 rounded-3xl shadow-xl">
        
        {/* LEFT SIDE: DYNAMIC TEXT DESCRIPTION */}
        <div className="space-y-6">
          <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm">Skill Domain Overview</span>
          <h1 className="text-4xl font-extrabold text-gray-900">{categoryName}</h1>
          <p className="text-gray-600 text-lg leading-relaxed">{currentCategory.description}</p>
          <button 
            onClick={() => navigate("/findtalent")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl transition shadow-md"
          >
            Find Experts in {categoryName}
          </button>
        </div>

        {/* RIGHT SIDE: DYNAMIC COVER PHOTO */}
        <div className="w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
          <img 
            src={currentCategory.image} 
            alt={categoryName} 
            className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
          />
        </div>

      </div>
    </div>
  );
}

export default CategoryDetail;





// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";

// function CategoryDetail() {
//   const { categoryName } = useParams();
//   const navigate = useNavigate();

//   // Dynamic content mapping based on the clicked category name
//   const categoryData = {
//     "Web Development": {
//       description: "Web Development involves building, creating, and maintaining websites. It includes aspects such as web design, web publishing, web programming, and database management using technologies like React, Node.js, and modern cloud infrastructures.",
//       image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"
//     },
//     "Graphic Design": {
//       description: "Graphic Design is the craft of creating visual content to communicate messages. Applying visual hierarchy and page layout techniques, designers use typography and pictures to meet users' specific needs and focus on the logic of displaying elements in interactive designs visually.",
//       image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800"
//     },
//     "Content Writing": {
//       description: "Content Writing is the process of planning, writing, and editing web content, typically for digital marketing purposes. It can include writing blog posts and articles, scripts for videos and podcasts, as well as content for specific platforms.",
//       image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800"
//     },
//     "Digital Marketing": {
//       description: "Digital Marketing helps businesses reach target audiences through the internet and other digital communication channels. This includes not only email, social media, and web-based advertising, but also text and multimedia messages as a marketing channel.",
//       image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
//     },
//     "UI/UX Design": {
//       description: "UI/UX Design aims to create user-friendly interfaces that enable users to understand how to use complex technical products. If you enjoy making things beautiful, organized, and highly functional, this domain bridges the gap between layout engineering and aesthetics.",
//       image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800"
//     },
//     "App Development": {
//       description: "App Development refers to the creation of computer applications for use on mobile devices such as tablets and smartphones. It involves creating high-performance binary packages, managing device storage, state, and optimizing interfaces for small screens.",
//       image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800"
//     }
//   };

//   // Fallback default data if category name doesn't match
//   const currentCategory = categoryData[categoryName] || {
//     description: "Explore top freelance opportunities and services available inside this professional domain.",
//     image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-16 min-h-[calc(100--80px)] flex flex-col justify-center">
//       <button 
//         onClick={() => navigate("/")} 
//         className="mb-8 self-start bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl font-semibold hover:bg-emerald-100 transition"
//       >
//         ← Back to Home
//       </button>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center border border-emerald-100 bg-white p-8 md:p-12 rounded-3xl shadow-xl">
//         {/* LEFT SIDE: DYNAMIC TEXT DESCRIPTION */}
//         <div className="space-y-6">
//           <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm">Skill Domain Overview</span>
//           <h1 className="text-4xl font-extrabold text-gray-900">{categoryName}</h1>
//           <p className="text-gray-600 text-lg leading-relaxed">{currentCategory.description}</p>
//           <button 
//             onClick={() => navigate("/findtalent")}
//             className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl transition shadow-md"
//           >
//             Find Experts in {categoryName}
//           </button>
//         </div>

//         {/* RIGHT SIDE: DYNAMIC COVER PHOTO */}
//         <div className="w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
//           <img 
//             src={currentCategory.image} 
//             alt={categoryName} 
//             className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CategoryDetail;