import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Title from "./Title";
import {
  BsPlayCircle,
  BsPauseCircle,
  BsSkipEnd,
  BsSkipStart,
  BsVolumeUpFill,
  BsVolumeMuteFill,
  BsBroadcast,
} from "react-icons/bs";

import { setCurrentIndex } from "../../redux/dataSlice";
import Progress from "../Progress";
import { musicApi } from "../../services/musicApi";

import { formatDuration } from "../../helper/formartFollow";

const PlayerMusic = () => {
  const refAudio = useRef(null);
  const RefTimeUpdate = useRef(null);
  const [isPlay, setIsPlay] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [infoSong, setInfoSong] = useState(null);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const dispatch = useDispatch();
  const notify = (msg) => toast.error(msg);
  const namePlayList = useSelector((state) => {
    return state.data.namePlayList;
  });
  const currentIndex = useSelector((state) => state.data.currentIndex);
  const playList = useSelector((state) => state.data[namePlayList]);
  useEffect(() => {
    (async function fetchData() {
      try {
        if (playList) {
          setIsLoading(true);
          refAudio.current.pause();
          const idSong = playList[currentIndex]?.encodeId;
          const song = await musicApi.getSong(idSong);

          const infoSong = {
            ...playList[currentIndex],
            ...song,
            lengthPlayList: playList.length,
          };

          setInfoSong(infoSong);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [currentIndex]);

  useEffect(() => {
    if (infoSong?.msg === "Nội dung này không tải được cho quốc gia của bạn!") {
      notify(infoSong.msg);
      refAudio.current.pause();
      setIsPlay(true);
      return;
    }
    refAudio.current.play();
  }, [infoSong]);

  const handlePlay = () => {
    setIsPlay((prev) => !prev);
    if (isPlay) {
      refAudio.current.play();
    } else {
      refAudio.current.pause();
    }
  };
  const handleSeekBar = (percent, event) => {
    let timeSeek = (percent * duration) / 100;
    refAudio.current.currentTime = timeSeek;
  };

  const handlePercentVolume = useCallback((percent) => {
    setVolume(percent);
    refAudio.current.volume = percent / 100;
  }, []);

  const handleBack = () => {
    if (!playList) return;
    if (currentIndex <= 0) {
      dispatch(setCurrentIndex(playList.length - 1));
      return;
    }
    dispatch(setCurrentIndex(currentIndex - 1));
  };

  const handleNext = () => {
    if (currentIndex === playList.length - 1) {
      dispatch(setCurrentIndex(0));
      return;
    }
    dispatch(setCurrentIndex(currentIndex + 1));
  };
  return (
    <div className="bg-color-bg h-[90px]  py-4 border-t border-gray-800 fixed bottom-0 right-0 left-0 flex items-center">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className="text-base mt-[62px] "
      />
      <div className="w-full flex items-center justify-between mx-[5vw]">
        <audio
          className="hidden"
          src={infoSong?.data && infoSong.data[128]}
          ref={refAudio}
          onPlaying={() => {
            setIsPlay(false);
            setDuration(refAudio.current.duration);
          }}
          onEnded={() => {
            handleNext();
            setCurrentTime(0);
          }}
          onTimeUpdateCapture={(e) => {
            setCurrentTime((e.target.currentTime * 100) / duration);
            if (refAudio.current.currentTime) {
              RefTimeUpdate.current.textContent = formatDuration(
                refAudio.current.currentTime
              );
            }
          }}
        />
        <div className="basis-1/5">
          <Title infoSong={infoSong} />
        </div>
        <div className="lg:basis-3/5 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            {duration ? (
              <span className="text-base " ref={RefTimeUpdate}></span>
            ) : (
              <span className="text-base ">0:00</span>
            )}
            <div onClick={handleBack}>
              <BsSkipStart className="text-2xl md:text-3xl cursor-pointer hover:opacity-70 hover:scale-90 duration-200 transition-all" />
            </div>
            {isLoading ? (
              <BsBroadcast className=" text-3xl md:text-4xl   animate-spin" />
            ) : (
              <div onClick={handlePlay}>
                {!isPlay ? (
                  <BsPauseCircle className=" text-3xl md:text-4xl   cursor-pointer hover:opacity-70 hover:scale-90 duration-200 transition-all" />
                ) : (
                  <BsPlayCircle className=" text-3xl md:text-4xl   cursor-pointer hover:opacity-70 hover:scale-90 duration-200 transition-all" />
                )}
              </div>
            )}
            <div onClick={handleNext}>
              <BsSkipEnd className="text-2xl md:text-3xl cursor-pointer hover:opacity-70 hover:scale-90 duration-200 transition-all" />
            </div>
            {duration ? (
              <span className="text-base ">{formatDuration(duration)}</span>
            ) : (
              <span className="text-base ">0:00</span>
            )}
          </div>
          <div
            className="w-full  absolute left-0 
          top-0 lg:static lg:w-2/3 xl:w-1/2 px-3
          "
          >
            <Progress
              percent={currentTime}
              handlePercent={handleSeekBar}
              duration={duration}
              // width={"580"}
            />
          </div>
        </div>
        <div className="basis-1/5 ">
          <div className="flex items-center justify-end gap-4">
            <div
              className="text-2xl lg:text-3xl cursor-pointer"
              onClick={() => {
                if (volume > 0) {
                  handlePercentVolume(0);
                  return;
                }
                handlePercentVolume(50);
              }}
            >
              {volume <= 0 ? <BsVolumeMuteFill /> : <BsVolumeUpFill />}
            </div>

            <div className="w-full hidden lg:block  lg:w-1/2">
              <Progress
                // width={"150"}
                percent={volume}
                handlePercent={handlePercentVolume}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerMusic;
