import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardMusic from "../components/CardMusic";
import Skeleton from "../components/Skeleton";
import {
  addNamePlayList,
  addTopChartVn,
  addTopRap,
  setCurrentIndex,
} from "../redux/dataSlice";
import { musicApi } from "../services/musicApi";
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const topMusicChartVn = useSelector((state) => {
    return state.data.topChartVn;
  });
  const topRap = useSelector((state) => {
    return state.data.topRap;
  });

  useEffect(() => {
    (async function fetchData() {
      try {
        const [topChartVn, topRap] = await Promise.all([
          musicApi.getChartHome(),

          musicApi.getDetailTopRap("ZWZB96AI"),
        ]);
        let sliceTop20 = topChartVn.data.RTChart.items.slice(0, 20);
        let sliceTopRap20 = topRap.data.song.items.slice(0, 20);
        dispatch(addTopChartVn(sliceTop20));
        dispatch(addTopRap(sliceTopRap20));
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (isLoading) {
    return <Skeleton />;
  }
  return (
    <div className="my-10">
      <h1 className="text-2xl mb-10">Recommended</h1>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] gap-3">
        {topMusicChartVn &&
          topMusicChartVn.map((item, index) => (
            <div
              key={item.encodeId}
              onClick={() => {
                dispatch(setCurrentIndex(index));

                dispatch(addNamePlayList("topChartVn"));
              }}
            >
              <CardMusic data={item} />
            </div>
          ))}
      </div>

      <h1 className="text-3xl my-10">Top Rap </h1>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] gap-3">
        {topRap &&
          topRap.map((item, index) => (
            <div
              key={item.encodeId}
              onClick={() => {
                dispatch(setCurrentIndex(index));

                dispatch(addNamePlayList("topRap"));
              }}
            >
              <CardMusic data={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
