import React, { useEffect, useRef, memo } from "react";

const Progress = ({ percent, handlePercent, width }) => {
  const refBar = useRef(null);
  let isReadyToDrag = false;
  const handleMouseDown = (e) => {
    isReadyToDrag = true;
    let clientX = e.clientX || e.touches[0].clientX;

    let left = refBar.current.getBoundingClientRect().left;
    let ready = clientX - left;
    let width = refBar.current.getBoundingClientRect().width;
    handlePercent(((ready / width) * 100).toFixed());
  };
  const handleMouseMove = (e) => {
    if (refBar.current) {
      let clientX = e.clientX || e.touches[0].clientX;
      let left = refBar.current.getBoundingClientRect().left;
      let right = refBar.current.getBoundingClientRect().right;
      let width = refBar.current.getBoundingClientRect().width;
      if (isReadyToDrag && clientX >= left && clientX <= right) {
        let ready = clientX - left;
        handlePercent(((ready / width) * 100).toFixed());
      }
    }
  };
  const handleMouseUp = (e) => {
    isReadyToDrag = false;
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleMouseMove);
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener;
    };
  }, [percent]);

  return (
    <div
      className={` h-[5px] bg-slate-400 relative rounded-full w-full    group`}
      ref={refBar}
      onTouchStart={handleMouseDown}
      onMouseDown={handleMouseDown}
    >
      <div
        className={`absolute h-[5px] bg-green-800 rounded-full `}
        style={{
          width: percent + "%",
        }}
      >
        <div className="absolute w-4 h-4 rounded-full bg-white -right-2 -translate-y-1/2 top-1/2 cursor-pointer opacity-0 group-hover:opacity-100 "></div>
      </div>
    </div>
  );
};

export default memo(Progress);
