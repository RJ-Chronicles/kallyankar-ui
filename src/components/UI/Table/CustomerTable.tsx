"use client";

import { Table } from "flowbite-react";
import useAppContext from "../../../hooks/useAppContext";
import { Customer } from "../../../store/type";
import { CUSTOMER_TABLE_COLUMN } from "./columns";
import useDateFormater from "../../../hooks/useDateFormater";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";

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
    <div className="">
      <Table className="w-full overflow-hidden">
        <Table.Head>
          {CUSTOMER_TABLE_COLUMN.map((col, index) => (
            <Table.HeadCell className="px-3 py-2" key={index}>
              {col}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((row: Customer, index: number) => (
            <Table.Row
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              key={index}
            >
              <Table.Cell className="px-3 py-2">
                <Link to={`/admin/customers/${row._id}`}>
                  {row.name + " " + row.last_name}
                </Link>
              </Table.Cell>
              <Table.Cell className="px-3 py-2">{row.address}</Table.Cell>
              <Table.Cell className="px-3 py-2">{row.email}</Table.Cell>
              <Table.Cell className="px-3 py-2">{row.contact}</Table.Cell>
              <Table.Cell className="px-3 py-2">{row.gst_number}</Table.Cell>
              <Table.Cell className="px-3 py-2">
                {dateFormater(row.createdAt ?? "")}
              </Table.Cell>
              <Table.Cell className="px-3 py-2">
                <button
                  onClick={() => editCustomerHandler(row._id ?? "")}
                  className="font-medium text-blue-600 dark:text-red-500 hover:underline"
                >
                  <Edit />
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default CustomerTable;
