"use client";
import { useState, useEffect } from "react";

import Title from "@/app/components/global/Title";
import Image from "next/image";
import EventSlide from "./EventSlide";
import { motion } from "motion/react";


export default function EventsContent({ events }) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const entries = events;

  useEffect(() => {
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
    </section>
  );
}
