import React, { memo } from "react";

const Title = ({ infoSong }) => {
  return (
    <div className="flex items-center">
      <div className=" w-16  mr-5  ">
        <img src={infoSong?.thumbnailM} />
      </div>
      <div className="hidden md:block">
        <p className="mb-2 text-truncation text-base font-semibold">
          {infoSong?.title}
        </p>
        <p className="text-gray-400 text-truncation text-sm">
          {infoSong?.artistsNames}
        </p>
      </div>
    </div>
  );
};

export default memo(Title);
