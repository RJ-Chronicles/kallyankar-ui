import CustomerTable from "../../components/UI/Table/CustomerTable";

import { useEffect, useState } from "react";
import { customer, CustomerApiParam, Customer } from "../../store/type";

import useAppContext from "../../hooks/useAppContext";
import ButtonHeader from "../../components/UI/Button/ButtonHeader";
import SearchBox from "../../components/UI/SearchBox";
import axios from "axios";
import { useAnimation } from "../../hooks";

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
    <div className="w-full">
      <div className="flex justify-center items-center space-x-6 mx-5">
        <ButtonHeader buttonClick={addRecordFormHandler} />
        <h1>
          Kalyankar Batteries{" "}
          <strong className="text-xl text-blue-700">Customer details</strong>
        </h1>
      </div>

      <div className="m-5">
        <div className="flex justify-end space-x-6">
          <input
            className={
              " rounded-sm w-full  px-4 bg-white text-sm text-slate-500 h-12 border-2  border-slate-100 placeholder:text-center md:text-left placeholder:md:text-left focus:outline-none focus:shadow-xl focus:border-blue-300"
            }
            type="text"
            placeholder={"Search record based on name/contact"}
            required
            onChange={handleSearchInputChange}
            value={val}
          />
          <button
            onClick={handleResetInput}
            className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {" "}
            Reset
          </button>
        </div>

        {customers && <CustomerTable data={customers} />}
        <div className="mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`mx-1 py-2 px-3 rounded ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
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
