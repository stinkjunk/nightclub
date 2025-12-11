import Image from "next/image";


export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <Image
        src="/assets/loader/madbars.gif"
        alt="Loading..."
        width={29}
        height={24}
        ></Image>

    </div>
  );
}
