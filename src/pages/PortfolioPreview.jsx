import { Link } from "react-router-dom";

function PortfolioPreview() {

  const portfolio = JSON.parse(localStorage.getItem("portfolio"));

  if (!portfolio) {
    return (
      <div className="text-center mt-20">

        <h1 className="text-3xl font-bold text-red-500">
          No Portfolio Found
        </h1>

        <p className="mt-4">
          Please create your portfolio first.
        </p>

        <Link to="/portfolioform">
          <button className="mt-6 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 cursor-pointer">
            Create Portfolio
          </button>
        </Link>

      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">

      <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
        Portfolio Preview
      </h1>

      <div className="border rounded-2xl shadow-lg p-8">

        <h2 className="text-3xl font-bold">
          {portfolio.name}
        </h2>

        <p className="text-xl text-gray-600 mt-2">
          {portfolio.profession}
        </p>

        <hr className="my-6" />

        <div className="mb-5">
          <h3 className="font-bold text-lg">Skills</h3>
          <p>{portfolio.skills}</p>
        </div>

        <div className="mb-5">
          <h3 className="font-bold text-lg">Experience</h3>
          <p>{portfolio.experience}</p>
        </div>

        <div className="mb-5">
          <h3 className="font-bold text-lg">Portfolio Link</h3>

          <a
            href={portfolio.portfolioLink}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            {portfolio.portfolioLink}
          </a>

        </div>

        <div className="mb-5">
          <h3 className="font-bold text-lg">Contact Email</h3>
          <p>{portfolio.email}</p>
        </div>

        <div className="mb-5">
          <h3 className="font-bold text-lg">About</h3>
          <p>{portfolio.about}</p>
        </div>

        <Link to="/portfolioform">
          <button className="mt-6 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 cursor-pointer">
            Edit Portfolio
          </button>
        </Link>

      </div>

    </div>
  );
}

export default PortfolioPreview;