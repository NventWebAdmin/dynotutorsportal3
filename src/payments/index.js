import { makePaymentPaytm } from "./paytm";

import { configdata } from "../config";

export function makePayment(dataprops) {
  let rec;
  if (configdata().paymentvendor == "paytm") {
    rec = makePaymentPaytm(dataprops);
  }

  return rec;
}
