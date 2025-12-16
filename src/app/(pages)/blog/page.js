import PageHeadline from "@/app/components/global/PageHeadline";
import AppHeader from "@/app/components/layout/header/AppHeader";
import { fetchAPI } from "@/app/utils/fetchAPI";
import { Suspense } from "react";
import Loading from "@/app/components/global/Loading";
import BlogContents from "./BlogContents";

async function Blogposts() {
  const data = await fetchAPI(["/blogposts", "/comments"]);
  console.log("Fetched blogposts:", data);
  console.log("Fetched comments:", data["/comments"]);
  const hasError = Boolean(data?.["/blogposts"]?.[0]?.error);

  if (!hasError) {
    return (
      <BlogContents
        blogposts={data["/blogposts"]}
        comments={data["/comments"]}
      />
    );
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
          Unable to load blogposts. Please try again later.
        </p>
        <p className="mt-10 text-red-500">
          {data?.["/reservations"]?.[0]?.error}
        </p>
        <p className="text-sm mt-10 opacity-70 italic">
          {"(Psst... har du husket at starte din server?)"}
        </p>
      </div>
    );
}

export default function GetBlogposts() {
  return (
    <Suspense fallback={<Loading />}>
      <AppHeader />
      <main className="pattern-sm">
        <PageHeadline title="Blog" />
        <Blogposts />
      </main>
    </Suspense>
  );
}
