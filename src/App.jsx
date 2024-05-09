import AlbumDetails from "./pages/AlbumDetails";
import Auth from "./pages/Auth";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/albums/:id" element={<AlbumDetails />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};

export default App;
