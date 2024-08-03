import React, { Fragment, useMemo, useEffect, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Dialog, Transition } from "@headlessui/react";
import useAppContext from "../../../hooks/useAppContext";
import PaymentStatus from "./PaymentStatus";
import { Product } from "../../../store/type";
import { postNewProduct } from "../../../backend/product";
import { postNewBilling } from "../../../backend/billing";
import { getCustomerById } from "../../../backend/customer";
import useApiCall from "../../../hooks/useApiCall";
import InvoiceHeading from "./InvoiceHeading";
import CartItemsList from "./CartItemList";
import { usePdfDownloader } from "../../../hooks";

interface Props {
  open: boolean;
  closeCartHandler: () => void;
  customerId: string;
}

const CartItems: React.FC<Props> = ({ open, closeCartHandler, customerId }) => {
  const { state } = useAppContext();
  const { storedCartItems } = state;
  const [billStatus, setBillStatus] = useState("Paid");
  const [inputFieldAmount, setInputAmount] = useState("");
  const [totals, setTotals] = useState({ excludeGST: 0, GST: 0 });
  const contentRef = useRef<HTMLDivElement>(null);
  const [hideDeleteColumn, setHideDeleteColumn] = useState(false);
  const { handleDownloadPDF } = usePdfDownloader();

  const params = useMemo(() => ({ id: customerId }), [customerId]);
  const { data: customer } = useApiCall(getCustomerById, params);

  useEffect(() => {
    let price = 0;
    let gstAmount = 0;
    storedCartItems.forEach((item: Product) => {
      const { itemGST, itemPrice } = calculateNetAmountAndGST(
        item.price,
        item.GST
      );
      price += itemPrice;
      gstAmount += itemGST;
    });
    setTotals({ excludeGST: price, GST: gstAmount });
  }, [storedCartItems]);

  useEffect(() => {
    setInputAmount((totals.excludeGST + totals.GST - 1).toString());
  }, [totals]);

  const calculateNetAmountAndGST = (price: string, GST: string) => {
    const gst = parseInt(GST);
    const itemGST =
      Math.round(((parseInt(price) / (1 + (gst * 2) / 100)) * gst) / 100) * 2;
    const itemPrice = parseInt(price) - itemGST;
    return { itemGST, itemPrice };
  };

  const handleAmountValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    const maxAmount = totals.excludeGST + totals.GST - 1;
    setInputAmount(
      amount === "" || parseInt(amount) <= maxAmount ? amount : inputFieldAmount
    );
  };

  const saveAsPDFHandler = async () => {
    setHideDeleteColumn(true);
    try {
      let amount = inputFieldAmount
        ? totals.excludeGST + totals.GST - parseInt(inputFieldAmount)
        : 0;
      amount = billStatus === "Paid" ? 0 : amount;

      await Promise.all(
        storedCartItems.map((product) =>
          postNewProduct({ ...product, customer: customerId } as Product)
        )
      );
      await postNewBilling({
        gst_amount: totals.GST,
        total_amount: totals.excludeGST + totals.GST,
        unpaid_amount: amount,
        bill_status: billStatus,
        customerId: customerId,
      });

      handleDownloadPDF(
        contentRef.current as HTMLDivElement,
        `${customer?.name ?? ""} ${new Date()}`
      );
    } catch (err) {
      console.error("Error while saving record:", err);
    }
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeCartHandler}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          ></span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block w-full max-w-3xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
              <div className="p-4" id="print" ref={contentRef}>
                {customer && <InvoiceHeading customer={customer} />}
                <div className="flex w-full justify-center items-center">
                  <CartItemsList hideDeleteColumn={hideDeleteColumn} />
                </div>

                <ul className="mt-3 flex flex-col">
                  <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg last:rounded-b-lg">
                    <div className="flex items-center justify-between w-full">
                      <span>Subtotal</span>
                      <span>{totals.excludeGST}</span>
                    </div>
                  </li>
                  <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg last:rounded-b-lg">
                    <div className="flex items-center justify-between w-full">
                      <span>CGST</span>
                      <span>{totals.GST / 2}</span>
                    </div>
                  </li>
                  <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg last:rounded-b-lg">
                    <div className="flex items-center justify-between w-full">
                      <span>SGST</span>
                      <span>{totals.GST / 2}</span>
                    </div>
                  </li>
                  <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold bg-gray-50 border text-gray-800 -mt-px first:rounded-t-lg last:rounded-b-lg">
                    <div className="flex items-center justify-between w-full">
                      <span>Amount to be paid</span>
                      <span>{totals.excludeGST + totals.GST}</span>
                    </div>
                  </li>
                </ul>

                <div className="mt-10">
                  <div className="text-sm w-full flex justify-end pb-16">
                    <p className="font-medium text-sm px-8">
                      For Kalyankar Batteries
                    </p>
                  </div>

                  <div className="p-2 w-full flex justify-end">
                    <p className="font-bold text-sm border-t-2 border-slate-700 px-8 pt-2">
                      Authorized Signature
                    </p>
                  </div>
                </div>

                <div className="w-full">
                  <p className="mb-4 italic text-[10px]">
                    <strong>Subject To Kolhapur Jurisdiction.</strong> I/We
                    hereby certify that my/our registration certificate under
                    the Maharashtra Value Added Tax Act 2002 is in force on the
                    date which the sale of goods specified in the tax invoice is
                    made by me/us and that the transaction of sale covered by
                    this Bill/Cash has been effect by me/us and it shall be
                    accounted for in the turnover of sales while filing of
                    return and the due tax if any payable of the sale has been
                    paid or shall be paid.
                  </p>
                </div>
              </div>

              <div className="text-left flex justify-between mt-6">
                <div className="flex justify-between">
                  <PaymentStatus
                    status={billStatus}
                    setStatus={setBillStatus}
                  />
                  {billStatus === "Unpaid" && (
                    <TextField
                      label="Amount In INR"
                      size="small"
                      onChange={handleAmountValueChange}
                      type="number"
                      value={inputFieldAmount}
                    />
                  )}
                </div>
              </div>
              <div className="mt-4 flex space-x-2 px-4 pb-6">
                <button
                  className="flex w-full items-center justify-center space-x-1 rounded-md border border-blue-500 py-2 text-sm text-blue-500 shadow-sm hover:bg-blue-500 hover:text-white"
                  onClick={saveAsPDFHandler}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Save &amp; Download</span>
                </button>
              </div>
              <div className="flex justify-end items-center">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={closeCartHandler}
                >
                  Close
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CartItems;
