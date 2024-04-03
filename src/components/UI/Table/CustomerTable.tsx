import Table from "./Table";
import { CUSTOMER_TABLE_COLUMN } from "./columns";
import usePagination from "../../../hooks/usePagination";
import { Pagination } from "@mui/material";
import { useState } from "react";

import { Customer } from "../../../store/type";
import useDateFormater from "../../../hooks/useDateFormater";

const CustomerTable: React.FC<{ data: Customer[] }> = ({ data }) => {
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);

  const handleChange = (e: React.ChangeEvent<unknown>, p: any) => {
    setPage(p);
    _DATA.jump(p);
  };

  const { dateFormater } = useDateFormater();

  return (
    <div>
      <h1 className="text-center">Customer Table</h1>
      <Table column={CUSTOMER_TABLE_COLUMN}>
        {_DATA.currentData().map((element: Customer, index) => (
          <tr
            key={index}
            className="bg-white border-b text-sm text-slate-700 font-base hover:bg-gray-50"
          >
            <td className="px-3 py-4">
              <div className="flex items-center mb-4">
                <input
                  id="default-radio-1"
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </td>
            <td className="px-3 py-4">
              {element.last_name + " " + element.name}
            </td>
            <td className="px-3 py-4">{element.address}</td>
            <td className="px-3 py-4">{element.email}</td>
            <td className="px-3 py-4">{element.contact}</td>
            <td className="px-3 py-4">{element.gst_number}</td>
            <td className="px-3 py-4">
              {dateFormater(element?.createdAt ?? "")}
            </td>
          </tr>
        ))}
      </Table>
      <div className="flex justify-center items-center my-5 py-2 bg-white text-white">
        <Pagination
          count={count}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default CustomerTable;
