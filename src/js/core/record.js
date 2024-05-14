import { parse } from "postcss";
import { recordTotal, rowGroup, rowTemplate } from "./selectors";

export const createRecord = ({ id, name, price }, quantity) => {
  const record = rowTemplate.content.cloneNode(true);
  record.querySelector(".row").setAttribute("row-product-id", id);
  record.querySelector(".row-product-name").innerText = name;
  record.querySelector(".row-product-price").innerText = price;
  record.querySelector(".row-product-quantity").innerText = quantity;

  const rowCoast = price * quantity;
  record.querySelector(".row-product-coast").innerText = rowCoast;
  //   updateRecordTotal();
  return record;
};

export const deleteRecord = (event) => {
  const row = event.target.closest(".row");
  if (confirm("Are you sure to remove?")) {
    row.remove();
    // updateRecordTotal();
  }
};

export const updateRecordTotal = () => {
  const allRowCoast = document.querySelectorAll(".row-product-coast");
  // console.log(allRowCoast);
  recordTotal.innerText = [...allRowCoast].reduce(
    (pv, { innerText }) => pv + parseFloat(innerText),
    0
  );
};

export const updateRecord = (productId, q) => {
  // const row = event.target.closest(".row");
  const row = document.querySelector(`[row-product-id='${productId}']`);
  const currentQuantity = row.querySelector(".row-product-quantity");
  const currentPrice = row.querySelector(".row-product-price");
  const currentCoast = row.querySelector(".row-product-coast");

  // console.log(q);

  if (q > 0 || currentQuantity.innerText > 1) {
    currentQuantity.innerText = parseInt(currentQuantity.innerText) + q;
    currentCoast.innerText = currentPrice.innerText * currentQuantity.innerText;
    // updateRecordTotal();
  }
};

export const addRecordQuantity = (event) => {
  const row = event.target.closest(".row");
  const currentQuantity = row.querySelector(".row-product-quantity");
  const currentPrice = row.querySelector(".row-product-price");
  const currentCoast = row.querySelector(".row-product-coast");

  currentQuantity.innerText = parseInt(currentQuantity.innerText) + 1;
  currentCoast.innerText = currentPrice.innerText * currentQuantity.innerText;
  // updateRecordTotal();
};

export const subRecordQuantity = (event) => {
  const row = event.target.closest(".row");
  const currentQuantity = row.querySelector(".row-product-quantity");
  const currentPrice = row.querySelector(".row-product-price");
  const currentCoast = row.querySelector(".row-product-coast");

  if (currentQuantity.innerText > 1) {
    currentQuantity.innerText = parseInt(currentQuantity.innerText) - 1;
    currentCoast.innerText = currentPrice.innerText * currentQuantity.innerText;
  } else {
    deleteRecord(event);
  }
  // updateRecordTotal();
};

export const recordObserver = () => {
  const run = () => {
    console.log("U change row group");
    updateRecordTotal();
  };

  const observerOption = {
    childList: true,
    subtree: true,
  };

  const observer = new MutationObserver(run);

  observer.observe(rowGroup, observerOption);
};
