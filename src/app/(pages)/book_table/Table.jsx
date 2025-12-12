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

  const reserved = false; // hardcoded placeholder værdi
  const reservedFilter = reserved ? "bg-red-500 mix-blend-color opacity-75" : "";

  const tableImg = `/assets/table/table_${table.size}.png`;
  const maskClass =
    table.size === 1
      ? "[mask-image:url('/assets/table/table_1.png')]"
      : table.size === 2
      ? "[mask-image:url('/assets/table/table_2.png')]"
      : "[mask-image:url('/assets/table/table_3.png')]";

  return (
    <div
      className={`${maskClass} relative table-mask grid
    w-full aspect-[23/15] rotate-90 my-25 scale-150
    md:rotate-0 md:my-3 md:scale-100 overflow-hidden
    `}
    >
      {/* table {table.id}, size {table.size} */}
      <div className={`[grid-area:1/1] z-1 ${reservedFilter}`}></div>
      <Image
        src={tableImg}
        alt={`Table ${table.id}`}
        fill
        className="h-full w-full object-cover [grid-area:1/1]"
      />

      <div
        className="[grid-area:1/1] flex w-full h-full justify-center items-center z-1
      -rotate-90
      md:rotate-0
      "
      >
        <button>{table.id}</button>
      </div>
    </div>
  );
}
