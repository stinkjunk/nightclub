"use client";
import { useState } from "react";

import Title from "@/app/components/global/Title";
import Image from "next/image";

export default function EventsContent({ events }) {
  const [currentSlide, setCurrentSlide] = useState(1);
  //   const entries = Array.isArray(events) ? events : [];
  const entries = events;
  
  //split entries into pairs
  const entryPairs = [];
  for (let i = 0; i < entries.length; i += 2) {
    entryPairs.push(entries.slice(i, i + 2));
  } //AI
  console.log("Paired Entries: ", entryPairs);

  return (
    <section
      className="h-screen flex flex-col
    bg-[url('/assets/bg/slider_bg_overlay.png')]
    bg-cover
    bg-center
    bg-no-repeat
    "
    >
      <Title title="Events of the Month" />
      {/* Testing Code: */}
      {/* {entries.map(
        ({ id, title, description: desc, date, asset, location }) => (
          <div key={id ?? title}>
            <p>{title}</p>
            <p>{desc}</p>
            <p>{date}</p>
            <p>{location}</p>
            {asset?.url ? (
              <div>
                <Image
                  src={asset.url}
                  alt="Event Image"
                  width={250}
                  height={250}
                  className="object-fit"
                />
              </div>
            ) : (
              ""
            )}
          </div>
        )
      )} */}

      <div className="flex-grow"></div>
      <div
        className="h-30
      flex items-center justify-center gap-4
      "
      >
        {entryPairs.map((pair, index) => {
          const slide = index + 1;
          return (
            <button
              className={`h-5 aspect-square cursor-pointer ${
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
