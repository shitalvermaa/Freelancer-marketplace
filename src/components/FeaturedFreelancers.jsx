function FeaturedFreelancers() {
  return (
    <section className="py-10">

      <h2 className="text-3xl font-bold text-center mb-8">
        Featured Freelancers
      </h2>

      <div className="flex justify-center gap-6 flex-wrap">

        <div className="border p-6 rounded-lg">
          <h3 className="font-bold">Shashilata Chauhan</h3>
          <p>Web Developer</p>
          <button className="bg-green-500 text-white px-4 py-2 rounded mt-3 hover:bg-green-600 cursor-pointer">
            View Portfolio
          </button>
        </div>

        <div className="border p-6 rounded-lg">
          <h3 className="font-bold">Kritika Singh</h3>
          <p>Graphic Designer</p>
          <button className="bg-green-500 text-white px-4 py-2 rounded mt-3 hover:bg-green-600 cursor-pointer">
            View Portfolio
          </button>
        </div>

        <div className="border p-6 rounded-lg">
          <h3 className="font-bold">Anushka Pandey</h3>
          <p>Content Writer</p>
          <button className="bg-green-500 text-white px-4 py-2 rounded mt-3 hover:bg-green-600 cursor-pointer">
            View Portfolio
          </button>
        </div>

        <div className="border p-6 rounded-lg">
          <h3 className="font-bold">Sagar Verma</h3>
          <p>UI/UX Designer</p>
          <button className="bg-green-500 text-white px-4 py-2 rounded mt-3 hover:bg-green-600 cursor-pointer">
            View Portfolio
          </button>
        </div>

        <div className="border p-6 rounded-lg">
          <h3 className="font-bold">Ishika Singh</h3>
          <p>Mobile App Developer</p>
          <button className="bg-green-500 text-white px-4 py-2 rounded mt-3 hover:bg-green-600 cursor-pointer">
            View Portfolio
          </button>
        </div>

        <div className="border p-6 rounded-lg">
          <h3 className="font-bold">Arjun Mehta</h3>
          <p>Digital Marketer</p>
          <button className="bg-green-500 text-white px-4 py-2 rounded mt-3 hover:bg-green-600 cursor-pointer">
            View Portfolio
          </button>
        </div>

      </div>

    </section>
  );
}

export default FeaturedFreelancers;