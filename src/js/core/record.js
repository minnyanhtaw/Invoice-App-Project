import { parse } from "postcss";
import { recordTotal, rowGroup, rowTemplate } from "./selectors";
import Swal from "sweetalert2";

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
  // console.log(event.target)
  const row = event.target.closest(".row");
  // console.log(row);
  // if (confirm("Are U sure delete row ?")) {
  //   row.remove();
  //   // updateRecordTotal();
  // }
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      row.remove();
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Remove record successfully",
      });
    }
  });
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
