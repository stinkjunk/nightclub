"use client"; //For conditional rendering

import { usePathname } from "next/navigation";
import Image from "next/image";
import Header from "./header/Header";

export default function Hero() {
  const pathname = usePathname();
  if (pathname == "/") {
    const heroImg = Math.random() < 0.5 ? "/assets/bg/header_bg_1.jpg" : "/assets/bg/header_bg_2.jpg"; //per default genererer Math.random() et tilfældigt
    //decimal tal mellem 0 og 1 - så der er 50% chance for hver herobillede at blive valgt
    console.log(heroImg);
    return (
      <>
        <section
          className="h-screen flex flex-col absolute
        w-full
        "
        >
          <Image
            src={heroImg}
            alt="hero"
            className="w-full h-full object-cover"
            fill
          />
          {/*billedet "hopper" visuelt anden frame efter første render - måske noget CSS som bliver sat på efter?*/}
          {/*noget med react eller next i dev mode gør at billedet bliver renderet to gange, så giver mig hydration errors -
          something something "strict mode" - burde ikke være et problem når et rigtigt buid er deployet. forhåbentligt*/}

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
