import Table from "./Table";


export default function Tables(props) {
  const tables = props.tables;
  return (
    <div
      className="
      grid grid-cols-3
      
      px-10 py-10 
      md:px-30 md:py-15
      lg:grid-cols-5 
      xl:px-40 xl:py-20 
      "
    >
      {/* <p>Work in Progress</p> */}
      {tables.map((table, i) => (
        <Table key={i} table={table} />
      ))}
    </div>
  );
}
