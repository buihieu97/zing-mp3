import React from "react";
import { formatDuration } from "../helper/formartFollow";

const CardPlayList = ({ item, index }) => {
  return (
    <>
      <div className="flex text-base md:text-lg lg:text-xl xl:text-2xl items-center mt-5 transition-all bg-transparent duration-300 hover:bg-[rgba(255,255,255,0.1)] p-3 cursor-pointer">
        <div className="text-2xl lg:text-3xl font-bold text-gray-400 w-4">
          {index}
        </div>
        <div className="w-[50px] h-auto ml-5 lg:ml-10    lg:w-[80px] ">
          <img src={item.thumbnailM} />
        </div>
        <div className="ml-5 lg:ml-10 w-2/4">
          <p className="text-truncation ">{item.title}</p>

          <p className="ml-auto text-gray-400 text-sm lg:text-base xl:text-lg text-truncation">
            {item.artistsNames}
          </p>
        </div>
        <div className="ml-auto text-gray-400 ">
          {formatDuration(item.duration)}
        </div>
      </div>
    </>
  );
};

export default CardPlayList;
