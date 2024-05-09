import axios from "axios";
import { useEffect, useState } from "react";
import AlbumItem from "./AlbumItem";

const MainSection = () => {
  const [albums, setAlbums] = useState([]);
  const [trending, setTrending] = useState([]);

  const getHomePageData = async () => {
    const res = await axios.get("http://127.0.0.1:3000/modules");
    const { data } = res.data;
    console.log(data);

    setAlbums(data.albums.data);
    setTrending(data.trending);
  };

  useEffect(() => {
    getHomePageData();
  }, []);

  console.log(albums);

  return (
    <>
      {albums.map((album) => (
        <AlbumItem
          key={album.id}
          id={album.id}
          name={album.name}
          artists={album.artist_map.artists}
          {...album}
        />
      ))}
    </>
  );
};

export default MainSection;
