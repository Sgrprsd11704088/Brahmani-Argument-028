import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import MusicContext from "../context/MusicContext";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import SongsList from "../components/SongsList";

const AlbumDetails = () => {
  const { setSongs } = useContext(MusicContext);
  const [album, setAlbum] = useState([]);
  const [image, setImage] = useState([]);

  const { id } = useParams();

  const getAlbumDetails = async () => {
    const res = await axios.get(
      `https://jiosaavn-api-sagar-prasads-projects.vercel.app/api/albums?id=${id}`
    );
    const { data } = await res.data;

    console.log(data);

    setAlbum(data);
    setImage(getImg(data.image));
    setSongs(data.songs);
  };

  const getImg = (image) => (image = image[2]?.url);

  useEffect(() => {
    getAlbumDetails();
  }, []);

  return (
    <>
      <Navbar />

      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-24 h-screen my-48 lg:my-0 mx-2 lg:mx-auto">
        <div>
          <img
            src={image}
            alt={album.name}
            width={250}
            className="mx-auto mb-4 rounded"
          />
          <div className="w-[250px] text-gray-600">
            <h1>{album.name}</h1>
            <p>by Various Artists . {album.songCount} songs</p>
          </div>
        </div>

        <div>
          {album.songs?.map((song) => {
            return <SongsList key={song.id} {...song} />;
          })}
        </div>
      </div>

      <Player />
    </>
  );
};

export default AlbumDetails;