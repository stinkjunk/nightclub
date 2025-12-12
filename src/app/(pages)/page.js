import Welcome from "./home/welcome/Welcome";
import Events from "./home/events/Events";
import Track from "./home/track/Track";
import { fetchAPI } from "../utils/fetchAPI"; // utility function
import Hero from "../components/layout/Hero";
import { Suspense } from "react";
import Loading from "../components/global/Loading";
export default async function Home() {
  // const data = await fetchAPI(["/events", "/blogposts", "/comments", "/gallery"]);
  const data = await fetchAPI(["/events"]);
  // console.log("Fetched data in Home page: ", data);
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <Hero />
        <Welcome />
        <Events events={data["/events"]} />
        <Track />
      </Suspense>
      {/* <Loading /> */}
    </main>
  );
}
