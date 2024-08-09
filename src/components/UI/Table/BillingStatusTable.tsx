import { IconSecurePaymentFill } from "../../navigation/NavLinkProps";
import PayUnpaidAmount from "../../../Pages/PaymentPage/PayUnpaidAmount";
import useDateFormater from "../../../hooks/useDateFormater";
import { useState } from "react";
import { Billing } from "../../../store/type";
import { BILLING_STATUS_COLUMN } from "./columns";
import Nothing from "../Nothing";
import { useAppContext } from "../../../hooks";

const BillingStatusTable: React.FC<{ data: Billing[]; status: string }> = ({
  data,
  status,
}) => {
  const { dateFormater } = useDateFormater();
  const [unpaidInfo, setUnpaidInfo] = useState<Billing | undefined>();
  const [showUnpaidModule, setShowUnpaidModule] = useState(false);
  const {
    state: { isLoading },
  } = useAppContext();
  const updateUnpaidAmount = (id: string) => {
    const to_update = data?.find((element: any) => element._id === id);
    setUnpaidInfo(to_update);
    setShowUnpaidModule(true);
  };

  const showNothing = !isLoading && data.length === 0;
  return (
    <div className="w-full overflow-hidden shadow-md rounded-md">
      {showNothing ? (
        <Nothing
          heading="No Record"
          subHeading="Please add records to see..."
        />
      ) : (
        <table className="table-auto w-full ">
          <thead className="bg-gray-200">
            <tr>
              {BILLING_STATUS_COLUMN.map((col, index) => (
                <th
                  key={index}
                  className="px-4 py-2 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
              <th className="px-4 py-2"></th> {/* Empty header for actions */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row: Billing, index: number) => (
              <tr key={index}>
                <td className="px-4 py-3">
                  {row.customer?.name} {row.customer?.last_name}
                </td>
                <td className="px-4 py-3">{row.customer?.contact}</td>
                <td className="px-4 py-3">{row.customer?.email}</td>
                <td className="px-4 py-3">{row.customer?.address}</td>
                <td className="px-4 py-3">{row.gst_amount}</td>
                <td className="px-4 py-3">{row.total_amount}</td>
                <td className="px-4 py-3">{row.unpaid_amount}</td>
                <td className="px-4 py-3">
                  {dateFormater(row.createdAt ?? "")}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => updateUnpaidAmount(row._id ?? "")}
                    disabled={status === "Paid"}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                  >
                    <IconSecurePaymentFill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {unpaidInfo && (
        <PayUnpaidAmount
          data={unpaidInfo}
          show={showUnpaidModule}
          setHide={setShowUnpaidModule}
        />
      )}
    </div>
  );
};

export default BillingStatusTable;
