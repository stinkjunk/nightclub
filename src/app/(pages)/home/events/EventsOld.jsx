import EventsContent from "./EventsContent";

export default function Events() {
  return (
    // <FetchAPI endpoint="/events">
    //   {(events) => <EventsContent events={events} />} 
    //   {/*render prop; passing function as the child to RenderAPI so it can call it with the 
    //   fetched data. When FetchAPI gets the data, it will call this function with the data as argument.
      
    //   In Events.jsx, events is just the parameter name in the render-prop function you’re passing as children. 
    //   Whatever FetchAPI calls children with becomes that argument. Since FetchAPI does return children(data);, 
    //   the value of data inside FetchAPI is passed into your arrow function and bound to its first 
    //   parameter, which you named events. Rename the param and you’ll see it still works the same—it’s not declared 
    //   elsewhere; it’s supplied by FetchAPI when it invokes the child function.
      
    //   */}
    // </FetchAPI>
    <></>
  );
}
