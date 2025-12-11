import Title from "@/app/components/global/Title";
import EventsClient from "./EventsClient";

export default function Events({ events }) {
  return (
    <section
      className="flex flex-col
    bg-[url('/assets/bg/slider_bg_overlay.png')]
    bg-cover
    bg-center
    bg-no-repeat
    "
    >
      <Title title="Events of the Month" />
      <EventsClient events={events} />
    </section>
  );
}
