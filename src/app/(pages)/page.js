import Image from "next/image";
import Welcome from "./home/welcome/Welcome";
import Track from "./home/track/Track";

export default function Home() {
  return (
    <main>
      <Welcome />
      {/* Gallery */}
      {/* Events */}
      <Track />
    </main>
  );
}
