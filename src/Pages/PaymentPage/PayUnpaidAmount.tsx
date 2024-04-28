import TextField from "@mui/material/TextField";
import { Table } from "flowbite-react";
import { useRef, useState } from "react";
import ButtonClick from "../../components/UI/Button/ButtonClick";
import InvoiceHeading from "../../components/UI/Cart/InvoiceHeading";
import Overlay from "../../components/UI/Overlay";
import usePdfDownloader from "../../hooks/usePdfDownloader";
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
  const contentRef = useRef<HTMLDivElement>(null);

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

  return (
    <Overlay open={show} handleClose={hideModule} widthSize="lg">
      <div id="print-area" ref={contentRef} className="w-full p-20">
        <InvoiceHeading customer={customer} />
        <Table className="w-full overflow-hidden shadow-md rounded-md">
          <Table.Head className="text-sm text-blue-100 ">
            <Table.HeadCell className="px-3 py-2 bg-yellow-700">
              {"Total Amount"}
            </Table.HeadCell>
            <Table.HeadCell className="px-3 py-2 bg-yellow-700">
              {"Paid Amount"}
            </Table.HeadCell>
            <Table.HeadCell className="px-3 py-2 bg-yellow-700">
              {"Date"}
            </Table.HeadCell>
            <Table.HeadCell className="px-3 py-2 bg-yellow-700">
              {"Painding Amount"}
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-sm text-slate-900">
              <Table.Cell className="px-3 py-2">{unpaid_amount}</Table.Cell>
              <Table.Cell className="px-3 py-2">
                {inputFieldAmount === "" ? "0" : inputFieldAmount}
              </Table.Cell>
              <Table.Cell className="px-3 py-2">
                {new Date().toJSON().slice(0, 10)}
              </Table.Cell>
              <Table.Cell className="px-3 py-2">
                {" "}
                {inputFieldAmount === ""
                  ? unpaid_amount
                  : unpaid_amount - parseInt(inputFieldAmount)}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
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
              className="focus:outline-none outline-none w-96 border-none"
              style={{ outline: "none", border: "none" }}
            />
          )}
        </div>
      </div>
      <div className="my-6 flex">
        <ButtonClick
          onClick={() =>
            handleDownloadPDF(contentRef.current as HTMLDivElement, "file")
          }
          title="Print"
        />
        <ButtonClick onClick={hideModule} title="Close" />
      </div>
    </Overlay>
  );
};

export default PayUnpaidAmount;
