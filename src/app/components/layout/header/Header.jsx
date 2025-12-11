import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";


export default function Header() {
  return (
    <header
      //for future reference, make px dynamic based on screen size
      className="h-[var(--headerHeight)] sticky top-0 z-50"
    >
      <div className="pinkLine h-full  bg-black/[.9] flex px-5 lg:px-20 xl:px-40 justify-between">
        <Link href="/">
          <Image
            src="/assets/icon/Logo_main.svg"
            alt="Logo"
            width={200}
            height={200}
            className="h-full"
          />
        </Link>
        <Navbar />
      </div>

    </header>
  );
}
