import CustomerTable from "../components/UI/Table/CustomerTable";
import PageWrapper from "../components/UI/Page";
import CustomerForm from "../components/Forms/CustomerForm";

import { useMemo, useState } from "react";
import { customer } from "../store/type";
import { getCustomerList } from "../backend/customer";
import useApiCall from "../hooks/useApiCall";

import useAppContext from "../hooks/useAppContext";
const CustomerPage = () => {
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const { refreshEffect } = useAppContext().state;

  const params = useMemo(() => {
    return { refreshEffect };
  }, []);
  const { data } = useApiCall(getCustomerList, params);
  return (
    <PageWrapper>
      <div>
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowCustomerForm(true)}
            className="flex space-x-2 bg-[#600080] hover:bg-[#8031a7] text-sm text-white font-medium py-2 px-10 border-b-4 border-[#8031a7] rounded-full my-10 "
          >
            <span>Add</span>
            <span>NEW</span>
          </button>
        </div>

        {showCustomerForm && (
          <CustomerForm
            customer={customer}
            showForm={showCustomerForm}
            closeForm={setShowCustomerForm}
          />
        )}
        {data && <CustomerTable data={data} />}
      </div>
    </PageWrapper>
  );
};

export default CustomerPage;
