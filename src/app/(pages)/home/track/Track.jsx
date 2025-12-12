"use client";

import dynamic from "next/dynamic";
import Title from "@/app/components/global/Title";

const TrackPlayer = dynamic(() => import("./TrackPlayer"), { ssr: false });

export default function Track() {
  return (
    <section className="w-full flex flex-col items-center">
      <Title title="Night Club Track" tag="h2" />
      <TrackPlayer />
    </section>
  );
}

