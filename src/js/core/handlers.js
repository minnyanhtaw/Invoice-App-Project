import { createRecord } from "./record.js";
import { createForm, productSelect, rowGroup } from "./selectors.js";
import { products } from "./variables.js";

export const createFormHandler = (event) => {
  event.preventDefault();
  console.log("u click buy btn");
  const formData = new FormData(createForm);
  const currentProductId = parseInt(formData.get("productSelect"));
  const currentProduct = products.find((el) => el.id === currentProductId);
  const currentQuantity = parseInt(formData.get("inputQuantity"));
  console.log(currentProduct);
  //   console.log(currentProductId);
  rowGroup.append(createRecord(currentProduct, currentQuantity));
};
