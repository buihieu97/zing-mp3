import React, { memo } from "react";

const Title = ({ infoSong }) => {
  return (
    <div className="flex items-center">
      <div className=" w-16  mr-5  ">
        <img src={infoSong?.thumbnailM} />
      </div>
      <div className="hidden md:block relative">
        <p className="mb-2  text-base font-semibold marquee max-w-[200px]">
          {infoSong?.title}
        </p>

        <p className="text-gray-400 text-truncation text-sm max-w-[200px]">
          {infoSong?.artistsNames}
        </p>
      </div>
    </div>
  );
};

export default memo(Title);
