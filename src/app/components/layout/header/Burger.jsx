"use client";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useState } from "react";
import Link from "next/link";
// import { useEffect } from "react";

import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";

export default function Burger(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  };

  // useEffect(() => {
  //   // ikke bruge useEffect - forstår ikke kravet, da jeg ikke bruger useEffect til fetching/ting der kunne klares
  //   // på server; useEffect ser ud til at være måden at interagere med DOM.

  //   // HAR DOG været nødt til at bruge useEffect for at lytte til DOM for resize

  //   // "Effects are an escape hatch from the React paradigm. They let you “step outside” of React and synchronize your
  //   // components with some external system like a non-React widget, network, or the browser DOM."
  //   // officiel react dokumentation: https://react.dev/learn/you-might-not-need-an-effect
  //   // https://dev.to/hkp22/reacts-useeffect-best-practices-pitfalls-and-modern-javascript-insights-g2f

  //   //Scroll lock
  //   window.addEventListener("resize", scrollLock);
  //   function scrollLock() {
  //     const isMobile = window.matchMedia("(max-width: 768px)").matches; //768 px er tailwinds md breakpoint
  //     //Teknisk set er isMobile væk fra tailwinds md breakpoint på en ~subpixel niveau, så der en miniskul ø, hvor isMobile er false
  //     //mens UI stadig renderer mobile menuen. Men igen, nok subpixel niveau - skal vitterligt koncentrere mig på at skalere browser vinduet
  //     //helt perfekt for at ramme buggen
  //     if (isOpen && isMobile) {
  //       document.body.style.overflow = "hidden";
  //     } else {
  //       document.body.style.overflow = "auto";
  //     }
  //   }

  //   // if (isOpen) {
  //   //   scrollLock();
  //   // }
  //   scrollLock(); //ovenover kalder ikke funktionen efter isOpen først opdateres - men da [isOpen] defineres i useEffect, vil den køre ved ændring af isOpen
  // }, [isOpen]);

  return (
    <>
      <button
        onClick={toggleMenu}
        className={props.sentClass + " cursor-pointer w-10 h-10 my-auto"}
      >
        <FaBars className="h-full w-full" />
      </button>
      <AnimatePresence>
        {" "}
        {/*tillader elementer at blive i dom'en selv efter hook (isOpen) er opdateret indtil exit animation er færdig*/}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${props.sentClass} absolute fixed top-0 left-0 w-screen h-screen grid grid-cols-[1fr_5fr_1fr] bg-black/[.9] z-50`}
          >
            <nav className="col-start-2 h-full justify-center flex flex-col justify-center">
              <ul className="flex flex-col items-center gap-8 pb-20">
                <li>
                  <Link href="/" className="uppercase text-xl">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/book_table" className="uppercase text-xl">
                    Book Table
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="uppercase text-xl">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact_us" className="uppercase text-xl">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="col-start-3 flex flex-col items-center">
              <button
                onClick={toggleMenu}
                className="w-8 h-8 mt-3 cursor-pointer"
              >
                <FaXmark className="w-full h-full" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
