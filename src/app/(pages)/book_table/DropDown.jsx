"use client";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";

import { FaAngleRight } from "react-icons/fa6";

export default function DropDown(props) {
  const reserved = false; // hardcoded placeholder værdi

  const searchParams = useSearchParams();
  const currentSelected = searchParams.get("selected");
  const [isOpen, setIsOpen] = useState(false);

  //   const options = props.options;


  return (
    <div className="relative">
      <div
        className={`${props.passedStyle} flex overflow-hidden cursor-pointer items-center`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {props.selected}
        <FaAngleRight
          className={`ml-auto transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </div>
      <div className="absolute w-full overflow-hidden">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2 }}
              className="pattern-sm"
            >
              {props.sentItems.map((sent, i) => {

                const formatDate = (dateString) => {
                  const options = { year: 'numeric', month: 'long', day: 'numeric' };
                  const date = new Date(dateString);
                  return date.toLocaleDateString(undefined, options);
                }
                
                const params = new URLSearchParams(searchParams.toString());
                params.set("date", sent);
                const href = `/book_table?${params.toString()}`;
              
                return (
                  <Link
                    key={i}
                    scroll={false}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`${props.passedStyle} flex items-center`}
                  >
                    {formatDate(sent)}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
