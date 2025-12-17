import { FaTwitter } from "react-icons/fa";
import { fetchAPI } from "@/app/utils/fetchAPI";
import Link from "next/link";
import Image from "next/image";

import { FaFacebookF } from "react-icons/fa";
import { FaSnapchatGhost } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaT } from "react-icons/fa6";

// ved ikke hvad der menes med tweets og "recent posts" i figma designet, da der ikke er korresponderende data i API'et.
// derfor fetcher jeg bare blogposts for posts og comments for tweets:

const data = await fetchAPI(["/blogposts", "/comments"]);
const posts = data["/blogposts"];
const tweets = data["/comments"];

export default function Footer() {
  const compareDates = (isoString) => {
    const now = new Date();
    const past = new Date(isoString);
    let diffMs = now.getTime() - past.getTime();
    if (diffMs < 0) diffMs = 0; // guard against future dates

    const hourMs = 1000 * 60 * 60;
    const dayMs = hourMs * 24;

    const diffHours = Math.floor(diffMs / hourMs);
    const diffDays = Math.floor(diffMs / dayMs);

    if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
    }
    if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
    }
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7) || 1;
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    }

    // Calendar month difference for more accurate months/years
    const months = (now.getFullYear() - past.getFullYear()) * 12 + (now.getMonth() - past.getMonth());
    if (months < 12) {
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    }
    const years = Math.floor(months / 12);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  };
  return (
    <footer
      className="px-5 lg:px-20 xl:px-40 footer-bg pt-20 pb-10
    xl:grid xl:grid-cols-3
    "
    >
      <div className="flex flex-col gap-10 xl:row-span-2">
        <Link href="/" className="mx-auto xl:mx-0">
          <Image
            src="/assets/icon/Logo_main.svg"
            alt="Logo"
            width={200}
            height={100}
            className=""
          />
        </Link>
        <div className="flex flex-col items-center xl:block">
          <p className="uppercase text-xl text-[var(--active)] font-medium mb-1">
            Location
          </p>
          <p className="text-center xl:text-left">
            Kompagnistræde 278<br></br>
            1265 Købehavn K
          </p>
        </div>
        <div className="flex flex-col items-center xl:block">
          <p className="uppercase text-xl text-[var(--active)] font-medium mb-1">
            Opening Hours
          </p>
          <p className="text-center xl:text-left">
            WED - THU 10:30 PM TO 3 AM<br></br>
            SAT - SUN: 11 PM TO 5 AM
          </p>
        </div>
      </div>
      <div className="hidden xl:grid xl:col-span-2 gap-20 h-full grid-cols-2 mb-50">
        <div>
          <p className="uppercase text-xl text-[var(--active)] font-medium">
            Recent Posts
          </p>
          <div className="gap-10 my-5 flex flex-col">
            {posts
              .slice(-2)
              .reverse()
              .map((post, i) => {
                return (
                  <div key={i} className="flex h-30">
                    <Link
                      className="relative h-30 w-30 flex-shrink-0 cursor-pointer"
                      href={`/blog/posts/${post.id}`}
                    >
                      <Image
                        src={post.asset.url}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex flex-col flex-grow ml-6">
                      <div
                        className="flex-grow overflow-hidden relative"
                        style={{
                          maskImage:
                            "linear-gradient(to bottom, black 80%, transparent 100%)",
                          WebkitMaskImage:
                            "linear-gradient(to bottom, black 80%, transparent 100%)",
                        }}
                      >
                        <p className="break-words flex-grow">{post.content}</p>
                      </div>
                      <p className="text-[var(--active)] my-2">
                        Post is not dated
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div>
          <p className="uppercase text-xl text-[var(--active)] font-medium">
            Recent Tweets
          </p>
          <div className="gap-10 my-5 flex flex-col">
            {tweets
              .slice(-2)
              .reverse()
              .map((tweet, i) => {
                return (
                  <div key={i} className="flex h-30">
                    <FaTwitter size={25} className="text-[var(--active)] w-50"/>
                    <div className="flex flex-col flex-grow ml-6">
                      <div
                        className="flex-grow overflow-hidden relative"
                        style={{
                          maskImage:
                            "linear-gradient(to bottom, black 80%, transparent 100%)",
                          WebkitMaskImage:
                            "linear-gradient(to bottom, black 80%, transparent 100%)",
                        }}
                      >
                        <p className="break-words flex-grow">{tweet.content}</p>
                      </div>
                      <p className="text-[var(--active)] my-2">
                        {compareDates(tweet.date)}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="xl:col-start-1 xl:col-span-3 xl:grid grid-cols-3">
        <div className="grid grid-cols-3 xl:gap-x-10 col-start-2">
          <p className="col-span-3 w-full text-center mb-5">
            Stay Connected With Us
          </p>
          <Link
            href="#"
            className="outline-1 h-15 w-15 ml-auto flex items-center justify-center"
          >
            <FaFacebookF size={30} />
          </Link>

          <Link
            href="#"
            className="outline-1 h-15 w-15 mx-auto flex items-center justify-center"
          >
            <FaSnapchatGhost size={30} />
          </Link>
          <Link
            href="#"
            className="outline-1 h-15 w-15 mr-auto flex items-center justify-center"
          >
            <FaInstagram size={30} />
          </Link>
        </div>
        <p className=" w-full text-center xl:text-left row-start-1 mt-10 xl:mt-0 xl:pr-5">
          Night Club PSD Template - All Rights Reserved
        </p>
        <p className="w-full text-center xl:text-right xl:pl-5">
          Copyright © NightClub
        </p>
      </div>
    </footer>
  );
}
