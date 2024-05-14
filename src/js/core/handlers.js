import { productRender } from "./product.js";
import {
  addRecordQuantity,
  createRecord,
  deleteRecord,
  subRecordQuantity,
  updateRecord,
  updateRecordTotal,
} from "./record.js";
import {
  createForm,
  inventorySheet,
  newProductForm,
  productSelect,
  productTemplate,
  rowGroup,
} from "./selectors.js";
import { products } from "./variables.js";

export const createFormHandler = (event) => {
  event.preventDefault();
  console.log("u click buy btn");
  const formData = new FormData(createForm);
  const currentProductId = parseInt(formData.get("productSelect"));
  const currentProduct = products.find((el) => el.id === currentProductId);
  const currentQuantity = parseInt(formData.get("inputQuantity"));
  // console.log(currentProduct);
  //   console.log(currentProductId);

  const isExistedRow = rowGroup.querySelector(
    `[row-product-id='${currentProductId}']`
  );

  if (isExistedRow) {
    updateRecord(isExistedRow.getAttribute("row-product-id"), currentQuantity);
    // console.log(currentQuantity);
  } else {
    rowGroup.append(createRecord(currentProduct, currentQuantity));
  }
  // updateRecordTotal();
  createForm.reset();
};

export const rowGroupHandler = (event) => {
  if (event.target.classList.contains("row-delete-btn")) {
    deleteRecord(event);
  } else if (event.target.classList.contains("row-q-add")) {
    // addRecordQuantity(event);
    updateRecord(
      event.target.closest(".row").getAttribute("row-product-id"),
      1
    );
  } else if (event.target.classList.contains("row-q-sub")) {
    // subRecordQuantity(event);
    updateRecord(
      event.target.closest(".row").getAttribute("row-product-id"),
      -1
    );
  }
};

export const newProductFormHandler = (event) => {
  event.preventDefault();
  console.log("y click submit btn");
  const formData = new FormData(newProductForm);

  const newProduct = {
    id: Date.now(),
    name: formData.get("new_product_name"),
    price: formData.get("new_product_price"),
  };

  products.push(newProduct);
  productRender(products);
  newProductForm.reset();
};

export const manageInventoryBtnHandler = () => {
  inventorySheet.classList.toggle("-translate-x-full");
};

export const printBtnHandler = () => {
  window.print();
};
