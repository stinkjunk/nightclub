"use server";
export const submitProduct = async (prevState, formData) => {
  const productName = formData.get("productname");
  const productPrice = Number(formData.get("productprice"));

  const state = {
    success: null,
    errors: {},
    fields: {
      productName,
      productPrice,
    },
  };

  if (!productName) {
    state.errors.productName = "Please fill in the product name.";
  } else if (productName.length < 5) {
    state.errors.productName = "Your product name must be at least 5 characters long.";
  }

  if (!productPrice) {
    state.errors.productPrice = "Please provide a price for your product.";
  } else if (productPrice < 0.5) {
    state.errors.productPrice = "The price must be at least 50 cents.";
  }

  if (Object.keys(state.errors).length > 0) {
    return state;
  }
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: productName,
    }),
  });
  console.log(response);

  state.success = response.ok;
  return state;
};