import Table from "./Table";
import { CUSTOMER_TABLE_COLUMN } from "./columns";
import usePagination from "../../../hooks/usePagination";
import { Pagination } from "@mui/material";
import { useState } from "react";
import data from "./Mock_data.json";
const CustomerTable = () => {
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);

  const handleChange = (e: React.ChangeEvent<unknown>, p: any) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <div>
      <h1 className="text-center">Customer Table</h1>
      <Table column={CUSTOMER_TABLE_COLUMN}>
        {_DATA.currentData().map((element, index) => (
          <tr
            key={index}
            className="bg-white border-b text-sm text-slate-700 font-base hover:bg-gray-50"
          >
            <td className="px-3 py-4">{element.name}</td>
            <td className="px-3 py-4">{element.c_name}</td>
            <td className="px-3 py-4">{element.add}</td>
            <td className="px-3 py-4">{element.email}</td>
            <td className="px-3 py-4">{element.contact}</td>
            <td className="px-3 py-4">{element.gst}</td>
            <td className="px-3 py-4">{element.reg_data}</td>
            <td className="px-3 py-4">{element.action}</td>
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
