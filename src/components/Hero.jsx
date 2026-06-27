import { useNavigate } from "react-router-dom";
import background from "../assets/background2.jpg";
function Hero() {
const navigate = useNavigate();

  return (
    <section className="text-center py-50 bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >"

      <h1 className="text-6xl text-white font-bold mb-10">
        Hire Talent , Find Work , Build Success.
      </h1>

      <p className="text-gray-600 mb-10 text-white">
        Connect with talented freelancers ,Showcae Your Portfolio and grow your Career.
      </p>

      <button onClick={() => navigate("/aboutus")} className="bg-white text-black px-6 py-3 my-3 rounded hover:bg-emerald-200 cursor-pointer">Get Started</button>
      
   </section>

    
  );
}

export default Hero;