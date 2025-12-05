"use client"; //For conditional rendering

import { usePathname } from "next/navigation";
import Image from "next/image";
import Header from "./header/Header";
import { motion } from "motion/react";

export default function Hero() {
  const pathname = usePathname();
  if (pathname == "/") {
    const heroImg =
      Math.random() < 0.5
        ? "/assets/bg/header_bg_1.jpg"
        : "/assets/bg/header_bg_2.jpg"; //per default genererer Math.random() et tilfældigt
    //decimal tal mellem 0 og 1 - så der er 50% chance for hver herobillede at blive valgt
    console.log(heroImg);
    // const MotionImage = motion(Image); 
    return (
      <>
        <section
          className="h-screen flex flex-col absolute
        w-full grid
        "
        >
          <Image
            src={heroImg}
            alt="hero"
            className="w-full h-full object-cover grid-row-start-1 grid-col-start-1"
            fill
          />
          {/*billedet "hopper" visuelt anden frame efter første render - måske noget CSS som bliver sat på efter?*/}
          {/*noget med react eller next i dev mode gør at billedet bliver renderet to gange, så giver mig hydration errors -
          something something "strict mode" - burde ikke være et problem når et rigtigt buid er deployet. forhåbentligt*/}

          <div className="grid-row-start-1 grid-col-start-1 flex justify-center items-center z-10">
            <div className="relative w-2/3 xl:w-1/2 flex flex-col">
              <motion.div
                className="relative w-full aspect-5/1"
                //animation mangler perspektiv "3d" effekt
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <Image src="/assets/icon/Logo.svg" alt="NIGHTCLUB" fill />
              </motion.div>
              <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
              >
                {/* <p
                className="w-full text-center text-4xl text-center tracking-[1cqw]"
                >HAVE A GOOD TIME</p> */}
                <p className="w-full flex justify-between text-[3cqw] xl:text-[2cqw]">
                  {"HAVE A GOOD TIME".split("").map((letter, i) => (
                    // <span key={i}>{letter}</span>
                    <span 
                    key={i}
                    // className="text-shadow-[0_0_16px_0px_#000000]"
                    className="text-shadow-lg"
                    >{letter === " " ? "\u00A0" : letter}</span>
                  ))}
                </p>
                <Image
                  src="/assets/bottom_line.png"
                  alt="Underline"
                  width={1364}
                  height={109}
                ></Image>
                {/*Kunne ikke finde et billede med kombineret underline og text - så bruger et p-tag*/}
              </motion.div>
            </div>
          </div>

          {/* <p className="text-5xl mb-auto">
            Dummy Hero Component {"(Conditional)"}
          </p> */}
        </section>
        {/*spacer element*/}
        <div className="h-[calc(100vh-var(--headerHeight))]"></div>
        <Header />
      </>
    );
  } else {
    return (
      <>
        <div className="h-[var(--headerHeight)] pattern-sm absolute top-0 left-0 w-full"></div>
        <Header />
      </>
    );
  }
}
