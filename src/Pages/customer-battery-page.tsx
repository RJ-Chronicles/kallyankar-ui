import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { getProductByCustomerId } from "../backend/product";
import PageWrapper from "../components/UI/Page";
import CustomerBatteryTable from "../components/UI/Table/CustomerBatteryTable";
import useApiCall from "../hooks/useApiCall";
import useAppContext from "../hooks/useAppContext";

const CustomerBatteryPage = () => {
  let { customerId } = useParams();
  const { state } = useAppContext();
  const { refreshEffect } = state;
  const params = useMemo(() => {
    return { refreshEffect, id: customerId ?? "" };
  }, []);

  const { data } = useApiCall(getProductByCustomerId, params);

  return (
    <PageWrapper>
      customer battery page
      {data && <CustomerBatteryTable data={data} />}
    </PageWrapper>
  );
};

export default CustomerBatteryPage;
