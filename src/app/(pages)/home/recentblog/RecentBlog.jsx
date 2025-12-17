import Title from "@/app/components/global/Title";
import Link from "next/link";
import Image from "next/image";

export default function RecentBlog({ blogposts, comments }) {
  const hasBlogpostsError = blogposts?.[0]?.error;
  const hasCommentsError = comments?.[0]?.error;
  const hasError = hasBlogpostsError || hasCommentsError;

  if (hasError) {
    return (
      <section
        className="flex items-center justify-center flex-col h-130 mb-30 pattern-sm mt-30 md:mt-10 lg:mt-0"
        // mt-30 md:mt-10 lg:mt-0 for at kompensere for overflow af track komponent
      >
        <Title title="Recent Blog" tag="h2" />
        <p className="text-lg">
          Unable to load blog content. Please try again later.
        </p>
        {hasBlogpostsError && (
          <p className="mt-10 text-red-500">{blogposts[0].error}</p>
        )}
        {hasCommentsError && (
          <p className="mt-5 text-red-500">{comments[0].error}</p>
        )}
        <p className="text-sm mt-10 opacity-70 italic">
          {"(Psst... har du husket at starte din server?)"}
        </p>
      </section>
    );
  } else
    return (
      <section className="pattern-sm mt-30 md:mt-10 lg:mt-0">
        <Title title="Recent Blog" tag="h2" />
        <div
          className="px-10 pb-10 gap-3 flex flex-col 
          md:px-30 md:pb-15 md:gap-10 md:grid md:grid-cols-[1fr_1fr]
          xl:px-40 xl:pb-20 xl:grid-cols-[1fr_1fr_1fr]"
        >
          {blogposts
            .slice(blogposts.length - 3, blogposts.length)
            .reverse()
            // da dato ikke er inkluderet i blogposts i API, sorterer jeg efter i stedet efter de sidste 3 i arrayet
            .map((post, i) => {
              const postComments = comments.filter(
                (comment) => comment.blogpostId == post.id
              ).length;
              return (
                <article
                  key={i}
                  // className={`${i === blogposts.length-1 ? 'md:col-span-2 lg:col-span-1' : '' }`}
                  className={`${i === 0 ? "md:col-span-2 xl:col-span-1" : ""}`}
                  // baseret på slicede, ikke fulde array - derfor 2 i stedet for blogposts.length-1
                >
                  <Link
                    href={`blog/posts/${post.id}`}
                    className="cursor-pointer"
                  >
                    <div className="relative h-70 mb-10">
                      <Image
                        src={post.asset.url}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <h3 className="text-lg font-bold">{post.title}</h3>
                    <p className="font-bold text-[var(--active)] mb-2 md:mb-5">
                      BY {post.author} / {postComments} comment
                      {postComments !== 1 ? "s" : ""}
                      {/*ingen dato inkluderet for blogposts i API, så kan ikke implementeres*/}
                    </p>
                  </Link>
                  <div
                    className="h-40 overflow-hidden"
                    style={{
                      maskImage:
                        "linear-gradient(to bottom, black 80%, transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, black 80%, transparent 100%)",
                      //fadeout gradient for text overflow med mask image
                    }}
                  >
                    <p>{post.content}</p>
                  </div>
                </article>
              );
            })}
        </div>
      </section>
    );
}
