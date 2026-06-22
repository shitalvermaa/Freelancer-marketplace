 import { Link } from "react-router-dom";
 function Navbar() {
  return(
    <nav className="flex items-center justify-between px-8 py-4 border-b bg-green-700">
      <h1 className="text-2xl font-bold">FreelancerMarketplace</h1>
      <ul className="flex items-center gap-6 cursor-pointer ">
        <Link to="/">
          <li className="hover:bg-green-400 bg-white text-black px-1 rounded">Home</li>
       </Link>
        <li className="hover:bg-green-400 bg-white text-black px-1 rounded"><Link to="/findwork">Find Work</Link></li>
        <li className="hover:bg-green-400 bg-white text-black px-1 rounded">Find Talent</li>
        <li className="hover:bg-green-400 bg-white text-black px-1 rounded">Dashboard</li>
        <Link to="/login">
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-green-400 cursor-pointer">Login</button>
       </Link>
       <Link to="/signup">
         <button className="bg-black text-white px-4 py-2 rounded hover:bg-green-400 cursor-pointer">Sign Up</button>
     </Link>
     </ul>
     </nav>
     
  );
  
}
export default Navbar;

