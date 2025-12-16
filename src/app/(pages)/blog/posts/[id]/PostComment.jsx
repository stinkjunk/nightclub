"use client";
import { useActionState } from "react";
// import action for posting comment
import { postComment } from "@/app/action/postComment";
import { useFormStatus } from "react-dom";

const ResponseMessage = ({ state }) => {
  return (
    <div
    className="h-10 flex items-center"
    // brug denne til booktable senere
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
      //brug denne styling til booktable senere: transition-colors duration-200 hover:text-[var(--active)]
      className={`col-2 mt-5 uppercase ml-auto w-fit px-8 border-y-1 py-2 transition-colors duration-200 hover:text-[var(--active)] ${
        pending ? "opacity-50 cursor-not-allowed" : "cursor-pointer "
      }`}
      disabled={pending}
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
};

const PostComment = (props) => {
  const [state, submitComment] = useActionState(postComment, {
    success: null,
    errors: {},
    fields: {},
  });

  return (
    <div
      className="
      mx-10 mt-10 pb-20
      md:mx-30 md:
      xl:mx-40 xl:
      "
    >
      <ResponseMessage state={state} />
      
      <form action={submitComment} className="grid grid-cols-2 gap-x-7 gap-y-6"
      // apply following style to BookTableForm later: gap-x-7 gap-y-6
      >
        <div className={`${formWrapperStyle} col-span-2 md:col-span-1`}>
          <input type="hidden" name="blogpostid" value={props.postId} />
          {state.errors?.clientName && (
            <p className="text-rose-400 text-sm py-0.5 absolute transform -translate-y-[100%]">
              *{state.errors.clientName}
            </p>
          )}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            defaultValue={state.fields?.name}
            className={`${formStyle}
              ${state.errors.name && "placeholder-red-400 text-red-400"}`}
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
            name="email"
            placeholder="Your Email"
            defaultValue={state.fields?.email}
            className={`${formStyle}
              ${state.errors.clientEmail && "placeholder-red-400 text-red-400"}`}
          />
        </div>

        <div className={`${formWrapperStyle} col-span-2`}>
          {state.errors?.comment && (
            <p className="text-rose-400 text-sm py-0.5 absolute transform -translate-y-[100%]">
              *{state.errors.comment}
            </p>
          )}
          <textarea
            id="comment"
            name="comment"
            placeholder="Your Comment"
            rows={15}
            defaultValue={state.fields?.comment}
            className={`${formStyle} text-left align-top resize-none h-auto               ${
                state.errors.comment && "placeholder-red-400 text-red-400"
              }`}
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
};

export default PostComment;
