import { useNavigate } from "react-router-dom";

function Portfolio() {

    const navigate = useNavigate();

    return(
        <section className="py-10 text-center">

            <h2 className="text-3xl font-bold mb-4">
                Share Your Portfolio
            </h2>

            <p className="mb-6">
                Showcase your skills and get the chance to work.
            </p>

            <button
                onClick={() => navigate("/portfolioform")}
                className="text-white px-4 py-2 rounded-4xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 cursor-pointer "
            >
                 Share Portfolio
            </button>

        </section>
    );

}

export default Portfolio;