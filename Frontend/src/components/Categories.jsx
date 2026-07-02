import React from "react";
import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();

  const categoriesList = [
    { id: 1, title: "Web Development", icon: "🌐" },
    { id: 2, title: "Graphic Design", icon: "🎨" },
    { id: 3, title: "Content Writing", icon: "✍️" },
    { id: 4, title: "Digital Marketing", icon: "📈" },
    { id: 5, title: "UI-UX Design", icon: "📱" },
    { id: 6, title: "App Development", icon: "🤖" },
  ];

  return (
    <section className="py-20 px-8 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-2 text-gray-800">Explore Skills</h2>
        <p className="text-center mb-12 text-gray-500 text-lg">Find top-rated industry experts across hundreds of categories</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesList.map((category) => (
            <div 
              key={category.id} 
              onClick={() => navigate(`/category/${category.title}`)} // Dynamically opens the dynamic view path
              className="text-center bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-6 rounded-2xl transition duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-xl cursor-pointer flex flex-col items-center justify-center gap-2"
            >
              <span className="text-3xl">{category.icon}</span>
              <h3 className="text-xl font-bold tracking-wide">{category.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;





































// function Categories() {
//   return (
//     <section className="py-30 px-8 bg-gradient-to-b from-white to-emerald-50" >

//       <h2 className="text-4xl font-bold text-center mb-8">
//         Explore Skills
//       </h2>

//       <h2 className="text-center mb-10 text-black">Find experts across hundreds of categories</h2>

//       <div className="grid grid-cols-3 gap-6">

//         <div className=" text-center bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-4xl transition duration-300">
//           <h3>Web Development</h3>
//         </div>

//         <div className="text-center bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-4xl transition duration-300">
//           <h3>Graphic Design</h3>
//         </div>

//         <div className="text-center bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-4xl transition duration-300">
//           <h3>Content Writing</h3>
//         </div>

//         <div className="text-center bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-4xl transition duration-300">
//           <h3>Digital Marketing</h3>
//         </div>

//         <div className="text-center bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-4xl transition duration-300">
//           <h3>Web Development</h3>
//         </div>

//         <div className="text-center bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-4xl transition duration-300">
//           <h3>Graphic Design</h3>
//         </div>

//         <div className="text-center bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-4xl transition duration-300">
//           <h3>Content Writing</h3>
//         </div>

//         <div className="text-center bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-4xl transition duration-300">
//           <h3>Digital Marketing</h3>
//         </div>
        
//         <div className="text-center bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-4xl transition duration-300">
//           <h3>Digital Marketing</h3>
//         </div>
        


//       </div>

//     </section>
//   );
// }

// export default Categories;