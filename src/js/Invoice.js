import initialRender from "./core/initialRender.js";
import listener from "./core/listener.js";
import observer from "./core/observer.js";

class Invoice {
  init() {
    console.log("Invoice App start");
    initialRender();
    listener();
    observer();
  }
}

export default Invoice;
