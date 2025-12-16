"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function BlogContents(props) {
  const blogposts = props.blogposts;
  const comments = props.comments;
  const pages = blogposts.length === 0 ? 1 : Math.ceil(blogposts.length / 3); // 3 blogposts per side
  // failsafe hvis ingen blogposts eksisterer - kan ikke dividere med 0

  console.log("pages in BlogContents component:", pages);
  // console.log("blogposts in BlogContents component:", blogposts);
  // console.log("comments in BlogContents component:", comments);
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <>
      <div
        //   className="bg-[var(--bg)]
        //     mt-12.5
        //     px-10 py-10
        //     md:px-30 md:py-15 md:mt-25
        //     xl:px-40 xl:py-20
        //     "
        className="bg-[var(--bg)]
        mt-12.5
        md:mt-25
        "
      >
        {blogposts
          .slice((currentPage - 1) * 3, currentPage * 3)
          .map((post, i) => {
            const isEven = post.id % 2 === 0;
            const postComments = comments.filter(
              (comment) => comment.blogpostId == post.id
            ).length;
            return (
              <article
                key={i}
                className="
              mobileMinusHeaderHeight grid
              grid-rows-[1fr_2fr]
              md:grid-rows-1 md:grid-cols-[1fr_1fr] md:h-100
              "
              >
                <div
                  className={`relative w-full h-full md:row-start-1 md:h-full ${
                    isEven ? "md:col-start-2" : "md:col-start-1"
                  }`}
                >
                  <Image
                    className="object-cover "
                    alt={post.title}
                    src={post.asset.url}
                    fill
                  />
                </div>
                <div
                  className={`md:row-start-1 my-10 flex flex-col overflow-hidden
                    px-7
                    md:px-0
                    ${
                    isEven
                      ? "md:col-start-1 md:mr-7 md:ml-20"
                      : "md:col-start-2 md:mr-20 md:ml-7"
                  }`}
                >
                  <div
                    className="overflow-hidden flex-grow"
                    style={{
                      maskImage:
                        "linear-gradient(to bottom, black 80%, transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, black 80%, transparent 100%)",
                      //fadeout gradient for text overflow med mask image
                    }}
                  >
                    <h2 className="text-xl uppercase">{post.title}</h2>
                    <p className="font-bold text-[var(--active)] mb-2 md:mb-5">
                      BY {post.author} / {postComments} comment
                      {postComments !== 1 ? "s" : ""}
                      {/*ingen dato inkluderet for blogposts i API, så kan ikke implementeres*/}
                    </p>
                    <p>{post.content}</p>
                  </div>
                  <Link
                    href={`/blog/posts/${post.id}`}
                    className={`py-2 px-5 w-fit 
                        transition-colors duration-200 hover:text-[var(--active)]
                        ${
                      isEven ? "ml-auto" : ""
                    } mt-5 border-y-1`}
                  >
                    Read more
                  </Link>
                </div>
              </article>
            );
          })}
      </div>
      {pages > 1 && (
        <div
          className="
        pt-7 pb-10
        md:pt-30 md:pb-10
        grid grid-cols-3 w-70 mx-auto"
        >
          <div className="flex justify-end">
            {currentPage > 1 && (
              <button
                className="opacity-60 cursor-pointer hover:opacity-100
              "
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                {"<"} forrige
              </button>
            )}
          </div>
          <div className="flex justify-center gap-2">
            {Array.from({ length: pages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`${
                  currentPage === pageNum
                    ? ""
                    : "opacity-60 cursor-pointer hover:opacity-100"
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>
          <div className="flex justify-start">
            {currentPage < pages && (
              <button
                className="opacity-60 cursor-pointer hover:opacity-100"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                næste {">"}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
