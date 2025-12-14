"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Table(props) {
  const table = props.table;
  const fetchedDates = props.fetchedDates;
  // // console.log("fetchedDates in Table component:", fetchedDates);
  const searchParams = useSearchParams();
  const currentSelected = searchParams.get("selected");
  const currentDate = searchParams.get("date");
  //   let tableImg;
  //   if (table.size === 1) {
  //     tableImg = "/assets/table/table_1.png";
  //   } else if (table.size === 2) {

  //table pngs er alle 230 x 150
  // aspect ratio 23:15

  // search fetchedDates for reservations (keyword: date) matching currentDate and this table.id (keyword: table):

  const reserved = fetchedDates.some(
    (reservation) =>
      reservation.date === currentDate &&
      String(reservation.table) === String(table.id)
  );

  
  // const reserved = false; // hardcoded placeholder værdi
  const reservedFilter = reserved
    ? "bg-red-500 opacity-75"
    : "";
  
  const selected = currentSelected === String(table.id);
  const selectedFilter = selected
    ? "bg-green-500 opacity-75"
    : "";

  const tableImg = `/assets/table/table_${table.size}.png`;
  const maskClass =
    table.size === 1
      ? "[mask-image:url('/assets/table/table_1.png')]"
      : table.size === 2
      ? "[mask-image:url('/assets/table/table_2.png')]"
      : "[mask-image:url('/assets/table/table_3.png')]";

  const href = (() => {
    if (reserved) return "#";
    const isSelected = currentSelected === String(table.id);
    
    if (isSelected) {
      // Remove the selected parameter
      const params = new URLSearchParams(searchParams.toString());
      params.delete("selected");
      return `/book_table${params.toString() ? `?${params.toString()}` : ''}`;
    } else {
      // Add/update the selected parameter
      const params = new URLSearchParams(searchParams.toString());
      params.set("selected", table.id);
      return `/book_table?${params.toString()}`;
    }
  })();

  return (
    /*     <div
      className={`${maskClass} relative table-mask grid
    w-full aspect-[23/15] rotate-90 my-10 scale-150
    sm:my-25
    md:rotate-0 md:my-3 md:scale-100 overflow-hidden
    `}
    > */
    <div
      className={`${maskClass} relative table-mask grid ${reserved || selected ? 'active' : ''}
    w-full aspect-[23/15] rotate-90 my-10 scale-150
    my-[13vw]
    md:rotate-0 md:my-3 md:scale-100 overflow-hidden

    `}
    >
      {/* table {table.id}, size {table.size} */}
      <div className={`[grid-area:1/1] z-1 mix-blend-color transition-all duration-250 ${reservedFilter} ${selectedFilter}`}></div>
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
        <Link
          href={href}
          scroll={false}
          className={`px-8 py-4 rounded-full hoverChild ${
            reserved ? "cursor-not-allowed text-black" : "cursor-pointer"
          }`}
        >
          {table.id}
        </Link>
      </div>
    </div>
  );
}
