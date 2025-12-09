"use client"; //For motion
import { useState } from "react";
// import { useEffect } from "react";
//BONUS: implemter måde at få hoverstate til at fungere på mobile,
//evt via scroll position

import Image from "next/image";
import { motion } from "motion/react";

export default function WelcomeCard(props) {




  const [isHovered, setIsHovered] = useState(false); //AI
  return (
    <div className={`grid relative h-full ${props.sentClass}`}>
      <Image
        src={props.src}
        alt="Image"
        fill
        className="col-start-1 row-start-1 object-cover"
      ></Image>
      <motion.div
        className="hoverPinkLine 
        col-start-1 row-start-1
        h-full flex grid grid-rows-[1fr_1fr]
        gap-5
        overflow-hidden
        h-150
        aspect-[4/5]
        md:h-full
        md:aspect-auto

        "
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        // initial={{ opacity: 0 }}
        // whileHover={{ opacity: 1 }}
        // transition={{ duration: 0.2 }}
      >
        <div className="w-full flex items-end justify-center pt-10">
          <motion.div
            animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="border-3 border-[var(--active)] rounded-lg relative
            w-20 h-20 
            md:w-25 md:h-25 
            xl:w-35 xl:h-35 
            "
          >
            {props.children}
          </motion.div>
        </div>
        <div className="w-full overflow-hidden">
          <motion.p
            className="text-xl uppercase w-full text-center"
            animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            {props.title}
          </motion.p>
          <motion.p
            className="w-full
            xl:px-20 xl:py-10
            px-10 py-5

            "
            animate={{ x: isHovered ? 0 : 100, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 1.5 }}
          >
            {/* slide in from right and fade in */}

            {props.description}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
