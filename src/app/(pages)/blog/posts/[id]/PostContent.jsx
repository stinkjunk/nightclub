import Image from "next/image";

export default function PostContent(props) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    // return date.toLocaleDateString(undefined, options);
    return date.toLocaleDateString("en-US", options); // brug dette andre steder også for at undgå lokal oversættelse
  };
  return (
    <>
      <div
        className="relative w-auto h-130 mt-8
           md:mx-30 md:mt-15
           xl:mx-40 xl:mt-20
           box-border
           "
      >
        <Image
          className="object-cover"
          alt={props.title}
          src={props.imgUrl}
          fill
        ></Image>
      </div>
      <div
        className="
           mx-10 mt-10
           md:mx-30 md:
           xl:mx-40 xl:
           "
      >
        <h2 className="text-xl uppercase mb-2">{props.title}</h2>
        <p className="font-bold text-[var(--active)] mb-2 md:mb-5">
          BY {props.author} / {props.commentsLength} comment
          {props.commentsLength !== 1 ? "s" : ""}
          {/*ingen dato inkluderet for blogposts i API, så kan ikke implementeres*/}
        </p>
        <p className="mb-20">{props.content}</p>
        {/*Comments:*/}
        <p className="text-3xl capitalize">
          {props.commentsLength} comment{props.commentsLength !== 1 ? "s" : ""}
        </p>
        <div>
          {props.comments.map((comment, i) => {
            const date = formatDate(comment.date);

            return (
              <div key={i} className="md:mr-40 mb-10">
                <p className="text-lg mb-2">
                  {comment.name} -{" "}
                  <span className="text-[var(--active)]">Posted {date}</span>
                </p>
                <p>{comment.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
