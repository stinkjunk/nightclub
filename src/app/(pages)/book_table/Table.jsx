"use client";
import Image from "next/image";
export default function Table(props) {
  const table = props.table;
  //   let tableImg;
  //   if (table.size === 1) {
  //     tableImg = "/assets/table/table_1.png";
  //   } else if (table.size === 2) {

  const tableImg = `/assets/table/table_${table.size}.png`;
  const maskClass =
    table.size === 1
      ? "[mask-image:url('/assets/table/table_1.png')]"
      : table.size === 2
      ? "[mask-image:url('/assets/table/table_2.png')]"
      : "[mask-image:url('/assets/table/table_3.png')]";

  return (
    <div className={`h-full ${maskClass}`}>
      {/* table {table.id}, size {table.size} */}
        <Image
        src={tableImg}
        alt={`Table ${table.id}`}
        width={100}
        height={100}
        className="h-full w-full object-cover"
        />

    </div>
  );
}
