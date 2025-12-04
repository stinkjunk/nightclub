// import Image from "next/image";

export default function Title(props) {
  const Tag = props.tag || "h1"; //<props.title/> virker ikke - skal have en "component"
  //defineret i fil scope. hvis ingen tag er givet, brug h1 som default
  return (
    <div className="w-full flex flex-col items-center py-15">
      <Tag className={`text-3xl max-w-2/3 md:text-4xl uppercase text-center ${props.passClass}`}>{props.title}</Tag>
      <div
      className="
      my-3
      w-1/4 h-1
      bg-[linear-gradient(90deg,rgba(217,217,217,0)_0%,var(--active)_50.94%,rgba(217,217,217,0)_99.99%)]
      "
      ></div>

    </div>
  );
}
