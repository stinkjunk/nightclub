import Image from "next/image";
import Title from "@/app/components/global/Title";
import WelcomeCard from "./WelcomeCard";
import { MdRoomService } from "react-icons/md";

import { TbGlassCocktail } from "react-icons/tb";


export default function Welcome() {
  return (
    <section className="w-full min-h-screen 2xl:h-screen pattern-sm flex flex-col items-center">
      <Title title="Welcome in NightClub" />

      <div
      className="
      w-full h-full
      px-10 pb-10 gap-3 flex flex-col 
      md:px-30 md:pb-15 gap-7 md:grid md:grid-cols-[1fr_1fr]
      xl:px-40 xl:pb-20 gap-10 xl:grid-cols-[1fr_1fr_1fr]"
      >
        <WelcomeCard
          sentClass=""
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
              scale-70"
          ></div>
        </WelcomeCard>
        <WelcomeCard
          sentClass=""
          src="/assets/content-img/reastaurant_1.jpg"
          title="Restaurant"
          description="Enjoy a delicious meal at our restaurant, where we serve a variety of dishes that are sure to satisfy your taste buds." 

        >
          <MdRoomService
          size="100%"
          color="var(--active)"
          className="scale-70"
          />
        </WelcomeCard>
        <WelcomeCard
          sentClass="md:col-span-2 xl:col-span-1"
          src="/assets/content-img/thumb2.jpg"
          title="Bar"
          description="Relax and unwind at our bar, where we serve a variety of drinks that are sure to satisfy your taste buds." 
        >
          <TbGlassCocktail
          size="100%"
          color="var(--active)"
          className="scale-70"
          
          />
        </WelcomeCard>
        {/* <div className="h-full">test</div>
        <div className="h-full">test</div>
        <div className="h-full">test</div> */}
      </div>
    </section>
  );
}
