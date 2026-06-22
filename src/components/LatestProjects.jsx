function LatestProjects() {
  return (
    <section className="py-10">

      <h2 className="text-3xl font-bold text-center mb-8">
        Latest Projects
      </h2>

      <div className="flex justify-center gap-6 flex-wrap">

        <div className="border p-7 rounded-lg bg-green-300 hover:bg-green-400 cursor-pointer">
          <h3 className="font-bold">E-Commerce Website</h3>
          <p>Need a React developer for an online store.</p>
        </div>

        <div className="border p-7 rounded-lg bg-green-300 hover:bg-green-400 cursor-pointer">
          <h3 className="font-bold">Logo Design</h3>
          <p>Create a modern logo for a startup company.</p>
        </div>

        <div className="border p-7 rounded-lg bg-green-300 hover:bg-green-400 cursor-pointer">
          <h3 className="font-bold">Content Writing</h3>
          <p>Write friendly blog articles.</p>
        </div>

      </div>

    </section>
  );
}

export default LatestProjects;