"use client";

import Title from "@/app/components/global/Title";
import { useRef } from "react"; //AI
import { useState } from "react";
import Image from "next/image";

import { FaBackwardFast, FaRotateLeft } from "react-icons/fa6";
import { FaForwardFast } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FaShuffle } from "react-icons/fa6";
import { FaVolumeHigh } from "react-icons/fa6";

export default function Track() {
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

  const currentTrack = Tracks[0];

  const [currentTrackIndex, setcurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const progress = duration ? (currentTime / duration) * 100 : 0;
  const isEnded = progress >= 100;
  const volumePercent = volume * 100;

  const buttonStyling =
    "mx-1 md:mx-5 p-3 hover:text-[var(--active)] cursor-pointer transition-colors duration-200";

  const paddingStylingX = "px-10 md:px-30 xl:px-40";
  const paddingStylingB = "pb-5 md:pb-15 xl:pb-20";

  return (
    <section className="w-full flex flex-col items-center">
      <Title title="Night Club Track" tag="h2" />

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
              //playbar
            >
              {/* <div
                className="h-1 absolute bg-black/[.9] right-0"
                style={{
                  width: `${
                    100 - progress
                  }%`,
                }}
              ></div> */}
              {/* <div
                className="absolute bg-white h-1 aspect-square rounded-full cursor-pointer
                -translate-x-1/2 scale-400
                "
                style={{
                  left: `${progress}%`,
                }}
              ></div> */}
            </div>
            <div className="w-full flex flex-col xl:flex-row justify-between items-center">
              <p className="mb-10">00:00 / XX:XX</p>

              <div>
                <button className={buttonStyling}>
                  <FaBackwardFast size={30} />
                </button>

                <button
                  className={`${buttonStyling} border-3 border[var(--text)] rounded-full inline-block aspect-square relative`}
                >
                  <FaPlay size={30} />
                </button>
                <button className={buttonStyling}>
                  <FaForwardFast size={30} />
                </button>
                <button
                  className={buttonStyling}
                >
                  <FaShuffle size={30} />
                </button>
              </div>
              <div className="flex items-center mt-5 mb-5 xl:mt-0 xl:mb-0">
                <FaVolumeHigh size={25} />
                <div
                  className="w-20 h-1 bg-[var(--active)] ml-3 cursor-pointer relative"
                  //volume bar
                >
                  {/* <div
                    className="h-1 bg-black/[.9] absolute right-0 top-1/2 -translate-y-1/2"
                    style={{ width: `${100 - volumePercent}%` }}
                  ></div> */}
                  {/* <div
                    className="bg-white h-1 aspect-square rounded-full cursor-pointer
                    absolute top-1/2 -translate-x-1/2 -translate-y-1/2 scale-400
                    "
                    style={{ left: `${volumePercent}%` }}
                  ></div> */}
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
            >
              <FaPlay size={20} />
            </button>
          </div>
          {/*mobile buttons - this is such an ASS way to do it :/ */}
          <div className="w-full flex justify-center lg:hidden py-10">
            <button
              className="cursor-pointer mr-1.5 p-3 border-2 border-[var(--text)]"
            >
              <FaPlay size={20} className="scale-x-[-1]" />
            </button>
            <div className="flex flex-col justify-center">
              <button
                className="cursor-pointer ml-1.5 p-3 border-2 border-[var(--text)] lg:hidden"
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
