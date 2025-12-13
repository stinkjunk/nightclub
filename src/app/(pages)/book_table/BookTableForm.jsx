"use client";
import { useActionState } from "react";
import { submitProduct } from "@/app/action/action";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";

const ResponseMessage = ({ state }) => {
  return (
    <>
      {state.success === true && (
        <p className="text-green-400 mb-2">Form sent successfully</p>
      )}
      {state.success === false && (
        <p className="text-red-500 mb-2">
          Something went wrong, please try again
        </p>
      )}
    </>
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
      className={`col-2 mt-5 uppercase ml-auto w-fit px-8 border-y-1 py-2 ${pending ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={pending}
    >
      {pending ? "Submitting..." : "Reserve Table"}
    </button>
  );
};

const BookTableForm = () => {
  const searchParams = useSearchParams();
  const currentSelected = searchParams.get("selected");
  const [state, postProduct] = useActionState(submitProduct, {
    success: null,
    errors: {},
    fields: {},
  });
  return (
    <div className="">
      <ResponseMessage state={state} />
      <form action={postProduct} className="grid grid-cols-2 gap-x-5 gap-y-4">
        {state.errors?.productName && (
          <p
            className={
              "text-rose-400 text-sm py-0.5 " /* + "absolute transform -translate-y-[100%]" */
            }
          >
            *{state.errors.productName}
          </p>
        )}
        <div className={`${formWrapperStyle}`}>
          <input
            type="text"
            name="productname" //resterende kode fra tidligere repo, fixer senere
            placeholder="Your Name"
            defaultValue={state.fields?.productName}
            className={`${formStyle}
               ${
                 state.errors.productName &&
                 "border-rose-400 bg-red-100 placeholder-red-400"
               }
               `}
          />
        </div>
        {/* <div className="mb-10"> */}
        <div className={`${formWrapperStyle}`}>
          {/* {state.errors.productPrice && (
            <p
              className={
                ""
              }
            >
              *{state.errors.productPrice}
            </p>
          )} */}
          <input
            type="text"
            name="productprice"
            placeholder="Your Email"
            defaultValue={state.fields?.productPrice}
            className={`${formStyle}
              ${
                state.errors.productPrice &&
                "border-rose-400 bg-red-100 placeholder-red-400 text-red-400"
              }`}
          />
        </div>
        <div className={`${formWrapperStyle}`}>
          <input
            //TODO: clamp to all tables
            type="number"
            name="tablenumber"
            placeholder="Table Number"
            defaultValue={currentSelected || ""}
            className={`${formStyle}

               `}
          />
        </div>
        <div className={`${formWrapperStyle}`}>
          <input
            //TODO: clamp to all tables
            type="number"
            name="guestnumber"
            placeholder="Number of Guests"
            className={`${formStyle}

               `}
          />
        </div>
        <div className={`${formWrapperStyle} `}>
          <p className={`${formStyle} flex overflow-hidden items-center`}>
            Select Date {"(Placeholder)"}
          </p>
        </div>

        <div className={`${formWrapperStyle} `}>
          <input
            type="number"
            name="contacttnumber"
            placeholder="Your Contact Number"
            className={`${formStyle}

               `}
          />
        </div>

        <div className={`${formWrapperStyle} col-span-2`}>
          <textarea
            id="comment"
            name="comment"
            placeholder="Your Comment"
            rows={15}
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
  //           {state.error.productname && (
  //             <p className="text-rose-400 text-sm py-0.5">
  //               *{state.error.productname}
  //             </p>
  //           )}
  //           <input
  //             type="text"
  //             name="productname"
  //             placeholder="Product name"
  //             className={`border-1 p-1 mr-2 h-10 w-full px-4
  //              ${
  //                state.error.productname &&
  //                "border-rose-400 bg-red-100 placeholder-red-400"
  //              }`}
  //           />
  //         </div>
  //         <div className="mb-5">
  //           {state.error.productprice && (
  //             <p className="text-rose-400 text-sm py-0.5">
  //               *{state.error.productprice}
  //             </p>
  //           )}
  //           <input
  //             step="any"
  //             type="number"
  //             name="productprice"
  //             placeholder="Product price (In USD)"
  //             className={`border-1 p-1 mr-2 h-10 w-full px-4
  //              ${
  //                state.error.productprice &&
  //                "border-rose-400 bg-red-100 placeholder-red-400"
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
