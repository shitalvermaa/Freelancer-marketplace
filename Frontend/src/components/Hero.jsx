import { useNavigate } from "react-router-dom";
import background from "../assets/background2.jpg";

function Hero() {
  const navigate = useNavigate();

  return (
    <section 
      className="text-center py-44 bg-cover bg-center relative flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* PROFESSIONAL DIMMASK OVERLAY FOR COMPLIANT ACCESSIBILITY CONTRAST */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* COMPONENT BODY LAYOUT CONTAINER */}
      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* ENHANCED MAIN HEADLINE */}
        <h1 className="text-4xl sm:text-6xl text-white font-extrabold mb-6 tracking-tight leading-tight">
          Hire Talent, Find Work, Build Success.
        </h1>

        {/* RESTRUCTURED LEGIBLE SUBTITLE */}
        <p className="text-gray-200 mb-10 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
          Connect with talented freelancers, showcase your professional portfolio, and grow your career seamlessly.
        </p>

        {/* ACCENT MATCHED ACTION BUTTON */}
        <button 
          onClick={() => navigate("/aboutus")} 
          className="bg-emerald-600 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-emerald-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-emerald-900/20 cursor-pointer text-base"
        >
          Get Started
        </button>

      </div>
    </section>
  );
}

export default Hero;