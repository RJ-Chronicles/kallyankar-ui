import TextField from "@mui/material/TextField";
import { useState } from "react";
import ButtonClick from "../../components/UI/Button/ButtonClick";
import InvoiceHeading from "../../components/UI/Cart/InvoiceHeading";
import Overlay from "../../components/UI/Overlay";
import { Billing } from "../../store/type";
import SelectStatuRadio from "./SelectStatusRadio";

type Props = {
  data: Billing;
  show: boolean;
  setHide: (val: boolean) => void;
};

const PayUnpaidAmount: React.FC<Props> = ({
  data: { customer, unpaid_amount, _id },
  show,
  setHide,
}) => {
  const [status, setStatus] = useState("Paid");
  const [inputFieldAmount, setInputAmount] = useState("");

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

  const hideModule = () => {
    setHide(false);
  };
  return (
    <Overlay open={show} handleClose={hideModule}>
      <div id="print">
        <InvoiceHeading customer={customer} />
        <div className="text-left w-full mt-6">
          <div className=" text-slate-700 flex justify-end w-full py-1 px-6  font-base rounded-sm">
            <div className="flex w-1/3 justify-start">
              <span className="pr-12">Total Amount</span>
              <span className=" ">{unpaid_amount}</span>
            </div>
          </div>
          <div className="flex justify-end w-full py-1 px-6 text-slate-700 font-base border-b border-slate-400">
            <div className="flex w-1/3 justify-start">
              <span className="pr-12">Paid Amount</span>
              <span>{inputFieldAmount === "" ? "0" : inputFieldAmount}</span>
            </div>
          </div>
          <div className="flex justify-end  w-full py-1 px-6 text-slate-700 font-semibold">
            <div className="flex w-1/3 justify-start">
              <span className="pr-3">Pending Amount</span>
              <span>
                {inputFieldAmount === ""
                  ? "0"
                  : unpaid_amount - parseInt(inputFieldAmount)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-left flex justify-left mt-6">
        <div className="flex justify-between items-center">
          <SelectStatuRadio setStatus={setStatus} status={status} />
          {status === "Unpaid" && (
            <TextField
              label="Amount In INR"
              id="outlined-size-small"
              size="small"
              onChange={handleAmountValueChange}
              type="number"
              value={inputFieldAmount}
              className="focus:outline-none"
            />
          )}
        </div>
      </div>
      <div className="my-6">
        <ButtonClick onClick={hideModule} title="Close" />
      </div>
    </Overlay>
  );
};

export default PayUnpaidAmount;
