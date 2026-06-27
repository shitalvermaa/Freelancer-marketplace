import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PortfolioForm() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {

    const savedPortfolio = JSON.parse(localStorage.getItem("portfolio"));

    if (savedPortfolio) {
      setName(savedPortfolio.name);
      setProfession(savedPortfolio.profession);
      setSkills(savedPortfolio.skills);
      setExperience(savedPortfolio.experience);
      setPortfolioLink(savedPortfolio.portfolioLink);
      setEmail(savedPortfolio.email);
      setAbout(savedPortfolio.about);
    }

  }, []);

  const handleSubmit = () => {

    if (
      !name ||
      !profession ||
      !skills ||
      !experience ||
      !portfolioLink ||
      !email ||
      !about
    ) {
      alert("Please fill all fields");
      return;
    }

    const portfolioData = {
      name,
      profession,
      skills,
      experience,
      portfolioLink,
      email,
      about,
    };

    localStorage.setItem("portfolio", JSON.stringify(portfolioData));

    alert("Portfolio Saved Successfully!");

    navigate("/portfolio-preview");
  };

  return (
    <div className="max-w-2xl mx-auto p-8 ">

      <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
        Share Your Portfolio
      </h1>

      <div className="border rounded-2xl shadow-lg p-8">

        <div className="mb-5">
          <label className="block font-semibold mb-2">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <div className="mb-5">
          <label className="block font-semibold mb-2">
            Profession
          </label>

          <input
            type="text"
            placeholder="Web Developer, Designer, Writer..."
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <div className="mb-5">
          <label className="block font-semibold mb-2">
            Skills
          </label>

          <input
            type="text"
            placeholder="React, HTML, CSS, JavaScript"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <div className="mb-5">
          <label className="block font-semibold mb-2">
            Experience
          </label>

          <input
            type="text"
            placeholder="2 Years"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <div className="mb-5">
          <label className="block font-semibold mb-2">
            Portfolio Link
          </label>

          <input
            type="url"
            placeholder="https://yourportfolio.com"
            value={portfolioLink}
            onChange={(e) => setPortfolioLink(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <div className="mb-5">
          <label className="block font-semibold mb-2">
            Contact Email
          </label>

          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2">
            About Yourself
          </label>

          <textarea
            rows="5"
            placeholder="Tell clients about yourself..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full border p-3 rounded-lg"
          ></textarea>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 cursor-pointer"
        >
          {localStorage.getItem("portfolio")
            ? "Update Portfolio"
            : "Share Portfolio"}
        </button>

      </div>

    </div>
  );
}

export default PortfolioForm;