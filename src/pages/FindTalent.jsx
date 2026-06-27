function FindTalent() {
  return (
    <div className="p-8 mx-50">

      <h1 className="text-green-700 text-3xl font-bold text-center mb-8">
        Find Talent
      </h1>

      <div className="border p-6 rounded-2xl mb-10">
        <h2 className="text-xl font-bold">Rahul Sharma</h2>

        <p>Web Developer</p>

        <p>
          React, JavaScript and Tailwind CSS Developer.
        </p>

        <button className="bg-green-500 text-white px-4 py-2 rounded mt-3 hover:bg-green-600">
          Hire
        </button>
      </div>

      <div className="border p-6 rounded-2xl mb-10">
        <h2 className="text-xl font-bold">Priya Verma</h2>

        <p>Graphic Designer</p>

        <p>
          Logo Design, Banner Design and Branding Expert.
        </p>

        <button className="bg-green-500 text-white px-4 py-2 rounded mt-3 hover:bg-green-600">
          Hire
        </button>
      </div>

      <div className="border p-6 rounded-2xl mb-10">
        <h2 className="text-xl font-bold">Aman Gupta</h2>

        <p>Content Writer</p>

        <p>
          Blog Writing and SEO Content Specialist.
        </p>

        <button className="bg-green-500 text-white px-4 py-2 rounded mt-3 hover:bg-green-600">
          Hire
        </button>
      </div>

    </div>
  );
}

export default FindTalent;