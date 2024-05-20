import { StockItems } from "../../../store/type";
import useDateFormater from "../../../hooks/useDateFormater";
import { Edit } from "lucide-react";
type Props = {
  data: StockItems[];
};

const StockItemTable: React.FC<Props> = ({ data }) => {
  const { dateFormater } = useDateFormater();
  return (
    <div className="relative  shadow-md sm:rounded-lg  ">
      <table className="w-full text-sm text-left text-gray-700 tracking-wider">
        <thead className="text-xs md:text-sm text-gray-800 uppercase bg-gray-200 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Added At
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="overflow-y-scroll w-full max-h-60">
          {data.map((row: StockItems, index: any) => (
            <tr
              key={index}
              className="bg-white border-b text-sm text-slate-700 font-normal hover:bg-gray-50 "
            >
              <td className="px-6 py-4">{row.quantity}</td>
              <td className="px-6 py-4">{dateFormater(row.updatedAt ?? "")}</td>
              <td className="px-6 py-4">
                {" "}
                <button
                  id={row._id}
                  className="font-medium text-blue-600 dark:text-red-500 hover:underline"
                >
                  <Edit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockItemTable;
