function Categories() {
  return (
    <section className="py-10 px-8" >

      <h2 className="text-3xl font-bold text-center mb-8">
        Categories
      </h2>

      <div className="flex justify-center gap-6 flex-wrap">

        <div className="border p-6 rounded bg-green-400 hover:bg-green-500 cursor-pointer">
          <h3>Web Development</h3>
        </div>

        <div className="border p-6 rounded bg-green-400 hover:bg-green-500 cursor-pointer">
          <h3>Graphic Design</h3>
        </div>

        <div className="border p-6 rounded bg-green-400 hover:bg-green-500 cursor-pointer">
          <h3>Content Writing</h3>
        </div>

        <div className="border p-6 rounded bg-green-400 hover:bg-green-500 cursor-pointer">
          <h3>Digital Marketing</h3>
        </div>

      </div>

    </section>
  );
}

export default Categories;