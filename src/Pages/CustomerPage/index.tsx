import CustomerTable from "../../components/UI/Table/CustomerTable";

import { useMemo, useState } from "react";
import { customer } from "../../store/type";
import { getCustomerList } from "../../backend/customer";
import useApiCall from "../../hooks/useApiCall";

import useAppContext from "../../hooks/useAppContext";
import ButtonHeader from "../../components/UI/Button/ButtonHeader";
import SearchBox from "../../components/UI/SearchBox";

const CustomerPage = () => {
  const { state, dispatch } = useAppContext();
  const [input, setValue] = useState<string>("");
  const { refreshEffect } = state;
  const params = useMemo(() => {
    return { refreshEffect };
  }, [refreshEffect]);
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
      <SearchBox input={input} setValue={setValue} />

      {data && <CustomerTable data={data} />}
    </div>
  );
};

export default CustomerPage;
