import { useContext } from "react";
import MusicContext from "../context/MusicContext";

const SongItem = ({ name, image, duration, downloadUrl, id, artists }) => {
  const { playMusic } = useContext(MusicContext);

  return (
    <div className=" w-[160px] max-h-[220px] overflow-y-clip flex flex-col justify-center items-center gap-3 rounded-lg">
      <img
        src={image[2].url}
        alt={name}
        className="rounded-lg cursor-pointer"
        onClick={() =>
          playMusic(downloadUrl, name, duration, image, id, artists)
        }
      />
      <div className="text-[13px] w-full flex flex-col  items-center">
        <span className="font-semibold overflow-x-clip">{name}</span>
      </div>
    </div>
  );
};

export default SongItem;
