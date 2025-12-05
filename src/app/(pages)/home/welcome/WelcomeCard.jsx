"use client"; //For motion
import { useState } from "react";

import Image from "next/image";
import { motion } from "motion/react";

export default function WelcomeCard(props) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className={`grid relative ${props.sentClass}`}>
      <Image
        src={props.src}
        alt="Image"
        fill
        className="col-start-1 row-start-1 object-cover"
      ></Image>
      <motion.div
        className="hoverPinkLine 
        col-start-1 row-start-1 h-full
        h-full flex grid grid-rows-[1fr_1fr]
        gap-5
        overflow-hidden
        "
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        // initial={{ opacity: 0 }}
        // whileHover={{ opacity: 1 }}
        // transition={{ duration: 0.2 }}
      >
        <div className="w-full flex items-end justify-center">
          <motion.div
            animate={{ scale: isHovered ? 1 : 0 }}
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
        <div className="w-full">
          <p className="text-xl uppercase w-full text-center">{props.title}</p>
          <p className="px-20 py-10 w-full">{props.description}</p>
        </div>
      </motion.div>
    </div>
  );
}
