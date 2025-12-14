"use server";

export const submitProduct = async (prevState, formData) => {
  const clientName = formData.get("clientname");
  const clientEmail = formData.get("clientemail");
  const tableNumber = formData.get("tablenumber");
  const guestNumber = formData.get("guestnumber");
  const contactNumber = formData.get("contacttnumber");
  const comment = formData.get("comment");

  const state = {
    success: null,
    errors: {},
    fields: {
      clientName,
      clientEmail,
      tableNumber,
      guestNumber,
      contactNumber,
      comment,
    },
  };

  // Validation
  if (!clientName) {
    state.errors.clientName = "Please enter your name.";
  } else if (clientName.length < 2) {
    state.errors.clientName = "Name must be at least 2 characters.";
  }

  if (!clientEmail) {
    state.errors.clientEmail = "Please enter your email.";
  } else if (!clientEmail.includes("@") || !clientEmail.includes(".")) {
    state.errors.clientEmail = "Please enter a valid email.";
  }

  if (!tableNumber) {
    state.errors.tableNumber = "Please select a table.";
  } /* else if (isNaN(tableNumber)) {
    state.errors.tableNumber = "Table number must be valid.";
  } */ // burder ikke være muligt at sende ikke-numerisk input pga input type=number

  if (!guestNumber) {
    state.errors.guestNumber = "Please enter number of guests.";
  } else if (guestNumber < 1) {
    state.errors.guestNumber = "Must have at least 1 guest.";
  }

  if (!contactNumber) {
    state.errors.contactNumber = "Please enter your contact number.";
  } else if (contactNumber.length < 8) {
    state.errors.contactNumber = "Please enter a valid contact number.";
  }

  // Return early if there are errors
  if (Object.keys(state.errors).length > 0) {
    return state;
  }
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      //objekt sendt til API
      title: "test",
    }),
  });
  console.log(response);

  state.success = true;
  return state;
};