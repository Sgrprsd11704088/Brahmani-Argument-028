import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import AlbumItem from "./AlbumItem";
import { useRef } from "react";

const Slider = ({ data }) => {
  const scrollRef = useRef(null);

  const scrollRight = () => {
    scrollRef.current.scrollLeft += 800;
  };

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 800;
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <MdOutlineKeyboardArrowLeft
        className="text-3xl text-grat-600 hover:scale-125 transition-all duration-500 ease-in-out cursor-pointer hidden lg:block"
        onClick={scrollLeft}
      />

      <div
        className="grid grid-rows-2 grid-flow-col-dense justify-between gap-4 items-center overflow-x-scroll w-full lg:w-[78vw] px-5 scroll-hide"
        ref={scrollRef}
      >
        {data?.map((album) => {
          const { id, name, artist_map } = album;
          return (
            <AlbumItem
              key={id}
              id={id}
              name={name}
              artists={artist_map?.artists}
              {...album}
            />
          );
        })}
      </div>

      <MdOutlineKeyboardArrowRight
        className="text-3xl text-grat-600 hover:scale-125 transition-all duration-500 ease-in-out cursor-pointer hidden lg:block"
        onClick={scrollRight}
      />
    </div>
  );
};

export default Slider;
