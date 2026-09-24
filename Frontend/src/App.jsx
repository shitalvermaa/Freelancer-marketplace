import { Routes, Route } from "react-router-dom";
import Navbar from"./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FindWork from "./pages/FindWork";
import FindTalent from "./pages/FindTalent";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import PortfolioForm from "./pages/PortfolioForm";
import PortfolioPreview from "./pages/PortfolioPreview";
import ClientDashboard from "./pages/ClientDashboard";
import CategoryDetail from "./pages/CategoryDetail";
import AppliedProjects from "./pages/AppliedProjects";
function App(){
  return(
   <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/findwork" element={<FindWork />} />
        <Route path="/findtalent" element={<FindTalent/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/portfolioform" element={<PortfolioForm />} />
        <Route path="/portfolio-preview" element={<PortfolioPreview />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/category/:categoryName" element={<CategoryDetail />} />
        <Route path="/applied-projects" element={<AppliedProjects />} />
      </Routes>

    </div>
  );
}
export default App;