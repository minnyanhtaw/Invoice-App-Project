import { productSelect } from "./selectors.js";

export const productRender = (products) => {
  products.forEach(({ name, id }) => {
    productSelect.append(new Option(name, id));
  });
};
