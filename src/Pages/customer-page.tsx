import CustomerTable from "../components/UI/Table/CustomerTable";
import PageWrapper from "../components/UI/Page";

import { useMemo } from "react";
import { customer } from "../store/type";
import { getCustomerList } from "../backend/customer";
import useApiCall from "../hooks/useApiCall";

import useAppContext from "../hooks/useAppContext";
import ButtonHeader from "../components/UI/Button/ButtonHeader";

const CustomerPage = () => {
  const { state, dispatch } = useAppContext();
  const { refreshEffect } = state;
  const params = useMemo(() => {
    return { refreshEffect };
  }, []);
  const { data } = useApiCall(getCustomerList, params);
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
      <div className="flex justify-start space-x-6">
        <ButtonHeader buttonClick={addRecordFormHandler} />
      </div>
      {data && <CustomerTable data={data} />}
    </div>
  );
};

export default CustomerPage;
