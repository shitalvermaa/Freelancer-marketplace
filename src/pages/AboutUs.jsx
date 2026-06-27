import Footer from "../components/Footer";

function AboutUs() {
  return (
    <div>

      {/* Hero Section */}

      <section className="text-center py-20 bg-green-50">

        <h1 className="text-5xl font-bold mb-6">
          Hire from the Top 1% on FreelancerHub
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Connect with highly skilled freelancers for web development,
          graphic design, content writing and much more.
        </p>

        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 cursor-pointer">
          Hire Now
        </button>

      </section>

      {/* Trusted Companies Section */}

      <section className="py-16">

        <h2 className="text-3xl font-bold text-center mb-10">
          Trusted By Leading Companies
        </h2>

        <div className="flex justify-center gap-12 flex-wrap text-xl font-semibold">

          <p>Google</p>
          <p>Microsoft</p>
          <p>Amazon</p>
          <p>Infosys</p>
          <p>TCS</p>

        </div>

      </section>

      {/* How It Works Section */}

      <section className="py-16 bg-gray-50">

        <h2 className="text-3xl font-bold text-center mb-10">
          How It Works
        </h2>

        <div className="flex justify-center gap-8 flex-wrap">

          <div className="border rounded-xl p-6 shadow w-72 text-center">
            <h3 className="text-xl font-bold mb-3">
              Step 1
            </h3>

            <p>
              Sign up and create your account on FreelancerHub.
            </p>
          </div>

          <div className="border rounded-xl p-6 shadow w-72 text-center">
            <h3 className="text-xl font-bold mb-3">
              Step 2
            </h3>

            <p>
              Get a shortlist of talented freelancers based on your requirements.
            </p>
          </div>

          <div className="border rounded-xl p-6 shadow w-72 text-center">
            <h3 className="text-xl font-bold mb-3">
              Step 3
            </h3>

            <p>
              Hire the best freelancer and start working instantly.
            </p>
          </div>

        </div>

      </section>

      {/* Client Reviews Section */}

      <section className="py-16">

        <h2 className="text-3xl font-bold text-center mb-10">
          What Our Clients Say
        </h2>

        <div className="flex justify-center gap-8 flex-wrap">

          <div className="border rounded-xl p-6 shadow w-80">
            <p>
              "FreelancerHub helped us find an excellent React Developer within days."
            </p>

            <h4 className="font-bold mt-4">
              - Rahul Sharma
            </h4>
          </div>

          <div className="border rounded-xl p-6 shadow w-80">
            <p>
              "Very professional freelancers and an easy hiring process."
            </p>

            <h4 className="font-bold mt-4">
              - Priya Mehta
            </h4>
          </div>

          <div className="border rounded-xl p-6 shadow w-80">
            <p>
              "Highly recommended platform for startups and businesses."
            </p>

            <h4 className="font-bold mt-4">
              - Aman Verma
            </h4>
          </div>

        </div>

      </section>

      {/* Call To Action Section */}

      <section className="text-center py-20 bg-green-100">

        <h2 className="text-4xl font-bold mb-4">
          Try FreelancerHub Today
        </h2>

        <p className="text-lg text-gray-700 mb-6">
          Discover top freelancers and grow your business faster.
        </p>

        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 cursor-pointer">
          Get Started
        </button>

      </section>

      {/* Footer */}

      <Footer />

    </div>
  );
}

export default AboutUs;