"use client"; //For conditional rendering

import { usePathname } from "next/navigation";
import Image from "next/image";
import Header from "./header/Header";

export default function Hero() {
  const pathname = usePathname();
  if (pathname == "/") {
    return (
      <>
        <section
          className="h-screen flex flex-col absolute
        bg-red-500 w-full
        "
        >
          <p className="text-7xl mb-auto">
            Dummy Hero Component {"(Conditional)"}
          </p>
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
