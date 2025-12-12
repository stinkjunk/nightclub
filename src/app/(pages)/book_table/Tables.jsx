import Table from "./Table";

export default function Tables(props) {
  const tables = props.tables;
  return (
    <div
      className="
      grid grid-cols-5 gap-4
      
      px-10 pb-10 
      md:px-30 md:pb-15 
      xl:px-40 xl:pb-20 
      "
    >
      {/* <p>Work in Progress</p> */}
      {tables.map((table, i) => (
        <Table key={i} table={table} />
      ))}
    </div>
  );
}
