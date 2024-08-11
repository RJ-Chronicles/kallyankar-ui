import CustomerTable from "../../components/UI/Table/CustomerTable";

import { useEffect, useState } from "react";
import { customer, CustomerApiParam, Customer } from "../../store/type";

import useAppContext from "../../hooks/useAppContext";
import axios from "axios";
import { useAnimation } from "../../hooks";
import ButtonHeader from "../../components/UI/Button/ButtonHeader";
import TitleScreen from "../../components/UI/TitleScreen";

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
