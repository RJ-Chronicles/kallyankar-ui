import { useState } from "react";
import usePagination from "../../../hooks/usePagination";
import { BATTERY_TABLE_COLUMN } from "./columns";
import Table from "./Table";
import { Pagination } from "@mui/material";
import { Product } from "../../../store/type";

const CustomerBatteryTable: React.FC<{ data: Product[] }> = ({ data }) => {
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
      <Table column={BATTERY_TABLE_COLUMN}>
        {_DATA.currentData().map((element: Product, index) => (
          <tr
            key={index}
            className="bg-white border-b text-sm text-slate-700 font-base hover:bg-gray-50"
          >
            <td className="px-3 py-4">{element.name}</td>
            <td className="px-3 py-4">{element.vehicle_number}</td>
            <td className="px-3 py-4">{element.type}</td>
            <td className="px-3 py-4">{element.serial_number}</td>
            <td className="px-3 py-4">{element.price}</td>
            <td className="px-3 py-4">Action</td>
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

export default CustomerBatteryTable;
