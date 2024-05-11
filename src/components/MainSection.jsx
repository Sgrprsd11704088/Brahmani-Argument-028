import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Slider from "./Slider";

const MainSection = () => {
  const [albums, setAlbums] = useState([]);
  const [trending, setTrending] = useState([]);

  const getHomePageData = async () => {
    const res = await axios.get("http://127.0.0.1:3000/modules");
    console.log(res);
    const { data } = res.data;

    setAlbums(data.albums.data);
    setTrending(data.trending.data);
  };

  useEffect(() => {
    getHomePageData();
  }, []);

  const trendingAlbums = useMemo(
    () => (Array.isArray(trending) ? trending : []),
    [trending]
  );

  return (
    <section className="my-24">
      <h2 className="text-xl px-5 py-3 font-semibold text-gray-700 w-full lg:w-[78vw] mx-auto">
        Trending Now
      </h2>
      <Slider data={trendingAlbums} />
      <h2 className="text-xl px-5 py-3 font-semibold text-gray-700 w-full lg:w-[78vw] mx-auto">
        Top Albums
      </h2>
      <Slider data={albums} />
    </section>
  );
};

export default MainSection;
