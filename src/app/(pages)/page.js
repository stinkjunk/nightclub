import Welcome from "./home/welcome/Welcome";
import Events from "./home/events/Events";
import Track from "./home/track/Track";
import { fetchAPI } from "../utils/fetchAPI"; // utility function
import Hero from "../components/layout/Hero";
export default async function Home() {
  // const data = await fetchAPI(["/events", "/blogposts", "/comments", "/gallery"]);
  const data = await fetchAPI(["/events"]);
  console.log("Fetched data in Home page: ", data);
  return (
    <>
      <Hero />
      <main>
        <Welcome />
        <Events events={data["/events"]} />
        {/* Gallery */}
        <Track />
      </main>
    </>
  );
}
