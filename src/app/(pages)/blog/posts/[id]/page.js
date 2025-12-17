import PageHeadline from "@/app/components/global/PageHeadline";
import AppHeader from "@/app/components/layout/header/AppHeader";
import { fetchAPI } from "@/app/utils/fetchAPI";
import { Suspense } from "react";
import Loading from "@/app/components/global/Loading";
import Link from "next/link";
import PostContent from "./PostContent";
import PostComment from "./PostComment";

async function Blogpost({ id }) {
  console.log("Id in Blogpost component:", id);
  const data = await fetchAPI([
    `/blogposts/${id}`,
    `/comments?blogpostId=${id}`,
  ]);
  const post = data?.[`/blogposts/${id}`];
  const comments = data?.[`/comments?blogpostId=${id}`];
  
  const hasError = Boolean(Array.isArray(post) && post[0]?.error);
  const exists = Boolean(Object.keys(post).length > 0 && !hasError);
  
  console.log("Fetched blogpost:", data);
  console.log("post: ", post);
  console.log("Has error?", hasError);
  console.log("Exists?", exists);

  const commentsLength = !hasError && exists && Array.isArray(comments) 
    ? comments.filter((comment) => comment.blogpostId == post.id).length 
    : 0;

  if (!hasError) {
    if (!exists) {
      return (
        <div
          className=" h-180 flex flex-col items-center justify-center
           px-10 py-10
           md:px-30 md:py-15
           xl:px-40 xl:py-20
           "
        >
          <p className="text-3xl text-red-500">404</p>
          <p className="text-lg">This blog post does not exist.</p>
          <Link
            href={"/blog"}
            className="underline mt-5 text-[var(--active)] cursor-pointer"
          >
            See blogposts
          </Link>
        </div>
      );
    } else {
      return (
        <div
        // className="
        //  px-10 py-10
        //  md:px-30 md:py-15
        //  xl:px-40 xl:py-20
        //  "
        >
          <PostContent
            title={post.title}
            imgUrl={post.asset.url}
            author={post.author}
            content={post.content}
            //   comments={areComments ? comments : []}
            comments={comments}
            commentsLength={commentsLength}
          />
          <PostComment postId={post.id} />
        </div>
      );
    }
  } else
    return (
      <div
        className=" h-180 flex flex-col items-center justify-center
           px-10 py-10
           md:px-30 md:py-15
           xl:px-40 xl:py-20
           "
      >
        <p className="text-lg">
          Unable to load blog post. Please try again later.
        </p>
        <p className="mt-10 text-red-500">{post?.[0]?.error}</p>
        <p className="text-sm mt-10 opacity-70 italic">
          {"(Psst... har du husket at starte din server?)"}
        </p>
      </div>
    );
}

export default async function GetBlogpost({ params }) {
  const { id } = await params;
  return (
    <Suspense fallback={<Loading />}>
      <AppHeader />
      <main className="pattern-sm">
        <PageHeadline title="Blog Post" />
        <Blogpost params={params} id={id} />
      </main>
    </Suspense>
  );
}
