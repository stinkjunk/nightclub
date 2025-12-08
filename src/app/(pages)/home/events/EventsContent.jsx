"use client";

import Title from "@/app/components/global/Title";
import Image from "next/image";

export default function EventsContent({ events }) {
  const entries = Array.isArray(events) ? events : [];

  return (
    <section 
    // className="h-screen"
    >
      <Title title="Events of the Month" />
      {/* Testing Code: */}
      {entries.map(
        ({ id, title, description: desc, date, asset, location }) => (
          //map all keys in event object to see what data is available
          <div key={id ?? title}>
            <p>{title}</p>
            <p>{desc}</p>
            <p>{date}</p>
            <p>{location}</p>
            {asset?.url ? (
              <div>
                <Image
                  src={asset.url}
                  alt="Event Image"
                  width={250}
                  height={250}
                  className="object-fit"
                />
              </div>
            ) : (
              ""
            )}
          </div>
        )
      )}
    </section>
  );
}
