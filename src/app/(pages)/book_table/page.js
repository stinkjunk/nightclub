import PageHeadline from "@/app/components/global/PageHeadline";
import AppHeader from "@/app/components/layout/header/AppHeader";
import Tables from "./Tables";
import BookTableForm from "./BookTableForm";
import { fetchAPI } from "@/app/utils/fetchAPI";

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

const formatDate = (dateString) => {
  return new Date(dateString).toISOString().split('T')[0];
};

const march = [
  // dates, march 10th to march 16th, '25
  "2025-03-10",
  "2025-03-11",
  "2025-03-12",
  "2025-03-13",
  "2025-03-14",
  "2025-03-15",
  "2025-03-16",
]

export default async function BookTable() {
  const data = await fetchAPI(["/reservations"]);
  console.log("Fetched reservations data:", data);
  
  const dates = data["/reservations"].map(reservation => ({
    id: reservation.id,
    date: formatDate(reservation.date),
    table: reservation.table
  }));

  console.log("Formatted reservation dates:", dates);
  
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
        fetchedDates={dates}
        />
        <h3 className="uppercase text-3xl font-bold mb-3">Book a table</h3>
        <BookTableForm
        tables={tables}
        dateRange={march}
        fetchedDates={dates}
        />
        </div>
      </main>
    </>
  );
}
