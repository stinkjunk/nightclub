"use client";
import Image from "next/image";
export default function Table(props) {
  const table = props.table;
  //   let tableImg;
  //   if (table.size === 1) {
  //     tableImg = "/assets/table/table_1.png";
  //   } else if (table.size === 2) {

  //table pngs er alle 230 x 150
  // aspect ratio 23:15

  const tableImg = `/assets/table/table_${table.size}.png`;

  return (
    <div
      className={`relative grid
    w-full aspect-[23/15] rotate-90 my-25 scale-150
    md:rotate-0 md:my-3 md:scale-100 overflow-hidden
    `}
    >
      {/* table {table.id}, size {table.size} */}
      <Image
        src={tableImg}
        alt={`Table ${table.id}`}
        fill
        className="h-full w-full object-cover [grid-area:1/1]"
      />
      <div className="[grid-area:1/1] flex w-full h-full justify-center items-center z-1
      -rotate-90
      md:rotate-0
      ">
        <button>{table.id}</button>
      </div>
    </div>
  );
}
