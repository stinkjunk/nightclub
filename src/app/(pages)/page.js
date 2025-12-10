import Image from "next/image";
import Welcome from "./home/welcome/Welcome";
import Events from "./home/events/Events";
import Track from "./home/track/Track";
import { fetchAPI } from "../utils/fetchAPI"; // utility function
export default async function Home() {
  // const data = await fetchAPI(["/events", "/blogposts", "/comments", "/gallery"]);
  const data = await fetchAPI(["/events"]);
  console.log("Fetched data in Home page: ", data);
  return (
    <main>
      <Welcome />
      <Events events={data["/events"]} />
      {/* Gallery */}
      <Track />
    </main>
  );
}
