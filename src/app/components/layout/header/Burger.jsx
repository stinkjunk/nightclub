"use client";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";

export default function Burger(props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    //Scroll lock
    //det er min forståelse at useEffect kan bruges til stort set at køre vanilla JS efter render
    window.addEventListener("resize", scrollLock);
    function scrollLock() {
      const isMobile = window.matchMedia("(max-width: 768px)").matches; //768 px er tailwinds md breakpoint
      if (isOpen && isMobile) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }

    // if (isOpen) {
    //   scrollLock();
    // }
    scrollLock(); //ovenover kalder ikke funktionen - men da [isOpen] defineres i useEffect, vil den køre ved ændring af isOpen
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={props.sentClass + " cursor-pointer w-10 h-10 my-auto"}
      >
        <FaBars className="h-full w-full" />
      </button>
      {isOpen && (
        <div
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
              onClick={() => setIsOpen(!true)}
              className="w-8 h-8 mt-3 cursor-pointer"
            >
              <FaXmark className="w-full h-full" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
