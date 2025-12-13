import PageHeadline from "@/app/components/global/PageHeadline";
import AppHeader from "@/app/components/layout/header/AppHeader";
import Tables from "./Tables";
import BookTableForm from "./BookTableForm";

const tables = [
  {
    id: 1,
    size: 1,
  },
  {
    id: 2,
    size: 1,
  },
  {
    id: 3,
    size: 2,
  },
  {
    id: 4,
    size: 1,
  },
  {
    id: 5,
    size: 3,
  },
  {
    id: 6,
    size: 1,
  },
  {
    id: 7,
    size: 1,
  },
  {
    id: 8,
    size: 2,
  },
  {
    id: 9,
    size: 1,
  },
  {
    id: 10,
    size: 3,
  },
  {
    id: 11,
    size: 1,
  },
  {
    id: 12,
    size: 1,
  },
  {
    id: 13,
    size: 2,
  },
  {
    id: 14,
    size: 1,
  },
  {
    id: 15,
    size: 3,
  },
];

export default function BookTable() {
  return (
    <>
      <AppHeader />
      <main className="pattern-sm">
        <PageHeadline title="Book Table" />
        <div
        className="
        px-10 py-10 
        md:px-30 md:py-15
        xl:px-40 xl:py-20
        "
        >
        <Tables
        tables={tables}
        />
        <h3 className="uppercase text-3xl font-bold mb-3">Book a table</h3>
        <BookTableForm />
        </div>
      </main>
    </>
  );
}
