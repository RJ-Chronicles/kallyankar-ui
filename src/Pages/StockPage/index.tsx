import * as React from "react";
import { getStockList } from "../../backend/stock";
import ButtonHeader from "../../components/UI/Button/ButtonHeader";
import StockTable from "../../components/UI/Table/StockTable";
import { useApiCall, useAppContext } from "../../hooks";
import { STOCK } from "../../store/type";

const Stock = () => {
  const { state, dispatch } = useAppContext();

  const { refreshEffect } = state;

  const params = React.useMemo(() => {
    return { refreshEffect };
  }, [refreshEffect]);

  const { data } = useApiCall(getStockList, params);

  const addRecordFormHandler = () => {
    const stock: STOCK = {
      battery_name: "",
      product_code: "",
      amphere_size: "",
      available: "0",
    };
    dispatch({
      type: "SET_FORM_PROPS",
      payload: {
        data: stock,
        mode: "ADD_RECORD",
        type: "STOCK",
      },
    });
    dispatch({ type: "HIDE_SHOW_FORM", payload: true });
  };

  return (
    <div className="w-full">
      <div className=" bg-gradient-to-r from-cyan-500 to-blue-500 text-white md:pt-16 pt-10 ">
        <h1 className="text-center mt-0 mb-2 text-5xl font-medium leading-tight text-primary">
          Stock Analysis
        </h1>
        <p className="text-center font-normal text-xl">
          Stock analysis and screening tool for Kalyankar Batteries.
        </p>
        <div className="relative max-w-xl mx-auto my-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="gray"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg outline-none  block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for product"
            required
          />
        </div>
        <div className="flex justify-start space-x-6">
          <ButtonHeader buttonClick={addRecordFormHandler} />
        </div>
      </div>
      {data && <StockTable data={data} />}
    </div>
  );
};

export default Stock;
