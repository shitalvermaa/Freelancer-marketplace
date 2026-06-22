import webdev from "../assets/webdev_image.jpg";
import logo from "../assets/logo.png";
import contentwriting from "../assets/contentwriting.jpg";
function FindWork() {
  return (
    <div className="p-8 mx-50">

      <h1 className="text-green-700 text-3xl font-bold text-center mb-8">
        Find Work
      </h1>

      <div className="border p-6 rounded-2xl mb-20 relative">
        <h2 className="text-xl font-bold">
          Website Development
        </h2>

        <p>Budget: ₹10,000</p>

        <p>
          Need a React Developer for an e-commerce website.
        </p>

        <button className="bg-green-500 text-white px-4 py-2 rounded mt-3 hover:bg-green-600 ">
          Apply
        </button>
        <div className="absolute right-6 top-6">
            <img src={webdev} alt="Website Development" className="w-32 h-32 rounded-lg" />
        </div>
      </div>

      <div className="border p-6 rounded-2xl mb-20 relative">
        <h2 className="text-xl font-bold">
          Logo Design
        </h2>

        <p>Budget: ₹5,000</p>

        <p>
          Need a Graphic Designer for a startup logo.
        </p>

        <button className="bg-green-500 text-white px-4 py-2 rounded mt-3 hover:bg-green-600">
          Apply
        </button>
        <div className="absolute right-6 top-6" >
            <img src={logo} alt="Graphic Desginer" className="w-32 h-32 rounded-lg" />
        </div>
      </div>

      <div className="border p-6 rounded-2xl mb-20 relative">
        <h2 className="text-xl font-bold">
          Content Writing
        </h2>

        <p>Budget: ₹3,000</p>

        <p>
          Need blog articles for a technology website.
        </p>

        <button className="bg-green-500 text-white px-4 py-2 rounded mt-3 hover:bg-green-600">
          Apply
        </button>
         <div className="absolute right-6 top-6" >
            <img src={contentwriting} alt="Content Writing" className="w-32 h-32 rounded-lg" />
        </div>
      </div>

    </div>
  );
}

export default FindWork;