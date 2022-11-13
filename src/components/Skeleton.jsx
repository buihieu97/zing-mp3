import React from "react";
import { arraySkeleton } from "../helper/fakeArray";

const Skeleton = (props) => {
  return (
    <div>
      <div className="bg-gray-500 w-[200px] h-8 animate-pulse my-10"></div>

      <div className="grid grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] gap-3 ">
        {arraySkeleton.map((item, i) => (
          <div className="animate-pulse" key={item + i}>
            <div className="bg-gray-500  w-full h-0 pt-[100%] mb-3"></div>

            <div className="bg-gray-500 w-2/3 h-5 mb-3"></div>
            <div className="bg-gray-500 w-1/3 h-5"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
