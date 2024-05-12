import axios from "axios";
import { Link } from "react-router-dom";
import MusicContext from "../context/MusicContext";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/store/auth-slice";

const Navbar = () => {
  const { setSearchedSongs } = useContext(MusicContext);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const searchSongs = async (e) => {
    const res = await axios.get(
      `https://jiosaavn-api-git-main-sagar-prasads-projects.vercel.app/api/search/songs?query=${e.target.value}`
    );
    const { data } = await res.data;
    if (
      data.results.length === 0 ||
      e.target.value === " " ||
      e.target.value.length === 0
    ) {
      setSearchedSongs([]);
    } else {
      setSearchedSongs(data.results);
    }

    // console.log(data.results);
  };

  // console.log(isLoggedIn, user);

  return (
    <nav className="md:flex justify-between items-center py-3 border-none lg:border px-2 fixed top-0 left-0 right-0 bg-[#f5f5f5ff] z-20">
      {/* 1st div  */}
      <div className="flex flex-col lg:flex-row justify-between items-center mx-auto lg:mx-0">
        <div className="flex justify-between items-center gap-2 mr-4">
          <img src="/4.png" alt="logo" width={40} />
          <Link to={"/"} className="font-extrabold text-lg">
            Harmony
          </Link>
        </div>

        {/* <div className="flex text-[24px] lg:text-[15px] gap-5 text-gray-600 font-semibold h-full">
          <li className="list-none">Music</li>
          <li className="list-none">Podcasts</li>
          <li className="list-none">Go Pro</li>
        </div> */}
      </div>

      {/* 2nd div  */}
      <div className="flex justify-center mt-2 md:mt-0">
        <input
          type="text"
          name="search"
          id="search"
          className="py-2 rounded-full w-[40vw] outline-none text-center border text-black"
          placeholder="Search for songs"
          autoComplete="off"
          autoCorrect="off"
          onChange={searchSongs}
        />
      </div>

      {/* 3rd div  */}
      <div className="hidden lg:flex justify-between items-center gap-4">
        {/* <div className="flex justify-center gap-2">
          <div className="flex flex-col text-sm">
            <span className="text-[14px] text-gray-600 font-semibold">
              Music Languages
            </span>
            <span className="text-[12px] text-gray-500">Hindi</span>
          </div>
          <MdKeyboardArrowDown className="text-xl text-gray-500 mt-2" />
        </div> */}
        {isLoggedIn ? (
          <div className="flex text-[15px] gap-5 text-gray-600 font-semibold">
            <p >Welcome {user.username}</p>
            <button
              className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded ml-4"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <div className="flex text-[15px] gap-5 text-gray-600 font-semibold">
              <li className="list-none">
                <Link to={"/login"} className="font-extrabold text-lg">
                  Log In
                </Link>
              </li>
              <li className="list-none">
                <Link to={"/signup"} className="font-extrabold text-lg">
                  Sign Up
                </Link>
              </li>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
