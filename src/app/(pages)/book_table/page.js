import PageHeadline from "@/app/components/global/PageHeadline";
import AppHeader from "@/app/components/layout/header/AppHeader";
import Tables from "./Tables";

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
        <Tables
        tables={tables}
        />
      </main>
    </>
  );
}
