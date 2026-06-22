import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedFreelancers from "../components/FeaturedFreelancers";
import LatestProjects from "../components/LatestProjects";
import Portfolio from "../components/Portfolio";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <FeaturedFreelancers />
      <LatestProjects />
      <Portfolio />
      <Footer />
    </div>
  );
}

export default Home;
    