export const postComment = async (prevState, formData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const content = formData.get("comment");
  const blogpostId = formData.get("blogpostid");
  const date = new Date().toISOString();
  const state = {
    success: null,
    errors: {},
    fields: {
      name,
      email,
      content,
    },
  };
  // Validation
  if (!name) {
    state.errors.name = "Please enter your name.";
  } else if (name.length < 2) {
    state.errors.name = "Name must be at least 2 characters.";
  }
  if (!email) {
    state.errors.email = "Please enter your email.";
  } else if (!email.includes("@") || !email.includes(".")) {
    state.errors.email = "Please enter a valid email.";
  }
  if (!content) {
    state.errors.comment = "Please enter your comment.";
  } else if (content.length < 5) {
    state.errors.comment = "Comment must be at least 5 characters.";
  }
  // If there are errors, return the state with errors
  if (Object.keys(state.errors).length > 0) {
    return state;
  }
  // If no errors, proceed to save the comment (this is a placeholder, implement actual saving logic)
  // await saveCommentToDatabase({ clientName, clientEmail, comment });
  // state.success = true;
  // state.fields = {};
  // return state;

  try {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await fetch("http://localhost:4000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        content,
        date,
        blogpostId,
      }),
    });

    state.success = true;
  } catch (error) {
    console.error("Comment submission failed:", error);
    state.success = false;
  }
  return state;
};
