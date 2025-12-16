"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Burger from "./Burger";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <>
      <nav className="hidden md:block">
        {" "}
        {/*Inefficient, places unnecessary elements in DOM when not needed. I don't think it's worth my time to figure
    out true conditional rendering for this, though*/}
        <ul
          className="h-full
      flex gap-10 items-center
      "
        >
          <li>
            <Link
              href="/"
              className={`uppercase text-xl transition-colors duration-200 ${
                pathname == "/" ? "isCurrentPage" : "hover:text-[var(--active)]"
              }`}
            >
              Home
            </Link>
            {pathname == "/" && (
              <div className="grid grid-cols-[1fr_1fr] w-full">
                <div className="col-start-2">
                  <Image
                    src="/assets/bottom_line2.png"
                    alt="Underline"
                    width={150}
                    height={12}
                    className="absolute -translate-x-1/2"
                  ></Image>
                </div>
              </div>
            )}
          </li>
          <li>
            <Link
              href="/book_table"
              className={`uppercase text-xl transition-colors duration-200 ${
                pathname == "/book_table" ? "isCurrentPage" : "hover:text-[var(--active)]"
              }`}
            >
              Book Table
            </Link>

            {pathname == "/book_table" && (
              <div className="grid grid-cols-[1fr_1fr] w-full">
                <div className="col-start-2">
                  <Image
                    src="/assets/bottom_line2.png"
                    alt="Underline"
                    width={150}
                    height={12}
                    className="absolute -translate-x-1/2"
                  />
                </div>
              </div>
            )}
          </li>

          <li>
            <Link
              href="/blog"
              className={`uppercase text-xl transition-colors duration-200 ${
                pathname.startsWith("/blog") ? "isCurrentPage" : "hover:text-[var(--active)]"
              }`}
            >
              Blog
            </Link>

            {pathname.startsWith("/blog") && (
              <div className="grid grid-cols-[1fr_1fr] w-full">
                <div className="col-start-2">
                  <Image
                    src="/assets/bottom_line2.png"
                    alt="Underline"
                    width={150}
                    height={12}
                    className="absolute -translate-x-1/2"
                  />
                </div>
              </div>
            )}
          </li>

          <li>
            <Link
              href="/contact_us"
              className={`uppercase text-xl transition-colors duration-200 ${
                pathname == "/contact_us" ? "isCurrentPage" : "hover:text-[var(--active)]"
              }`}
            >
              Contact Us
            </Link>

            {pathname == "/contact_us" && (
              <div className="grid grid-cols-[1fr_1fr] w-full">
                <div className="col-start-2">
                  <Image
                    src="/assets/bottom_line2.png"
                    alt="Underline"
                    width={150}
                    height={12}
                    className="absolute -translate-x-1/2"
                  />
                </div>
              </div>
            )}
          </li>
        </ul>
      </nav>
      <Burger sentClass="md:hidden" />
    </>
  );
}
