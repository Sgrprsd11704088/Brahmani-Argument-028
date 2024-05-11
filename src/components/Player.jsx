import { useContext, useEffect, useRef, useState } from "react";
import { BiRepeat } from "react-icons/bi";
import { FaPause, FaPlay } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { LuHardDriveDownload } from "react-icons/lu";
import { PiShuffleBold } from "react-icons/pi";
import VolumeController from "./VolumeController";
import MusicContext from "../context/MusicContext";

const Player = () => {
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);

  const { currentSong, playMusic, isPlaying, prevSong, nextSong } =
    useContext(MusicContext);

  const inputRef = useRef();

  useEffect(() => {
    if (currentSong) {
      const audioElement = currentSong.audio;

      const handleTimeUpdate = () => {
        const duration = Number(currentSong.duration);
        const currentTime = audioElement.currentTime;
        const newTiming = (currentTime / duration) * 100;
        inputRef.current.value = newTiming;
      };

      const handleSongEnd = () => nextSong();

      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("ended", handleSongEnd);

      return () => {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.removeEventListener("ended", handleSongEnd);
      };
    }
  }, [currentSong, nextSong]);

  const handleProgressChange = (event) => {
    const newPercentage = parseFloat(event.target.value);
    const newTime = (newPercentage / 100) * Number(currentSong.duration);
    if (newTime >= 0) {
      currentSong.audio.currentTime = newTime;
    }
  };

  const handleDownloadSong = async (url) => {
    try {
      const res = await fetch(url);
      console.log(res);
      const blob = await res.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${currentSong.name}.mp3`;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.log("Error fetching or downloading files", error);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 left-0 bg-[#f5f5f5ff] flex flex-col">
      <input
        type="range"
        name="progress"
        id="progress"
        min={0}
        max={100}
        step="0.1"
        value={0}
        ref={inputRef}
        onChange={handleProgressChange}
        className="w-full h-[5px] text-green-400 range"
      />

      <div className="flex justify-between items-center mb-3 px-3">
        {/* Song Details  */}
        <div className="flex justify-start items-center gap-3 lg:w-[30vw]">
          <img
            src={currentSong?.image}
            alt=""
            width={55}
            className="rounded-lg"
          />
          <div className="hidden lg:block">
            <span>{currentSong?.name}</span>
            <p className="text-xs text-gray-500">
              {currentSong?.primaryArtists}
            </p>
          </div>
        </div>

        {/* Song Controls  */}
        <div className="flex text-2xl lg:text-3xl gap-4 lg:gap-6 lg:w-[40vw] justify-center">
          <BiRepeat className="text-gray-400 cursor-pointer" />
          <IoMdSkipBackward
            onClick={prevSong}
            className="text-gray-700 hover:text-gray-500 cursor-pointer"
          />
          {isPlaying ? (
            <FaPause
              className="text-gray-700 hover:text-gray-500 cursor-pointer"
              onClick={() =>
                playMusic(
                  currentSong.audio,
                  currentSong.name,
                  currentSong.duration,
                  currentSong.image,
                  currentSong.id
                )
              }
            />
          ) : (
            <FaPlay
              className="text-gray-700 hover:text-gray-500 cursor-pointer"
              onClick={() =>
                playMusic(
                  currentSong.audio,
                  currentSong.name,
                  currentSong.duration,
                  currentSong.image,
                  currentSong.id
                )
              }
            />
          )}

          <IoMdSkipForward
            onClick={nextSong}
            className="text-gray-700 hover:text-gray-500 cursor-pointer"
          />
          <PiShuffleBold className="text-gray-400 cursor-pointer" />
        </div>

        {/* Sound Controls  */}
        <div
          className="flex lg:w-[30vw] justify-end items-center"
          onMouseEnter={() => setIsVolumeVisible(true)}
          onMouseLeave={() => setIsVolumeVisible(false)}
        >
          <LuHardDriveDownload
            className="text-gray-700 hover:text-gray-500 text-2xl lg:text-3xl 
          cursor-pointer lg:mr-2"
            onClick={() => handleDownloadSong(currentSong.audio.src)}
          />
          <HiSpeakerWave
            className="text-gray-700 hover:text-gray-500 text-2xl lg:text-3xl 
          cursor-pointer hidden lg:block"
          />
          <VolumeController isVolumeVisible={isVolumeVisible} />
        </div>
      </div>
    </div>
  );
};

export default Player;
