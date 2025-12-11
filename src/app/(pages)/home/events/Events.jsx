"use client";
import { useState, useEffect } from "react";

import Title from "@/app/components/global/Title";
import Image from "next/image";
import EventSlide from "./EventSlide";
import { motion } from "motion/react";

export default function EventsContent({ events }) {
  // console.log("Events received in Events: ", events);

  const [currentSlide, setCurrentSlide] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const entries = events;
  const hasError = entries?.[0]?.error;
  //hvis det første objekt i entries eksister (ie. entries != null) og den har en property kaldt "error",
  //så køres error logikken (hvis en cheeky dude kunne uploade et event, sætte den til at være den første i
  //events listen og give en error property kunne han bugge system uden at data rent faktisk fejlede i at
  //blive fetchet)

  useEffect(() => {
    // ikke bruge useEffect - forstår ikke kravet, da jeg ikke bruger useEffect til fetching/ting der kunne klares
    // på server; useEffect ser ud til at være måden at interagere med DOM.

    // HAR DOG været nødt til at bruge useEffect for at lytte til DOM for resize

    // "Effects are an escape hatch from the React paradigm. They let you “step outside” of React and synchronize your
    // components with some external system like a non-React widget, network, or the browser DOM."
    // kilde: https://react.dev/learn/you-might-not-need-an-effect

    //har været nødt til at bruge useEffect her for at tracke skærmstørrelse og ændre isMobile state
    const checkMobile = () => {
      const newIsMobile = window.matchMedia("(max-width: 767px)").matches;

      if (newIsMobile !== isMobile) {
        if (newIsMobile) {
          // desktop > mobile: expand slide number
          // desktop slide 1 > mobile slides 1-2, desktop slide 2 > mobile slides 3-4, etc.
          const newSlide = (currentSlide - 1) * 2 + 1;
          setCurrentSlide(newSlide);
        } else {
          // mobile > desktop: collapse slide number
          // mobile slides 1-2 > desktop slide 1, mobile slides 3-4 > desktop slide 2, etc.
          const newSlide = Math.ceil(currentSlide / 2);
          setCurrentSlide(newSlide);
        }
      }

      setIsMobile(newIsMobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [isMobile, currentSlide]);

  const slideCount = isMobile ? entries.length : Math.ceil(entries.length / 2);

  // console.log("Slide Count: ", slideCount, "isMobile:", isMobile);

  return (
    <section
      className="flex flex-col
    bg-[url('/assets/bg/slider_bg_overlay.png')]
    bg-cover
    bg-center
    bg-no-repeat
    "
    >
      <Title title="Events of the Month" />

      {hasError && (
        <div className="flex items-center justify-center flex-col items-center justify-center h-130 mb-30">
          <p className="text-lg">
            Unable to load events. Please try again later.
          </p>
          <p className="mt-10 text-red-500">{entries?.[0].error}</p>

          <p className="text-sm mt-10 opacity-70 italic">
            {"(Psst... har du husket at starte din server?)"}
          </p>
        </div>
      )}

      {!hasError && (
        <div className="flex-grow overflow-hidden">
          <motion.div
            className="grid h-full"
            style={{
              gridTemplateColumns: `repeat(${entries.length}, ${
                isMobile ? "100%" : "50%"
              })`,
            }}
            animate={{
              x: isMobile
                ? `-${(currentSlide - 1) * 100}%`
                : `-${(currentSlide - 1) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          >
            {entries.map((entry, index) => (
              // <div key={index} className="eventSlide">

              //   <p>test slide</p>
              // </div>
              <EventSlide
                index={index}
                key={index}
                id={entry.id}
                title={entry.title}
                description={entry.description}
                img={entry.asset.url}
                date={entry.date}
                location={entry.location}
                isMobile={isMobile}
              />
            ))}
          </motion.div>
        </div>
      )}

      {!hasError && (
        <div
          className="h-30
        flex items-center justify-center gap-4
        "
        >
          {Array.from({ length: slideCount }, (_, index) => {
            //Array.from works in a way where it must pass two arguments to the mapping function.
            //thus the first argument needs a placeholder for the unused value so index can be passed
            const slide = index + 1;
            return (
              <button
                className={`h-5 aspect-square cursor-pointer transition-colors duration-200 ${
                  currentSlide === slide
                    ? "bg-[var(--active)]"
                    : "bg-[var(--text)]"
                }`}
                key={index}
                onClick={() => setCurrentSlide(slide)}
              ></button>
            );
          })}
        </div>
      )}
    </section>
  );
}
