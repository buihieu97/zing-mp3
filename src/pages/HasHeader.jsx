import React from "react";
import { PlayerMusic } from "../components";
import Header from "../components/Header";

const HasHeader = (props) => {
  return (
    <div className="">
      <Header />
      <div className="mx-[5vw] mb-[200px]">{props.children}</div>
      <PlayerMusic />
    </div>
  );
};

export default HasHeader;
