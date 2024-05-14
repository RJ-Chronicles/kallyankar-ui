import { Edit, Edit2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAppContext from "../../../hooks/useAppContext";
import useDateFormater from "../../../hooks/useDateFormater";
import { Customer, STOCK } from "../../../store/type";
import { CUSTOMER_TABLE_COLUMN } from "./columns";

type CustomerTableProps = {
  data: STOCK[];
};

const StockTable: React.FC<CustomerTableProps> = ({ data }) => {
  const { dateFormater } = useDateFormater();
  const { dispatch } = useAppContext();

  const editStockHandler = (id: string) => {
    const record = data.find((item) => item._id === id);
    console.log(record);
    if (record) {
      dispatch({
        type: "SET_FORM_PROPS",
        payload: {
          data: record,
          mode: "UPDATE_RECORD",
          type: "STOCK",
          title: "Update Stock Record",
        },
      });
      dispatch({ type: "HIDE_SHOW_FORM", payload: true });
    }
  };

  return (
    <>
      <div className="relative  shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left text-gray-700 tracking-wider">
          <thead className="text-xs md:text-sm text-gray-800 uppercase bg-gray-200 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Battery Name
              </th>
              <th scope="col" className="px-6 py-3">
                Product Code
              </th>
              <th scope="col" className="px-6 py-3">
                Amphere Size
              </th>
              <th scope="col" className="px-6 py-3">
                Available
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll w-full max-h-60">
            {data.map((row: STOCK, index: number) => (
              <tr
                key={index}
                className="bg-white border-b text-sm text-slate-700 font-normal hover:bg-gray-50 "
              >
                <Link to={`/stock/${row._id}`}>
                  <td className="px-6 py-4">{row.battery_name}</td>
                </Link>

                <td className="px-6 py-4">{row.product_code}</td>
                <td className="px-6 py-4">{row.amphere_size}</td>

                <td className="px-6 py-4">
                  <span>{row.available}</span>
                </td>

                <td className="flex items-center px-4 py-4 space-x-2">
                  <button
                    onClick={() => editStockHandler(row._id ?? "")}
                    name={row._id}
                    className="font-medium text-blue-600 dark:text-red-500 hover:underline"
                  >
                    <Edit2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StockTable;
