"use client";

import Title from "@/app/components/global/Title";
import { useRef } from "react";
import { useState } from "react";
import Image from "next/image";

import { FaBackwardFast } from "react-icons/fa6";
import { FaForwardFast } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";

export default function Track() {
  const Tracks = [
    //this is penis music
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
      artist: "DJ Energy", //corny name for corny music
      url: "/assets/media/euphoria.mp3",
      img: "/assets/content-img/track1.jpg",
    },
  ];
  const audioRef = useRef(null);

  const [currentTrackIndex, setcurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  //   const playAudio = () => audioRef.current?.play();
  //   const pauseAudio = () => audioRef.current?.pause();

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

  //   const prevTrack = () => {
  //     setcurrentTrackIndex(
  //       (prevTrack) => (prevTrack - 1 + Tracks.length) % Tracks.length
  //     );
  //     setTimeout(() => audioRef.current?.play(), 0);
  //   };

  const currentTrack = Tracks[currentTrackIndex];

  return (
    <section className="w-full h-screen">
      <Title title="Night Club Track" tag="h2" />
      <audio ref={audioRef} src={currentTrack.url} />

      <div
        className="w-full h-full flex flex-col
        px-10 pb-10 gap-3
        md:px-30 md:pb-15 gap-7
        xl:px-40 xl:pb-20 gap-10"
      >
        {/* <p>
          Current Track: {currentTrack.title} by {currentTrack.artist}
        </p>
        <audio ref={audioRef} src={currentTrack.url} />

        <button onClick={playAudio} className="mr-5 p-3 bg-[var(--active)]">
          Play
        </button>
        <button onClick={pauseAudio} className="p-3 bg-[var(--active)]">
          Pause
        </button>
        <button onClick={prevTrack} className="ml-5 p-3 bg-[var(--active)]">
          Previous
        </button>
        <button onClick={nextTrack} className="ml-5 p-3 bg-[var(--active)]">
          Next
        </button> */}
        <div className="h-1/3 flex">
          <div className="relative h-full aspect-square">
            <Image
              src={currentTrack.img}
              alt={`${currentTrack.title} - ${currentTrack.artist}`}
              fill
              className="object-cover h-full"
            ></Image>
          </div>
          <div className="w-full h-full flex flex-col justify-center ml-10">
            <p className="text-xl">{`${currentTrack.title} - ${currentTrack.artist}`}</p>
            <div className="w-full relative h-1 bg-[var(--active)] cursor-pointer my-10">
              <div
                className="absolute bg-white h-1 aspect-square rounded-full cursor-pointer
                -translate-x-1/2 scale-400
                "
              ></div>
            </div>
            <div className="w-full flex justify-between items-center">
              <p>00:00 / XX:XX</p>
              <div className="">
                <button
                  onClick={prevTrack}
                  className="mx-5 p-3 hover:text-[var(--active)]"
                >
                  <FaBackwardFast size={30} />
                </button>
                {/* <button onClick={playAudio} className="mx-5 p-3 hover:text-[var(--active)]">
                        <FaPlay size={30} />
                    </button>
                    <button onClick={pauseAudio} className="mx-5 p-3 hover:text-[var(--active)]">
                        <FaPause size={30} />
                    </button> */}
                {/* {audioRef.current && audioRef.current.paused ? (
                  <button
                    onClick={playAudio}
                    className="mx-5 p-3 hover:text-[var(--active)]"
                  >
                    <FaPlay size={30} />
                  </button>
                ) : (
                  <button
                    onClick={pauseAudio}
                    className="mx-5 p-3 hover:text-[var(--active)]"
                  >
                    <FaPause size={30} />
                  </button>
                )} */}
                {isPlaying ? (
                  <button
                    onClick={pauseAudio}
                    className="mx-5 p-3 hover:text-[var(--active)]"
                  >
                    <FaPause size={30} />
                  </button>
                ) : (
                  <button
                    onClick={playAudio}
                    className="mx-5 p-3 hover:text-[var(--active)]"
                  >
                    <FaPlay size={30} />
                  </button>
                )}
                <button
                  onClick={nextTrack}
                  className="mx-5 p-3 hover:text-[var(--active)]"
                >
                  <FaForwardFast size={30} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
