"use client";

import Title from "@/app/components/global/Title";
import { useRef } from "react"; //AI
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";

import { FaBackwardFast, FaRotateLeft } from "react-icons/fa6";
import { FaForwardFast } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FaShuffle } from "react-icons/fa6";
import { FaVolumeHigh } from "react-icons/fa6";

export default function Track() {
  useEffect(() => { //AI
    const audio = audioRef.current;
    if (audio) {
      audio.load(); // force browser to load metadata
      // apparently wouldn't without this trick, hence a bug where
      // the media player would be broken on load until user switched track
    }
  }, []);

  const Tracks = [
    {
      title: "Funky",
      artist: "Black Box",
      url: "/assets/media/black-box-funky.mp3",
      img: "/assets/content-img/track2.jpg",
    },
    {
      title: "Red Tape",
      artist: "Fashion",
      url: "/assets/media/fashion-red-tape.mp3",
      img: "/assets/content-img/track5.jpg",
    },
    {
      title: "Euphoria",
      artist: "DJ Energy", 
      url: "/assets/media/euphoria.mp3",
      img: "/assets/content-img/track1.jpg",
    },
  ];
  const audioRef = useRef(null);
  const [currentTrackIndex, setcurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const progress = duration ? (currentTime / duration) * 100 : 0;
  const isEnded = progress >= 100;
  const volumePercent = volume * 100;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume; // keep media element in sync with slider state
    }
  }, [volume]);

  const handleSeek = (e) => {
    const bar = e.currentTarget; //grabs element applied to
    const clickX = e.clientX - bar.getBoundingClientRect().left; //position of click relative to width
    // console.log("clickX: " + clickX + ", bar width: " + bar.offsetWidth);
    const newTime = (clickX / bar.offsetWidth) * duration; //calculate new time based on click position
    audioRef.current.currentTime = newTime; //update audio current time
    setCurrentTime(newTime); //update state
  }; //AI

  const handleVolumeChange = (e) => {
    const bar = e.currentTarget;
    const clickX = e.clientX - bar.getBoundingClientRect().left;
    const newVolume = Math.max(0, Math.min(1, clickX / bar.offsetWidth));
    setVolume(newVolume);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const playAudio = () => {
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const nextTrack = () => {
    setcurrentTrackIndex((prevTrack) => (prevTrack + 1) % Tracks.length);
    if (isPlaying) {
      setTimeout(() => audioRef.current?.play(), 0);
    }
  };

  const prevTrack = () => {
    setcurrentTrackIndex((prevTrack) => (prevTrack - 1) % Tracks.length);

    if (isPlaying) {
      setTimeout(() => audioRef.current?.play(), 0);
    }
  };

  const selectTrack = (index) => {
    setcurrentTrackIndex(index);
    if (isPlaying) {
      setTimeout(() => audioRef.current?.play(), 0);
    }
  };

  const randomTrack = () => {
    let randomIndex = Math.floor(Math.random() * Tracks.length);
    return randomIndex;
  };

  const buttonStyling =
    "mx-1 md:mx-5 p-3 hover:text-[var(--active)] cursor-pointer";

  const currentTrack = Tracks[currentTrackIndex];

  const paddingStylingX = "px-10 md:px-30 xl:px-40";
  const paddingStylingB = "pb-5 md:pb-15 xl:pb-20";

  return (
    <section className="w-full flex flex-col items-center">
      <Title title="Night Club Track" tag="h2" />
      <audio
        ref={audioRef}
        src={currentTrack.url}
        preload="metadata"
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => {
          setDuration(audioRef.current?.duration || 0);
        }}
      />

      <div className="w-full flex flex-col my-auto">
        <div className={`my-5 lg:h-80 lg:my-0 flex ${paddingStylingX}`}>
          <div className="relative h-full aspect-square hidden lg:block">
            <Image
              src={currentTrack.img}
              alt={`${currentTrack.artist} - ${currentTrack.title}`}
              fill
              className="object-cover h-full"
            ></Image>
          </div>
          <div className="w-full h-full flex flex-col lg:ml-10 justify-center">
            <p className="text-xl">{`${currentTrack.artist} - ${currentTrack.title}`}</p>
            <div
              className="w-full relative h-1 bg-[var(--active)] cursor-pointer my-10"
              onClick={handleSeek}
            >
              {/*Potentielt i bonus: Få denne bar til at bevæge sig mindre choppy
              og evt. tilføj dragging af handle
              */}
              <div
                className="h-1 absolute bg-black/[.9] right-0"
                style={{
                  width: `${
                    100 - progress
                  }%` /* transition: 'width 0.1s linear'  */,
                }}
              ></div>
              <div
                className="absolute bg-white h-1 aspect-square rounded-full cursor-pointer
                -translate-x-1/2 scale-400
                "
                style={{
                  left: `${progress}%` /* transition: "left 0.1s linear" */,
                }}
              ></div>
            </div>
            <div className="w-full flex flex-col xl:flex-row justify-between items-center">
              <p className="mb-10">
                {/* 00:00 / XX:XX */}
                {formatTime(currentTime) + " / " + formatTime(duration)}
              </p>

              <div>
                <button onClick={prevTrack} className={buttonStyling}>
                  <FaBackwardFast size={30} />
                </button>

                {isEnded ? (
                  <button
                    onClick={() => {
                      audioRef.current.currentTime = 0;
                      audioRef.current.play();
                      setIsPlaying(true);
                    }}
                    className={`${buttonStyling} border-3 border[var(--text)] rounded-full inline-block aspect-square relative`}
                  >
                    <FaArrowRotateLeft size={30} />
                  </button>
                ) : isPlaying ? (
                  <button
                    onClick={pauseAudio}
                    className={`${buttonStyling} border-3 border[var(--text)] rounded-full inline-block aspect-square relative`}
                  >
                    <FaPause size={30} />
                  </button>
                ) : (
                  <button
                    onClick={playAudio}
                    className={`${buttonStyling} border-3 border[var(--text)] rounded-full inline-block aspect-square relative`}
                  >
                    <FaPlay size={30} />
                  </button>
                )}
                <button onClick={nextTrack} className={buttonStyling}>
                  <FaForwardFast size={30} />
                </button>
                <button
                  onClick={() => selectTrack(randomTrack())}
                  className={buttonStyling}
                >
                  <FaShuffle size={30} />
                </button>
                {/* <button
                  onClick={() => {
                    console.log("Current Time: " + currentTime);
                    console.log("Duration: " + duration);
                    console.log("Progress: " + progress + "%");
                    //to fix a bug where duration is grabbed before metadata is loaded
                  }}
                >
                  debug log
                </button> */}
              </div>
              <div className="flex items-center mt-5 mb-5 xl:mt-0 xl:mb-0">
                <FaVolumeHigh size={25} />
                <div
                  className="w-20 h-1 bg-[var(--active)] ml-3 cursor-pointer relative"
                  onClick={handleVolumeChange}
                >
                  <div
                    className="h-1 bg-black/[.9] absolute right-0 top-1/2 -translate-y-1/2"
                    style={{ width: `${100 - volumePercent}%` }}
                  ></div>
                  <div
                    className="bg-white h-1 aspect-square rounded-full cursor-pointer
                    absolute top-1/2 -translate-x-1/2 -translate-y-1/2 scale-400
                    "
                    style={{ left: `${volumePercent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Gallery*/}
        <div
          className={`lg:flex my-5 h-100 lg:h-60 lg:my-0 lg:px-30 xl:px-40 ${paddingStylingB}`}
        >
          <div className="flex flex-col justify-center">
            <button
              className="cursor-pointer mr-6 p-3 border-2 border-[var(--text)] hidden lg:block"
              onClick={prevTrack}
            >
              <FaPlay size={20} className="scale-x-[-1]" />
            </button>
          </div>
          {Tracks.map((track, index) => (
            <button
              key={index}
              className={`relative grid h-full aspect-square ${
                index === currentTrackIndex
                  ? "w-full lg:w-auto"
                  : "cursor-pointer hidden lg:block"
              }`}
              onClick={() => selectTrack(index)}
            >
              <Image
                src={track.img}
                alt={`${track.title} - ${track.artist}`}
                fill
                className="object-cover h-full col-start-1 row-start-1"
              ></Image>
              {index === currentTrackIndex && (
                //BONUS: brug motion her til at animere nuværende track highlight
                <div className="grid col-start-1 row-start-1 grid-rows-5 w-full h-full z-10 currentTrack">
                  <div className="row-span-4 flex flex-col items-center justify-center">
                    <div
                      className={`border-3 border-[var(--active)] rounded-full inline-flex items-center justify-center w-13 aspect-square relative`}
                    >
                      <FaPlay size={30} className="text-[var(--active)]" />
                    </div>
                  </div>
                  <div className="row-span-1 bg-[var(--bg)] flex items-center justify-center">
                    <p className="text-2xl lg:text-base">{`${track.artist} - ${track.title}`}</p>
                  </div>
                </div>
              )}
            </button>
          ))}
          <div className="flex flex-col justify-center">
            <button
              className="cursor-pointer ml-6 p-3 border-2 border-[var(--text)] hidden lg:block"
              onClick={nextTrack}
            >
              <FaPlay size={20} />
            </button>
          </div>
          {/*mobile buttons - this is such an ASS way to do it :/ */}
          <div className="w-full flex justify-center lg:hidden py-10">
            <button
              className="cursor-pointer mr-1.5 p-3 border-2 border-[var(--text)]"
              onClick={prevTrack}
            >
              <FaPlay size={20} className="scale-x-[-1]" />
            </button>
            <div className="flex flex-col justify-center">
              <button
                className="cursor-pointer ml-1.5 p-3 border-2 border-[var(--text)] lg:hidden"
                onClick={nextTrack}
              >
                <FaPlay size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
