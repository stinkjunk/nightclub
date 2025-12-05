import Image from "next/image";
import Title from "@/app/components/global/Title";
import WelcomeCard from "./WelcomeCard";

export default function Welcome() {
  return (
    <section className="w-full md:h-screen pattern-sm flex flex-col items-center">
      <Title title="Welcome in NightClub" />

      <div
        className="
      w-full h-full
      px-10 pb-10 gap-3 flex flex-col 
      md:px-30 md:pb-15 gap-7 md:grid md:grid-cols-[1fr_1fr]
      lg:grid-cols-[1fr_1fr_1fr]
      xl:px-40 xl:pb-20 gap-10"
      >
        <WelcomeCard
          sentClass="h-150 md:h-auto"
          src="/assets/content-img/thumb1.jpg"
          title="Nightclub"
          description="Welcome to NightClub, the ultimate destination for all your nightlife needs."
        >
          {/*hacky workaround for no colorized svg being provided in assets*/}
          <div
            className="w-full h-full bg-[var(--active)]
              mask-[url('/assets/icon/Favicon.svg')] 
              mask-center mask-contain mask-no-repeat
              -webkit-mask-[url('/assets/icon/Favicon.svg')]
              -webkit-mask-center -webkit-mask-contain -webkit-mask-no-repeat
              scale-75"
          ></div>
        </WelcomeCard>
        <WelcomeCard
          sentClass="h-150 md:h-auto"
          src="/assets/content-img/reastaurant_1.jpg"
          title="Restaurant"
          description="Enjoy a delicious meal at our restaurant, where we serve a variety of dishes that are sure to satisfy your taste buds." 

        />
        <WelcomeCard
          sentClass="h-150 md:h-auto md:col-span-2 lg:col-span-1"
          src="/assets/content-img/thumb2.jpg"
          title="Bar"
          description="Relax and unwind at our bar, where we serve a variety of drinks that are sure to satisfy your taste buds." 
        />
        {/* <div className="h-full">test</div>
        <div className="h-full">test</div>
        <div className="h-full">test</div> */}
      </div>
    </section>
  );
}
