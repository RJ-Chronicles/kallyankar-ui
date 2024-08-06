import { Edit3 } from "lucide-react";
import { Link } from "react-router-dom";
import useAppContext from "../../../hooks/useAppContext";
import useDateFormater from "../../../hooks/useDateFormater";
import { Product } from "../../../store/type";
import Nothing from "../Nothing";
import { BATTERY_TABLE_COLUMN } from "./columns";

type ProductTableProps = {
  data: Product[];
};

const FlowTable: React.FC<ProductTableProps> = ({ data }) => {
  const { dateFormater } = useDateFormater();
  const { dispatch } = useAppContext();

  const editCustomerProduct = (id: string) => {
    const record = data.find((item) => item._id === id);
    if (record) {
      dispatch({
        type: "SET_FORM_PROPS",
        payload: {
          data: record,
          mode: "UPDATE_RECORD",
          type: "PRODUCT",
        },
      });
      dispatch({ type: "HIDE_SHOW_FORM", payload: true });
    }
  };

  return (
    <div className="w-full overflow-hidden shadow-md rounded-md">
      {data.length < 1 ? (
        <Nothing
          heading="No Record"
          subHeading="Please add records to see..."
        />
      ) : (
        <table className="table-auto w-full">
          <thead className="bg-gray-200">
            <tr>
              {BATTERY_TABLE_COLUMN.map((col, index) => (
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
          <tbody className="bg-white divide-y divide-gray-200 text-sm">
            {data.map((row: Product, index: number) => (
              <tr key={index}>
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3">
                  {row.vehicle_name ?? ""} {row.vehicle_number ?? "-"}
                </td>
                <td className="px-4 py-3">{row.type}</td>
                <td className="px-4 py-3">{row.serial_number}</td>
                <td className="px-4 py-3">{row.price}</td>
                <td className="px-4 py-3">
                  {dateFormater(row.createdAt ?? "")}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => editCustomerProduct(row._id ?? "")}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                  >
                    <Edit3 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FlowTable;
