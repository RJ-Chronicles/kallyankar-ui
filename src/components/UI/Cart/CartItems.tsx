import React, { Fragment, useMemo, useState, useRef } from "react";
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
  const { state, dispatch } = useAppContext();
  const { storedCartItems, refreshEffect } = state;
  const [billStatus, setBillStatus] = useState("Paid");
  const contentRef = useRef<HTMLDivElement>(null);
  const { handleDownloadPDF } = usePdfDownloader();
  const [payment, setTotalAmount] = useState({ total: 0, gst: 0 });
  const [inputFieldAmount, setInputAmount] = useState(payment.total.toString());
  const params = useMemo(() => ({ id: customerId }), [customerId]);
  const { data: customer } = useApiCall(getCustomerById, params);

  const handleAmountValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    const maxAmount = payment.total - 1;
    setInputAmount(
      amount === "" || parseInt(amount) <= maxAmount ? amount : inputFieldAmount
    );
  };

  const saveAsPDFHandler = async () => {
    try {
      let amount = inputFieldAmount
        ? payment.total - parseInt(inputFieldAmount)
        : 0;
      amount = billStatus === "Paid" ? 0 : amount;

      await Promise.all(
        storedCartItems.map((product) =>
          postNewProduct({ ...product, customer: customerId } as Product)
        )
      );
      await postNewBilling({
        gst_amount: payment.gst,
        total_amount: payment.total,
        unpaid_amount: amount,
        bill_status: billStatus,
        customerId: customerId,
      });

      handleDownloadPDF(
        contentRef.current as HTMLDivElement,
        `${customer?.name ?? ""} ${new Date()}`
      );
      dispatch({ type: "ADD_STORED_CART_ITEMS", payload: [] });
      dispatch({ type: "REFRESH_EFFECT", payload: !refreshEffect });
      closeCartHandler();
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
              <div className="p-2" id="print" ref={contentRef}>
                <div className="border-2 border-gray-600 p-2">
                  {customer && <InvoiceHeading customer={customer} />}
                  <div className="flex w-full justify-center items-center">
                    <CartItemsList setTotal={setTotalAmount} />
                  </div>

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
                      the Maharashtra Value Added Tax Act 2002 is in force on
                      the date which the sale of goods specified in the tax
                      invoice is made by me/us and that the transaction of sale
                      covered by this Bill/Cash has been effect by me/us and it
                      shall be accounted for in the turnover of sales while
                      filing of return and the due tax if any payable of the
                      sale has been paid or shall be paid.
                    </p>
                  </div>
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
