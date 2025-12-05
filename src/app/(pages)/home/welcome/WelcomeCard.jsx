"use client"; //For motion

import Image from "next/image";
import { motion } from "motion/react";

export default function WelcomeCard(props) {
  const parentVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1, transition: { duration: 0.2 } }, //store state
  };
  const iconAnimation = {
    initial: { scale: 0 },
    hover: { scale: 1, transition: { duration: 0.5 } },
  };

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
        // initial={{ opacity: 0 }}
        // whileHover={{ opacity: 1 }}
        // transition={{ duration: 0.2 }}
        variants={parentVariants}
        initial="initial"
        whileHover="hover"
      >
        <motion.div
          className="w-full flex items-end justify-center"
          variants={{ initial: {}, hover: {} }}
          initial="initial"
          //intermediate "carrier" motion div - doesn't need to animate, but is needed for the children to animate
        >
          <motion.div
            variants={iconAnimation} //when the parent switches to "hover", all children with a matching variant key "hover" animate automatically
            className="border-3 border-[var(--active)] rounded-lg relative
            w-20 h-20 
            md:w-25 md:h-25 
            xl:w-35 xl:h-35 
            "
          >
            {props.children}
          </motion.div>
        </motion.div>
        <motion.div className="w-full">
          <motion.p className="text-xl uppercase w-full text-center">
            {props.title}
          </motion.p>
          <motion.p className="px-20 py-10 w-full">
            {props.description}
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}

