"use client";
import { useState /*useEffect*/ } from "react";
import EventSlide from "./EventSlide";
import { motion } from "motion/react";

export default function EventsClient({ events }) {
  const [currentSlide, setCurrentSlide] = useState(1);

  const entries = events;
  const hasError = entries?.[0]?.error;

  // useEffect(() => {
  //   const checkMobile = () => {
  //     const newIsMobile = window.matchMedia("(max-width: 767px)").matches;

  //     if (newIsMobile !== isMobile) {
  //       if (newIsMobile) {
  //         const newSlide = (currentSlide - 1) * 2 + 1;
  //         setCurrentSlide(newSlide);
  //       } else {
  //         const newSlide = Math.ceil(currentSlide / 2);
  //         setCurrentSlide(newSlide);
  //       }
  //     }

  //     setIsMobile(newIsMobile);
  //   };

  //   checkMobile();
  //   window.addEventListener("resize", checkMobile);
  //   return () => window.removeEventListener("resize", checkMobile);
  // }, [isMobile, currentSlide]);

  // const slideCount = isMobile ? entries.length : Math.ceil(entries.length / 2);
  const slideCount = Math.ceil(entries.length / 2);
  const mobileSlideCount = entries.length;

  if (hasError) {
    return (
      <div className="flex items-center justify-center flex-col items-center justify-center h-130 mb-30">
        <p className="text-lg">
          Unable to load events. Please try again later.
        </p>
        <p className="mt-10 text-red-500">{entries?.[0].error}</p>
        <p className="text-sm mt-10 opacity-70 italic">
          {"(Psst... har du husket at starte din server?)"}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex-grow overflow-hidden">
        <motion.div
          className="eventSlider"
          animate={{
            x: `-${(currentSlide - 1) * 100}%`,
          }}
          transition={{ duration: 0.5 }}
        >
          {entries.map((entry, index) => (
            <EventSlide
              index={index}
              key={index}
              id={entry.id}
              title={entry.title}
              description={entry.description}
              img={entry.asset.url}
              date={entry.date}
              location={entry.location}
              // isMobile={isMobile}
            />
          ))}
        </motion.div>
      </div>

      <div className="h-30 flex items-center justify-center gap-4 md:hidden">
        {Array.from({ length: mobileSlideCount }, (_, index) => {
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
      <div className="h-30 items-center justify-center gap-4 hidden md:flex">
        {Array.from({ length: slideCount }, (_, index) => {
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
    </>
  );
}
