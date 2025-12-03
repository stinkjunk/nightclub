"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Burger from "./Burger";

export default function Navbar() {
  const pathname = usePathname();
  return (
  <>
    <nav
    className="hidden md:block"
    > {/*Inefficient, places unnecessary elements in DOM when not needed. I don't think it's worth my time to figure
    out true conditional rendering for this, though*/}
      <ul className="h-full
      flex gap-10 items-center
      ">
        <li>
          <Link href="/"
          className={`uppercase text-xl ${pathname == "/" ? "isCurrentPage" : ""}`}
          >Home</Link>
        </li>
        <li>
          <Link href="/book_table"
          className={`uppercase text-xl ${pathname == "/book_table" ? "isCurrentPage" : ""}`}
          >Book Table</Link>
        </li>
        <li>
          <Link href="/blog"
          className={`uppercase text-xl ${pathname == "/blog" ? "isCurrentPage" : ""}`}
          >Blog</Link>
        </li>
        <li>
          <Link href="/contact_us"
          className={`uppercase text-xl ${pathname == "/contact_us" ? "isCurrentPage" : ""}`}
          >Contact Us</Link>
        </li>
      </ul>
    </nav>
    <Burger
    sentClass="md:hidden"
    />
  </>
  );
}
