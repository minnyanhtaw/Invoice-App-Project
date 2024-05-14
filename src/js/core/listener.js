import {
  createFormHandler,
  manageInventoryBtnHandler,
  newProductFormHandler,
  printBtnHandler,
  rowGroupHandler,
} from "./handlers.js";
import {
  createForm,
  inventorySheetCloseBtn,
  manageInventoryBtn,
  newProductForm,
  printBtn,
  rowGroup,
} from "./selectors.js";

const listener = () => {
  createForm.addEventListener("submit", createFormHandler);
  rowGroup.addEventListener("click", rowGroupHandler);
  newProductForm.addEventListener("submit", newProductFormHandler);
  manageInventoryBtn.addEventListener("click", manageInventoryBtnHandler);
  inventorySheetCloseBtn.addEventListener("click", manageInventoryBtnHandler);
  printBtn.addEventListener("click", printBtnHandler);
};

export default listener;
