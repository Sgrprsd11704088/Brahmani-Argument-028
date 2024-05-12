import MainSection from "../components/MainSection";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import SearchSection from "../components/SearchSection";

const Home = () => {
  return (
    <div>
      <Navbar />
      <SearchSection />
      <MainSection />
      <Player />
    </div>
  );
};

export default Home;
