"use client";
import { useActionState } from "react";
import { reserveTable } from "@/app/action/reserveTable";
import { useFormStatus } from "react-dom";
import { useSearchParams, useRouter } from "next/navigation";
import DropDown from "./DropDown";

const ResponseMessage = ({ state }) => {
  return (
    <div
      className="h-10 flex items-center"
    >
      {state.success === true && (
        <p className="text-green-400 mb-2">Form sent successfully</p>
      )}
      {state.success === false && (
        <p className="text-red-500 mb-2">
          Something went wrong, please try again
        </p>
      )}
    </div>
  );
};

const formStyle =
  "border-1 p-3 w-full text-[var(--text)] placeholder-[var(--text)] h-18";
const formWrapperStyle = /* "mx-3 my-2" */ "";
const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`col-2 mt-5 uppercase ml-auto w-fit px-8 border-y-1 py-2 transition-colors duration-200 hover:text-[var(--active)] ${
        pending ? "opacity-50 cursor-not-allowed" : "cursor-pointer "
      }`}
      disabled={pending}
    >
      {pending ? "Submitting..." : "Reserve Table"}
    </button>
  );
};

const BookTableForm = (props) => {
  //length of tables from props:
  const tableLength = props.tables.length;
  // console.log("Table length in BookTableForm:", tableLength);

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSelected = searchParams.get("selected");
  const tableData = currentSelected
    ? props.tables.find((table) => table.id === parseInt(currentSelected))
    : null;

  const currentDate = searchParams.get("date");
  // const dateData = currentDate
  //   ? props.fetchedDate.find((date) => date === currentDate)
  //   : null;

  // // console.log("Date data in BookTableForm:", dateData);

  // console.log("fetcheDates in BookTableForm:", props.fetchedDates);
  const [state, postProduct] = useActionState(reserveTable, {
    success: null,
    errors: {},
    fields: {},
  });

  const reserved = props.fetchedDates.some(
    (reservation) =>
      reservation.date === currentDate &&
      String(reservation.table) === String(currentSelected)
  );
  // console.log("Current date: ", currentDate);
  // console.log("Is the selected table reserved?", reserved);

  const handleTableNumberChange = (e) => {
    let value = parseInt(e.target.value) || 0;

    // Clamp the value between 1 and tableLength
    if (value > tableLength) value = tableLength;
    if (value < 0) value = 0;

    // Update the input value
    e.target.value = value;

    // Update the URL search params
    const params = new URLSearchParams(searchParams.toString());
    if (value != 0) {
      params.set("selected", value);
    } else {
      params.delete("selected");
    }
    router.push(
      `/book_table${params.toString() ? `?${params.toString()}` : ""}`,
      { scroll: false }
    );
  };
  // console.log("tableData in BookTableForm:", tableData);
  let maxGuests;
  if (tableData) {
    if (tableData.size === 1) maxGuests = 4;
    else if (tableData.size === 2) maxGuests = 6;
    else if (tableData.size === 3) maxGuests = 8;
    else maxGuests = 4;
  }

  const handleGuestNumberChange = (e) => {
    let value = parseInt(e.target.value);

    if (isNaN(value) || value < 1) {
      value = 1;
    } else if (tableData && value > maxGuests) {
      value = maxGuests;
    }

    e.target.value = value;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    // return date.toLocaleDateString(undefined, options);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="">
      <ResponseMessage state={state} />
      <form action={postProduct} className="grid grid-cols-2 gap-x-7 gap-y-6">
        {state.errors?.clientName && (
          <p className="text-rose-400 text-sm py-0.5 absolute transform -translate-y-[100%]">
            *{state.errors.clientName}
          </p>
        )}
        <input
          type="text"
          name="date"
          className="hidden"
          placeholder={currentDate ? (reserved ? "reserved" : currentDate) : ""}
          defaultValue={
            currentDate ? (reserved ? "reserved" : currentDate) : ""
          }
          // nok ikke en god idé i virkeligheden - du ville vitterligt kunne reservere et allerede
          // reserveret bord i dev tools ved at ændre værdien her. er klar over dette.
        ></input>
        <div className={`${formWrapperStyle} col-span-2 md:col-span-1`}>
          <input
            type="text"
            name="clientname"
            placeholder="Your Name"
            defaultValue={state.fields?.clientName}
            className={`${formStyle}
               ${state.errors.clientName && "placeholder-red-400 text-red-400"}
               `}
          />
        </div>
        <div className={`${formWrapperStyle} col-span-2 md:col-span-1`}>
          {state.errors?.clientEmail && (
            <p className="text-rose-400 text-sm py-0.5 absolute transform -translate-y-[100%]">
              *{state.errors.clientEmail}
            </p>
          )}
          <input
            type="text"
            name="clientemail"
            placeholder="Your Email"
            defaultValue={state.fields?.clientEmail}
            className={`${formStyle}
              ${
                state.errors.clientEmail && "placeholder-red-400 text-red-400"
              }`}
          />
        </div>
        <div className={`${formWrapperStyle} col-span-2 md:col-span-1`}>
          {state.errors?.tableNumber && (
            <p className="text-rose-400 text-sm py-0.5 absolute transform -translate-y-[100%]">
              *{state.errors.tableNumber}
            </p>
          )}
          <input
            type="number"
            name="tablenumber"
            placeholder={`Table Number`}
            value={currentSelected || ""}
            min="1"
            max={tableLength}
            onChange={handleTableNumberChange}
            onBlur={handleTableNumberChange}
            className={`${formStyle}
              ${
                state.errors.tableNumber && "placeholder-red-400 text-red-400"
              }`}
          />
        </div>
        <div className={`${formWrapperStyle} col-span-2 md:col-span-1`}>
          {state.errors?.guestNumber && (
            <p className="text-rose-400 text-sm py-0.5 absolute transform -translate-y-[100%]">
              *{state.errors.guestNumber}
            </p>
          )}
          <input
            type="number"
            name="guestnumber"
            placeholder={`Guest Number${
              tableData ? ` (Max ${maxGuests} guests)` : ""
            }`}
            defaultValue={state.fields?.guestNumber}
            min="1"
            max={tableData ? maxGuests : undefined}
            onBlur={handleGuestNumberChange}
            className={`${formStyle}
              ${
                state.errors.guestNumber && "placeholder-red-400 text-red-400"
              }`}
          />
        </div>
        <div className={`${formWrapperStyle} col-span-2 md:col-span-1`}>
          {state.errors?.date && (
            <p className="text-rose-400 text-sm py-0.5 absolute transform -translate-y-[100%]">
              *{state.errors.date}
            </p>
          )}
          <DropDown
            // sentItems={[
            //   "date 1 (placeholder)",
            //   "date 2 (placeholder)",
            //   "date 3 (placeholder)",
            //   "date 4 (placeholder)",
            //   "date 5 (placeholder)",
            // ]}
            sentItems={props.dateRange}
            // link={"#"}
            selected={
              currentDate ? "Date: " + formatDate(currentDate) : "Select Date"
            }
            passedStyle={formStyle}
            hasError={state.errors?.date}
          ></DropDown>
        </div>

        <div className={`${formWrapperStyle} col-span-2 md:col-span-1`}>
          {state.errors?.contactNumber && (
            <p className="text-rose-400 text-sm py-0.5 absolute transform -translate-y-[100%]">
              *{state.errors.contactNumber}
            </p>
          )}
          <input
            type="number"
            name="contacttnumber"
            placeholder="Your Contact Number"
            defaultValue={state.fields?.contactNumber}
            className={`${formStyle}
              ${
                state.errors.contactNumber && "placeholder-red-400 text-red-400"
              }`}
          />
        </div>

        <div className={`${formWrapperStyle} col-span-2`}>
          <textarea
            id="comment"
            name="comment"
            placeholder="Your Comment"
            rows={15}
            defaultValue={state.fields?.comment}
            className={`${formStyle} text-left align-top resize-none h-auto`}
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
  //   return (
  //     <div className="flex flex-col justify-center items-center h-[calc(100vh-var(--headerHeight))]">
  //       <h1 className="text-3xl font-bold my-5">Add product</h1>
  //       <form
  //         action={postProduct}
  //         className="px-7
  //       w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 mb-[var(--headerHeight)]
  //       "
  //       >
  //         <div className="mb-5">
  //           {state.error.clientName && (
  //             <p className="text-rose-400 text-sm py-0.5">
  //               *{state.error.clientName}
  //             </p>
  //           )}
  //           <input
  //             type="text"
  //             name="clientName"
  //             placeholder="Product name"
  //             className={`border-1 p-1 mr-2 h-10 w-full px-4
  //              ${
  //                state.error.clientName &&
  //                "placeholder-red-400 text-red-400"
  //              }`}
  //           />
  //         </div>
  //         <div className="mb-5">
  //           {state.error.clientEmail && (
  //             <p className="text-rose-400 text-sm py-0.5">
  //               *{state.error.clientEmail}
  //             </p>
  //           )}
  //           <input
  //             step="any"
  //             type="number"
  //             name="clientEmail"
  //             placeholder="Product price (In USD)"
  //             className={`border-1 p-1 mr-2 h-10 w-full px-4
  //              ${
  //                state.error.clientEmail &&
  //                "placeholder-red-400 text-red-400"
  //              }`}
  //           />
  //         </div>
  //         {/* <button className="bg-[var(--praimory)] border-1 p-1 mr-2 h-10 w-full px-4 text-[var(--text)]">
  //           Add product
  //         </button> */}
  //         <SubmitButton />
  //       </form>
  //     </div>
  //   );
};

export default BookTableForm;
