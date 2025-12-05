import Image from "next/image";
import Welcome from "./home/welcome/Welcome";

export default function Home() {
  return (
    // <main
    //   className="pattern-sm
    // px-4 py-2"
    // >
    //   <h1 className="text-5xl">
    //     Ubuntu Font <span className="font-bold colActive">Ubuntu Font</span>
    //   </h1>
    //   <p>Test</p>
    //   <Image
    //     className="w-1/3 py-5"
    //     src="/assets/content-img/gallery5_big.jpg"
    //     alt="test image"
    //     width={800}
    //     height={600}
    //   />
    //   <h1 className="text-5xl">Blog {"(Placeholder)"}</h1>
    //   <div className="h-[200vh]">
    //     <p>200vh height for testing of header stickyness</p>
    //   </div>
    // </main>
    <main>
      <Welcome />
    </main>
  );
}
