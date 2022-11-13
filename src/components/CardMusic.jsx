import React from "react";
import { HiOutlinePlay } from "react-icons/hi";
import { formatNumber } from "../helper/formartFollow";

const CardMusic = ({ data }) => {
  return (
    <div className="w-full h-full flex flex-col  transition duration-300 bg-color-header hover:bg-color-hover p-5 rounded-md relative group cursor-pointer">
      <div className="w-full h-0 pb-[100%] relative ">
        <img
          className="absolute w-full h-full object-cover rounded-md group-hover:brightness-[80%] transition duration-300"
          src={data.thumbnailM}
        />
        {!data.totalFollow && (
          <div className="absolute  left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 text-6xl opacity-0  group-hover:opacity-100 transition-all duration-300 text-gray-300">
            <HiOutlinePlay />
          </div>
        )}
      </div>

      <div className="mt-auto">
        <p className="mt-8 line-clamp-2 text-base lg:text-base font-semibold text-truncation">
          {data.title || data.name}
        </p>
        <p className="text-gray-400 line-clamp-2 mt-2 text-sm  text-truncation">
          {data.artistsNames || formatNumber(data.totalFollow)}
          {data.totalFollow && <span className="ml-2">Followers</span>}
        </p>
      </div>
    </div>
  );
};

export default CardMusic;
