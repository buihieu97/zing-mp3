import React from "react";

const SkeletonArtist = (props) => {
  return (
    <div className="flex flex-col items-center mt-10 animate-pulse ">
      <div className="w-[200px] h-[200px] bg-gray-500 rounded-full"></div>
      <div className="h-4 w-[150px] bg-gray-500 mt-5"></div>
      <div className="h-3 w-[80px] bg-gray-500 mt-5"></div>

      <div className="w-full h-8 bg-gray-500 mt-10"></div>
      <div className="w-full h-8 bg-gray-500 mt-10"></div>
      <div className="w-full h-8 bg-gray-500 mt-10"></div>
      <div className="w-full h-8 bg-gray-500 mt-10"></div>
      <div className="w-full h-8 bg-gray-500 mt-10"></div>
    </div>
  );
};

export default SkeletonArtist;
