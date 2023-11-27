import { useState } from "react";
import usePagination from "../../../hooks/usePagination";
import { STOCK_TABLE_COLUMN } from "./columns";
import Table from "./Table";
import { Pagination } from "@mui/material";
import data from "./Mock_data.json";
import { Pencil, Trash2, Edit3 } from "lucide-react";
const StockTable = () => {
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);

  const handleChange = (e: React.ChangeEvent<unknown>, p: any) => {
    setPage(p);
    _DATA.jump(p);
  };
  return (
    <div className="flex items-center justify-center flex-col w-full">
      <Table column={STOCK_TABLE_COLUMN}>
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
            <td className="flex items-center px-3 py-4 space-x-3">
              <button
                // onClick={handleAddUpdateFormVisibility}
                // name={customer._id}
                className="font-medium text-blue-600 dark:text-red-500 hover:underline"
              >
                <Trash2 color="red" />
              </button>
              <button
                // onClick={handleDeleteModalVisibility}
                // name={customer._id}
                className="font-medium text-red-600 dark:text-red-500 hover:underline"
              >
                <Pencil />
              </button>
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

export default StockTable;
