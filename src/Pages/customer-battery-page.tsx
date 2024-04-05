import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { getProductByCustomerId } from "../backend/product";
import PageWrapper from "../components/UI/Page";
import CustomerBatteryTable from "../components/UI/Table/CustomerBatteryTable";
import useApiCall from "../hooks/useApiCall";
import useAppContext from "../hooks/useAppContext";
import { product } from "../store/type";

const CustomerBatteryPage = () => {
  let { customerId } = useParams();
  const { state } = useAppContext();
  const { refreshEffect } = state;
  const params = useMemo(() => {
    return { refreshEffect, id: customerId ?? "" };
  }, []);

  const { data } = useApiCall(getProductByCustomerId, params);
  const { dispatch } = useAppContext();
  return (
    <PageWrapper>
      <div>
        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              dispatch({
                type: "SET_FORM_PROPS",
                payload: {
                  data: product,
                  mode: "ADD_RECORD",
                  type: "PRODUCT",
                },
              });
              dispatch({ type: "HIDE_SHOW_FORM", payload: true });
            }}
            className="flex space-x-2 bg-[#600080] hover:bg-[#8031a7] text-sm text-white font-medium py-2 px-10 border-b-4 border-[#8031a7] rounded-full my-10 "
          >
            <span>Add</span>
            <span>NEW</span>
          </button>
        </div>
        {data && <CustomerBatteryTable data={data} />}
      </div>
    </PageWrapper>
  );
};

export default CustomerBatteryPage;
