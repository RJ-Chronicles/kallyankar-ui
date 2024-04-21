import { Table } from "flowbite-react";
import { BILLING_STATUS_COLUMN } from "./columns";
import useDateFormater from "../../../hooks/useDateFormater";
import { Billing } from "../../../store/type";

import { IconSecurePaymentFill } from "../../navigation/NavLinkProps";

const BillingStatusTable: React.FC<{ data: Billing[]; status: string }> = ({
  data,
  status,
}) => {
  const { dateFormater } = useDateFormater();
  const updateUnpaidAmount = (id: string) => {
    const to_update = data?.find((element: any) => element._id === id);
    console.log(to_update);
  };
  return (
    <div className="w-full">
      <Table className="w-full overflow-hidden shadow-md rounded-md">
        <Table.Head className="text-sm text-slate-900 ">
          {BILLING_STATUS_COLUMN.map((col, index) => (
            <Table.HeadCell className="px-3 py-2 bg-gray-200" key={index}>
              {col}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((row: Billing, index: number) => (
            <Table.Row
              className="bg-white dark:border-gray-700 dark:bg-gray-800 text-sm text-slate-900"
              key={index}
            >
              <Table.Cell className="px-3 py-2">
                {row.customer?.name + " " + row.customer?.last_name}
              </Table.Cell>
              <Table.Cell className="px-3 py-2">
                {row.customer?.contact}
              </Table.Cell>
              <Table.Cell className="px-3 py-2">
                {row.customer?.email}
              </Table.Cell>
              <Table.Cell className="px-3 py-2">
                {row.customer?.address}
              </Table.Cell>

              <Table.Cell className="px-3 py-2">{row.gst_amount}</Table.Cell>
              <Table.Cell className="px-3 py-2">{row.total_amount}</Table.Cell>
              <Table.Cell className="px-3 py-2">{row.unpaid_amount}</Table.Cell>
              <Table.Cell className="px-3 py-2">
                {dateFormater(row.createdAt ?? "")}
              </Table.Cell>
              <Table.Cell className="px-3 py-2">
                <button
                  onClick={() => updateUnpaidAmount(row._id ?? "")}
                  disabled={status === "Paid"}
                  className="font-medium text-blue-600 dark:text-red-500 hover:underline"
                >
                  <IconSecurePaymentFill />
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

gst_amount: 1524;
total_amount: 10000;
unpaid_amount: 5000;

export default BillingStatusTable;
