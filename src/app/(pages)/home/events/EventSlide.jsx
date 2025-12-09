"use client";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function EventSlide(props) {
  const [isHovered, setIsHovered] = useState(false);
  const { isMobile } = props;
  //isMobile state passet fra EventsContent.jsx som prop - behøver ikke
  //at gendefinere det her

  const handleClick = (e) => {
    // Toggle on click for mobile only
    //e = event object, indeholder information om hvorfra handleClick blev kaldt
    //(vores tilfælde: onClick på motion.div)
    if (isMobile) {
    //   e.stopPropagation();
      setIsHovered(!isHovered);
    }
  };

  useEffect(
    () => {
      // Close when clicking outside (mobile only) AI
      if (!isMobile) return;

      const handleClickOutside = () => setIsHovered(false);

      if (isHovered) {
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
        //cleanup, fjerner event listener
        //react opbevarer cleanup funktionen og kalder den når isHovered ændres
      }
    },
    [isHovered, isMobile]
    //
  );

  //filter date:
  const date = new Date(props.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const [dateStr, yearStr] = formattedDate.split(", ");
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="eventSlide h-full flex flex-col md:h-120">
      <motion.div
        className="flex-grow grid relative overflow-hidden"
        onHoverStart={() => !isMobile && setIsHovered(true)}
        onHoverEnd={() => !isMobile && setIsHovered(false)}
        onClick={handleClick}
      >
        <div className="col-start-1 row-start-1 hoverPinkTransparent z-10 pointer-events-none"></div>
        <Image
          src={props.img}
          alt="Event Image"
          fill
          className="col-start-1 row-start-1 object-cover"
        />
        <div className="col-start-1 row-start-1 flex flex-col z-5">
          <motion.div
            className="flex-grow flex justify-center items-center"
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -50 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="#" //nothing for now
              className="cursor-pointer px-5 py-2 bg-[var(--active)]" 
            >
              Book Now
            </Link>
          </motion.div>
          <motion.div
            className="bg-black/90 h-2/5 p-6 overflow-hidden flex flex-col"
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 50 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg">{props.title}</p>
            <p
              className="flex-grow overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 80%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 80%, transparent 100%)",
                //fadeout gradient for text overflow med mask image
              }}
            >
              {props.description}
            </p>
          </motion.div>
        </div>
      </motion.div>
      <div className="bg-[var(--bg)] h-10 flex items-center px-5 gap-5 z-10">
        <p>{dateStr}</p>
        <p>{time}</p>
        <p>{props.location}</p>
      </div>
    </div>
  );
}
