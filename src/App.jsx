import AlbumDetails from "./pages/AlbumDetails";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MusicContext from "./context/MusicContext";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useSelector } from "react-redux";

const App = () => {
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [searchedSongs, setSearchedSongs] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const playMusic = async (music, name, duration, image, id, artists) => {
    if (currentSong && currentSong.id === id) {
      if (isPlaying) {
        setIsPlaying(false);
        currentSong.audio.pause();
      } else {
        setIsPlaying(true);
        await currentSong.audio.play();
      }
    } else {
      if (currentSong) {
        currentSong.audio.pause();
        setIsPlaying(false);
      }

      const newAudio = new Audio(music[4].url);
      setCurrentSong({
        name,
        duration,
        image: image[2].url,
        id,
        audio: newAudio,
        primaryArtists: artists.primary.map((artist) => artist.name).join(","),
      });
      setIsPlaying(true);
      // console.log(currentSong);
      await newAudio.play();
    }
  };

  const nextSong = () => {
    if (currentSong) {
      const index = songs.findIndex((song) => song.id === currentSong.id);
      if (index === songs.length - 1) {
        const { downloadUrl, name, duration, image, id, artists } = songs[0];
        playMusic(downloadUrl, name, duration, image, id, artists);
      } else {
        const { downloadUrl, name, duration, image, id, artists } =
          songs[index + 1];
        playMusic(downloadUrl, name, duration, image, id, artists);
      }
    }
  };

  const prevSong = () => {
    if (currentSong) {
      const index = songs.findIndex((song) => song.id === currentSong.id);
      if (index === 0) {
        const { downloadUrl, name, duration, image, id, artists } =
          songs[songs.length - 1];
        playMusic(downloadUrl, name, duration, image, id, artists);
      } else {
        const { downloadUrl, name, duration, image, id, artists } =
          songs[index - 1];
        playMusic(downloadUrl, name, duration, image, id, artists);
      }
    }
  };

  return (
    <MusicContext.Provider
      value={{
        songs,
        setSongs,
        playMusic,
        isPlaying,
        currentSong,
        prevSong,
        nextSong,
        searchedSongs,
        setSearchedSongs,
      }}
    >
      <Routes>
        {isLoggedIn && <Route path="/:id" element={<Home />} />}
        <Route path="/" element={<Home />} />
        <Route path="/albums/:id" element={<AlbumDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </MusicContext.Provider>
  );
};

export default App;
