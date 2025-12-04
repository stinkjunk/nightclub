import Title from "./Title";

export default function PageHeadline(props) {
  return (
    <div className="w-full pageHeadline">
      <Title title={props.title} />
    </div>
  );
}
