"use client";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import { TimeSlider } from "@vidstack/react";
import { VolumeSlider } from "@vidstack/react";
import { PlayButton } from "@vidstack/react";
import { MuteButton } from "@vidstack/react";
import { useMediaPlayer, useMediaStore } from "@vidstack/react";

import Title from "@/app/components/global/Title";
import { useState } from "react";
import Image from "next/image";

import { FaBackwardFast, FaRotateLeft } from "react-icons/fa6";
import { FaForwardFast } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FaShuffle } from "react-icons/fa6";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

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

  const [currentTrackIndex, setcurrentTrackIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const currentTrack = Tracks[currentTrackIndex];

  return (
    <MediaPlayer
      src={currentTrack.url}
      volume="0.8"
      autoPlay={autoPlay}
      onPlay={() => setAutoPlay(true)}
      onPause={() => setAutoPlay(false)}
    >
      <MediaProvider />
      <PlayerContent
        Tracks={Tracks}
        currentTrackIndex={currentTrackIndex}
        setcurrentTrackIndex={setcurrentTrackIndex}
      />
    </MediaPlayer>
  );
}

function PlayerContent({ Tracks, currentTrackIndex, setcurrentTrackIndex }) {
  const player = useMediaPlayer();
  const { duration, currentTime } = useMediaStore(player, [
    "duration",
    "currentTime",
  ]);

  const currentTrack = Tracks[currentTrackIndex];
  const buttonStyling =
    "mx-1 md:mx-5 p-3 hover:text-[var(--active)] cursor-pointer transition-colors duration-200";
  const paddingStylingX = "px-10 md:px-30 xl:px-40";
  const paddingStylingB = "pb-5 md:pb-15 xl:pb-20";

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const nextTrack = () => {
    setcurrentTrackIndex((prevTrack) => (prevTrack + 1) % Tracks.length);
  };

  const prevTrack = () => {
    setcurrentTrackIndex((prevTrack) => (prevTrack - 1 + Tracks.length) % Tracks.length);
  };

  const selectTrack = (index) => {
    setcurrentTrackIndex(index);
  };

  const randomTrack = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * Tracks.length);
      //kør dette imens while statement er sandt
    } while (randomIndex === currentTrackIndex /* && Tracks.length > 1 */); //AND ikke nødvendig,
    // 3 tracks er hardcoded - dog godt hvis tracks skulle være 1, ville det undgå en evig loop

    setcurrentTrackIndex(randomIndex);
  };

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

            <TimeSlider.Root className="group relative mx-[7.5px] inline-flex h-10 w-full cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden">
              <TimeSlider.Track className="relative ring-sky-400 z-0 h-[5px] w-full  bg-white/30 group-data-[focus]:ring-[3px]">
                <TimeSlider.TrackFill className="bg-[var(--active)] absolute h-full w-[var(--slider-fill)]  will-change-[width]" />
                <TimeSlider.Progress className="absolute -z-1 h-full w-[var(--slider-progress)]  bg-white/50 will-change-[width]" />
              </TimeSlider.Track>
              <TimeSlider.Thumb className="absolute left-[var(--slider-fill)] top-1/2 z-20 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cacaca] bg-white opacity-100 transition-opacity" />
            </TimeSlider.Root>
            <div className="w-full flex flex-col xl:flex-row justify-between items-center">
              <p className="mb-10">{`${formatTime(currentTime)} / ${formatTime(
                duration
              )}`}</p>

              <div>
                <button className={buttonStyling} onClick={prevTrack}>
                  <FaBackwardFast size={30} />
                </button>

                <PlayButton
                  className={`${buttonStyling} group border-3 border[var(--text)] rounded-full inline-block aspect-square relative`}
                >
                  <FaPlay size={30} className="play-icon" />
                  <FaPause size={30} className="pause-icon" />
                </PlayButton>
                <button className={buttonStyling} onClick={nextTrack}>
                  <FaForwardFast size={30} />
                </button>
                <button className={buttonStyling} onClick={randomTrack}>
                  <FaShuffle size={30} />
                </button>
              </div>
              <div className="flex items-center mt-5 mb-5 xl:mt-0 xl:mb-0">
                <MuteButton className={`${buttonStyling} group mr-2`}>
                  <HiVolumeUp size={26} className="volume-icon" />
                  <HiVolumeOff size={26} className="muted-icon" />
                </MuteButton>
                <VolumeSlider.Root className="group relative mx-[7.5px] inline-flex h-10 w-50 cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden">
                  <VolumeSlider.Track className="relative ring-sky-400 z-0 h-[5px] w-full  bg-white/30 group-data-[focus]:ring-[3px]">
                    <VolumeSlider.TrackFill className="bg-[var(--active)] absolute h-full w-[var(--slider-fill)]  will-change-[width]" />
                  </VolumeSlider.Track>
                  <VolumeSlider.Thumb className="absolute left-[var(--slider-fill)] top-1/2 z-20 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cacaca] bg-white opacity-100 transition-opacity" />
                </VolumeSlider.Root>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`lg:flex my-5 h-100 lg:h-60 lg:my-0 lg:px-30 xl:px-40 ${paddingStylingB}`}
        >
          <div className="flex flex-col justify-center">
            <button className="cursor-pointer mr-6 p-3 border-2 border-[var(--text)] hidden lg:block">
              <FaPlay size={20} className="scale-x-[-1]" 
              onClick={prevTrack}
              />
            </button>
          </div>
          {Tracks.map((track, index) => (
            <button
              key={index}
              onClick={() => selectTrack(index)}
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
          <div className="w-full flex justify-center lg:hidden py-10">
            <button
              className="cursor-pointer mr-1.5 p-3 border-2 border-[var(--text)]"
              onClick={prevTrack}
            >
              <FaPlay size={20} className="scale-x-[-1]" />
            </button>
            <div className="flex flex-col justify-center">
              <button className="cursor-pointer ml-1.5 p-3 border-2 border-[var(--text)] lg:hidden"
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