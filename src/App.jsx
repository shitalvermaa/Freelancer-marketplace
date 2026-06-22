import { Routes, Route } from "react-router-dom";
import Navbar from"./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FindWork from "./pages/FindWork";
function App(){
  return(
   <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/findwork" element={<FindWork />} />
      </Routes>

    </div>
  );
}
export default App;