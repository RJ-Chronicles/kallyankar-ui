import React, { useState, useEffect } from "react";
import axios from "axios";

import { Customer, CustomerApiParam } from "../../store/type";

const TestPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [val, setVal] = useState("");
  const limit = 10;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const params: CustomerApiParam = {
          page: currentPage,
          limit: limit,
          sortBy: "updatedAt",
          sortOrder: "desc",
          search: searchTerm,
        };
        const response = await axios.get(
          "http://localhost:3001/customer/customer-all",
          {
            params,
          }
        );
        setCustomers(response.data.customers);
        setTotalPages(response.data.totalPages);
      } catch (error) {}
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Customer List</h1>
      <input
        type="text"
        placeholder="Search by name or contact"
        onChange={handleSearchInputChange}
        className="border rounded py-2 px-4 mb-4"
        value={val}
      />
      <ul>
        {customers.map((customer) => (
          <li key={customer._id} className="border-b py-2">
            {customer.name}
          </li>
        ))}
      </ul>
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
  );
};

export default TestPage;
