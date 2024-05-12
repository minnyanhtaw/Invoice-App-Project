import { rowTemplate } from "./selectors";

export const createRecord = ({ id, name, price }, quantity) => {
  const record = rowTemplate.content.cloneNode(true);
  record.querySelector(".row-product-name").innerText = name;
  record.querySelector(".row-product-price").innerText = price;
  record.querySelector(".row-product-quantity").innerText = quantity;

  const rowCoast = price * quantity;
  record.querySelector(".row-product-coast").innerText = rowCoast;
  return record;
};
