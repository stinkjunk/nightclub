import Table from "./Table";


export default function Tables(props) {
  const tables = props.tables;
  const fetchedDates = props.fetchedDates;
  return (
    <div
      className="
      grid grid-cols-3
      pb-10 
      md:pb-15
      lg:grid-cols-5 
      xl:pb-20 
      "
    >
      {/* <p>Work in Progress</p> */}
      {tables.map((table, i) => (
        <Table key={i} table={table} fetchedDates={fetchedDates}/>
      ))}
    </div>
  );
}
