import CustomerTable from "../../components/UI/Table/CustomerTable";

import { useMemo, useState } from "react";
import { customer } from "../../store/type";

import useAppContext from "../../hooks/useAppContext";
import { useApiCall } from "../../hooks";
import TitleScreen from "../../components/UI/TitleScreen";
import { getCustomerList } from "../../backend/customer";
import Pagination from "./Pagination";
const CustomerPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [val, setVal] = useState("");
  const {
    state: { refreshEffect },
    dispatch,
  } = useAppContext();

  const limit = 10;
  const params = useMemo(() => {
    return {
      refreshEffect,
      page: currentPage,
      limit,
      search: searchTerm,
      sortBy: "updatedAt",
      sortOrder: "desc",
    };
  }, [currentPage, limit, searchTerm, refreshEffect]);

  const { data } = useApiCall(getCustomerList, params);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = event.target.value;
    setVal(val);
    setTimeout(() => {
      if (!isNaN(+val)) {
        if (val.length === 10) {
          setSearchTerm(val);
          setCurrentPage(1);
        }
      } else {
        setSearchTerm(val);
        setCurrentPage(1);
      }
    }, 2000);
  };

  const handleResetInput = () => {
    setSearchTerm("");
    setVal("");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const addRecordFormHandler = () => {
    dispatch({
      type: "SET_FORM_PROPS",
      payload: {
        data: customer,
        mode: "ADD_RECORD",
        type: "CUSTOMER",
      },
    });
    dispatch({ type: "HIDE_SHOW_FORM", payload: true });
  };
  return (
    <div className="w-full bg-gray-50">
      <TitleScreen
        onAddRecord={() => addRecordFormHandler()}
        pageTitle="Customer details "
      />
      <div className="px-6 animate-fadeIn">
        <div className="flex flex-col md:flex-row justify-end space-y-4 md:space-y-0 md:space-x-4 mt-6 animate-fadeInUp">
          <input
            className="rounded-md w-80 tracking-wide px-4 py-2 text-sm text-gray-700 h-12 border-2 border-gray-300 placeholder-center focus:outline-none focus:shadow-lg focus:border-indigo-400 transition-all"
            type="text"
            placeholder="Search record based on name | contact"
            required
            onChange={handleSearchInputChange}
            value={val}
          />
          <button
            onClick={handleResetInput}
            className="w-full md:w-32 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-all animate-pulse"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="p-6 bg-white  rounded-lg mt-6 animate-fadeIn">
        {data?.customers && <CustomerTable data={data?.customers} />}
        {data && (
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerPage;
