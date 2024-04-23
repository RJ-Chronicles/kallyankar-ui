import useAppContext from "../../hooks/useAppContext";
import { useMemo, useState } from "react";
import useApiCall from "../../hooks/useApiCall";
import { getBillingListByStatus } from "../../backend/billing";
import BillingStatusTable from "../../components/UI/Table/BillingStatusTable";
import SelectStatuRadio from "./SelectStatusRadio";
const BillStatusPage = () => {
  const { state } = useAppContext();
  const [status, setStatus] = useState("Unpaid");
  const { refreshEffect } = state;
  const params = useMemo(() => {
    return { refreshEffect, status };
  }, [refreshEffect, status]);
  const { data } = useApiCall(getBillingListByStatus, params);

  return (
    <div className="w-full">
      <SelectStatuRadio setStatus={setStatus} status={status} />
      {data && <BillingStatusTable data={data} status={status} />}
    </div>
  );
};

export default BillStatusPage;
