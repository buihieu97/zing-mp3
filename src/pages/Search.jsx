import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import {
  addNamePlayList,
  addPlayListSearch,
  setCurrentIndex,
} from "../redux/dataSlice";
import { musicApi } from "../services/musicApi";
import Skeleton from "../components/Skeleton";
import CardMusic from "../components/CardMusic";
const Search = () => {
  const location = useLocation();
  const param = decodeURI(location.search.slice(3));
  const dispatch = useDispatch();
  const playList = useSelector((state) => state.data.playListSearch);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSearch, setDataSearch] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    (async function getDataSearch() {
      try {
        setIsLoading(true);
        const fetchDataSearch = await musicApi.getSearch({
          keyword: param,
        });
        dispatch(addPlayListSearch(fetchDataSearch.data.songs));
        setDataSearch(fetchDataSearch.data);
        setIsLoading(false);
      } catch (err) {
        throw new Error(err);
      }
    })();
  }, [param]);

  if (isLoading) return <Skeleton />;

  return (
    <div>
      <p className="my-4 text-3xl">Track </p>

      <div className="grid grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] gap-3">
        {!isLoading &&
          playList &&
          playList.map((item, index) => (
            <div
              key={item.id}
              onClick={() => {
                dispatch(setCurrentIndex(index));

                dispatch(addNamePlayList("playListSearch"));
              }}
            >
              <CardMusic data={item} />
            </div>
          ))}
      </div>
      <p className="my-4 text-3xl">Artists </p>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] gap-3">
        {!isLoading &&
          dataSearch.artists &&
          dataSearch?.artists.map((item, index) => (
            <div
              key={item.encodeId}
              onClick={() => {
                navigate(`/artist/${item.alias}`);
              }}
            >
              <CardMusic data={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
