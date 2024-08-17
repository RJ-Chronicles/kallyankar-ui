import TextField from "@mui/material/TextField";

import { useContext, useEffect, useRef, useState } from "react";
import { updateBillingById } from "../../backend/billing";
import ButtonClick from "../../components/UI/Button/ButtonClick";
import ButtonHeader from "../../components/UI/Button/ButtonHeader";
import InvoiceHeading from "../../components/UI/Cart/InvoiceHeading";
import Overlay from "../../components/UI/Overlay";
import { useAnimation } from "../../hooks";
import usePdfDownloader from "../../hooks/usePdfDownloader";
import AppContext from "../../store/AppContext";
import { Billing } from "../../store/type";
import SelectStatuRadio from "./SelectStatusRadio";

type Props = {
  data: Billing;
  show: boolean;
  setHide: (val: boolean) => void;
};

const PayUnpaidAmount: React.FC<Props> = ({ data, show, setHide }) => {
  const { customer, unpaid_amount, _id } = data;
  const [status, setStatus] = useState("Paid");
  const [inputFieldAmount, setInputAmount] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const {
    state: { refreshEffect },
    dispatch,
  } = useContext(AppContext);
  const { spinnerAnimationStart, spinnerAnimationStop, snackbarAnimation } =
    useAnimation();

  useEffect(() => {
    setInputAmount(unpaid_amount.toString());
  }, [unpaid_amount]);

  const handleAmountValueChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const inputAmount = e.target.value;
    if (inputAmount === "") {
      setInputAmount(() => "");
    } else if (parseInt(inputAmount) > unpaid_amount) {
      setInputAmount((prev: string) => prev);
    } else {
      setInputAmount(() => inputAmount);
    }
  };
  const { handleDownloadPDF } = usePdfDownloader();
  const hideModule = () => {
    setHide(false);
  };

  const togglePaymentStatus = (status: string) => {
    console.log({ status });
    if (status === "Paid") {
      setInputAmount(unpaid_amount.toString());
    }
    setStatus(status);
  };

  const updateCustomerPayment = async () => {
    spinnerAnimationStart();
    hideModule();
    const pendingAmount = unpaid_amount - parseInt(inputFieldAmount);
    const bill_status =
      unpaid_amount - parseInt(inputFieldAmount) === 0 ? "Paid" : "Unpaid";
    const body = { bill_status, unpaid_amount: pendingAmount };
    await updateBillingById(body, _id ?? "");
    handleDownloadPDF(
      contentRef.current as HTMLDivElement,
      `file_${customer?.name}_${customer?._id}`
    );

    spinnerAnimationStop();
    snackbarAnimation("Record Updated successfully! ", "success");
    dispatch({ type: "REFRESH_EFFECT", payload: !refreshEffect });
  };
  return (
    <Overlay open={show} handleClose={hideModule} widthSize="lg">
      <div id="print" ref={contentRef} className="w-full p-20">
        <InvoiceHeading customer={customer} />
        <table className="w-full overflow-hidden shadow-md rounded-md">
          <tr className="text-sm text-blue-100 text-left">
            <th className="px-3 py-2 bg-yellow-700 ">{"Total Amount"}</th>
            <th className="px-3 py-2 bg-yellow-700">{"Paid Amount"}</th>
            <th className="px-3 py-2 bg-yellow-700">{"Date"}</th>
            <th className="px-3 py-2 bg-yellow-700">{"Pending Amount"}</th>
          </tr>

          <tr className="bg-white dark:border-gray-700 dark:bg-gray-800 text-sm text-slate-900">
            <td className="px-3 py-2">{unpaid_amount}</td>
            <td className="px-3 py-2">
              {inputFieldAmount === "" ? "0" : inputFieldAmount}
            </td>
            <td className="px-3 py-2">{new Date().toJSON().slice(0, 10)}</td>
            <td className="px-3 py-2">
              {" "}
              {inputFieldAmount === ""
                ? unpaid_amount
                : unpaid_amount - parseInt(inputFieldAmount)}
            </td>
          </tr>
        </table>
      </div>

      <div className="text-left flex justify-left mt-6">
        <div className="flex justify-between items-center">
          <SelectStatuRadio setStatus={togglePaymentStatus} status={status} />
          {status === "Unpaid" && (
            <TextField
              label="Amount In INR"
              id="outlined-size-small"
              size="small"
              onChange={handleAmountValueChange}
              type="number"
              value={inputFieldAmount}
              className="focus:outline-none outline-none w-96 border-none"
              style={{ outline: "none", border: "none" }}
            />
          )}
        </div>
      </div>
      <div className="m-6 flex justify-end space-x-10">
        <ButtonHeader buttonClick={updateCustomerPayment} title="Print" />
        <ButtonHeader buttonClick={hideModule} title="Close" />
      </div>
    </Overlay>
  );
};

export default PayUnpaidAmount;
