import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import CardPlayList from "../components/CardPlayList";
import SkeletonArtist from "../components/SkeletonArtist";
import { formatNumber } from "../helper/formartFollow";
import {
  addNamePlayList,
  addPlayList,
  setCurrentIndex,
} from "../redux/dataSlice";
import { musicApi } from "../services/musicApi";

const Artist = () => {
  const param = useParams();
  const [artist, setArtist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    (async function fetchArtist() {
      setIsLoading(true);
      let fetchArtist = await musicApi.getArtist({
        name: param.teamId,
      });

      dispatch(addPlayList(fetchArtist?.data.sections[0].items));

      setArtist(fetchArtist);
      setIsLoading(false);
    })();
  }, [param]);

  if (isLoading) return <SkeletonArtist />;
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="text-center lg:text-2xl xl:text-3xl ">
        <div className="w-[200px] h-auto   ">
          <img src={artist?.data?.thumbnailM} className="rounded-full" />
        </div>
        <p className="mt-4 font-bold lg:text-2xl xl:text-3xl ">
          {artist?.data?.name}
        </p>
        <span className="text-base mt-4 text-gray-400">
          {formatNumber(Number(artist?.data.totalFollow))} Followers
        </span>
      </div>

      <div className="self-start   mt-5 w-full">
        <div className="lg:text-2xl xl:text-3xl ">Popular</div>
        {artist?.data.sections[0].items &&
          artist?.data.sections[0].items.map((item, index) => (
            <div
              onClick={() => {
                dispatch(setCurrentIndex(index));

                dispatch(addNamePlayList("playList"));
              }}
              key={item.encodeId}
            >
              <CardPlayList item={item} index={index} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Artist;
