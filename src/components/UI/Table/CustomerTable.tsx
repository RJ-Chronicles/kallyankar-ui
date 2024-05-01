import { Edit } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAppContext from "../../../hooks/useAppContext";
import useDateFormater from "../../../hooks/useDateFormater";
import { Customer } from "../../../store/type";
import { CUSTOMER_TABLE_COLUMN } from "./columns";

type CustomerTableProps = {
  data: Customer[];
};

const CustomerTable: React.FC<CustomerTableProps> = ({ data }) => {
  const { dateFormater } = useDateFormater();
  const { dispatch } = useAppContext();

  const editCustomerHandler = (id: string) => {
    const record = data.find((item) => item._id === id);
    if (record) {
      dispatch({
        type: "SET_FORM_PROPS",
        payload: {
          data: record,
          mode: "UPDATE_RECORD",
          type: "CUSTOMER",
          title: "Update Customer Record",
        },
      });
      dispatch({ type: "HIDE_SHOW_FORM", payload: true });
    }
  };

  return (
    <div className="w-full overflow-hidden shadow-md rounded-md">
      <table className="table-auto w-full">
        <thead className="bg-gray-200 ">
          <tr>
            {CUSTOMER_TABLE_COLUMN.map((col, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row: Customer, index: number) => (
            <tr
              key={index}
              className=" dark:border-gray-700 dark:bg-gray-800 text-sm text-slate-900"
            >
              <td className="px-3 py-2">
                <Link
                  to={`/admin/customers/${row._id}`}
                  className="hover:underline"
                >
                  {row.name + " " + row.last_name}
                </Link>
              </td>
              <td className="px-3 py-2">{row.address}</td>
              <td className="px-3 py-2">{row.email}</td>
              <td className="px-3 py-2">{row.contact}</td>
              <td className="px-3 py-2">{row.gst_number}</td>
              <td className="px-3 py-2">{dateFormater(row.createdAt ?? "")}</td>
              <td className="px-3 py-2">
                <button
                  onClick={() => editCustomerHandler(row._id ?? "")}
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

export default CustomerTable;
