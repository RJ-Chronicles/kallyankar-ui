import CustomerTable from "../../components/UI/Table/CustomerTable";

import { useEffect, useState } from "react";
import { customer, CustomerApiParam, Customer } from "../../store/type";

import useAppContext from "../../hooks/useAppContext";
import axios from "axios";
import { useAnimation } from "../../hooks";
import ButtonHeader from "../../components/UI/Button/ButtonHeader";

const CustomerPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [val, setVal] = useState("");

  const limit = 10;
  const { spinnerAnimationStart, spinnerAnimationStop } = useAnimation();
  useEffect(() => {
    const fetchCustomers = async () => {
      spinnerAnimationStart();
      try {
        const params: CustomerApiParam = {
          page: currentPage,
          limit: limit,
          sortBy: "updatedAt",
          sortOrder: "desc",
          search: searchTerm,
        };
        const response = await axios.get(
          "https://kallyankar-api-service.onrender.com/customer/customer-all",
          {
            params,
          }
        );
        setCustomers(response.data.customers);
        setTotalPages(response.data.totalPages);
        spinnerAnimationStop();
      } catch (error) {
        spinnerAnimationStop();
      }
    };

    fetchCustomers();
  }, [searchTerm, currentPage]); // Trigger useEffect when searchTerm or currentPage changes

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
        console.log("else part");
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

  const { state, dispatch } = useAppContext();
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
      <div className="bg-indigo-600 p-6 md:p-10 shadow-md animate-fadeIn">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center space-y-4 md:space-y-0 md:space-x-6 mx-5">
          <div>
            <ButtonHeader title="Add New" buttonClick={addRecordFormHandler} />
          </div>
          <div className="text-center md:text-left">
            <h1 className="font-sans tracking-wider text-3xl md:text-2xl font-bold text-white animate-slideIn leading-tight">
              Kalyankar Batteries
            </h1>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-end space-y-4 md:space-y-0 md:space-x-4 mt-6 animate-fadeInUp">
          <input
            className="rounded-md w-full md:w-auto tracking-wider px-4 py-2 text-sm text-gray-700 h-12 border-2 border-gray-300 placeholder-center focus:outline-none focus:shadow-lg focus:border-indigo-400 transition-all"
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

      <div className="p-6 md:p-10 bg-white  rounded-lg mt-6 animate-fadeIn">
        {customers && <CustomerTable data={customers} />}
        <div className="mt-4 flex justify-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`mx-1 py-2 px-4 rounded-lg transition-all ${
                currentPage === page
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } animate-bounce`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
