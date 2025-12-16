import Image from "next/image";

export default function PostContent(props) {
  return (
    <>
      <div className="relative w-full h-130 mb-8">
        <Image
          className="object-cover"
          alt={props.title}
          src={props.imgUrl}
          fill
        ></Image>
      </div>
      <h2 className="text-xl uppercase mb-2">{props.title}</h2>
      <p className="font-bold text-[var(--active)] mb-2 md:mb-5">
        BY {props.author} / {props.commentsLength} comment
        {props.commentsLength !== 1 ? "s" : ""}
        {/*ingen dato inkluderet for blogposts i API, så kan ikke implementeres*/}
      </p>
    </>
  );
}
