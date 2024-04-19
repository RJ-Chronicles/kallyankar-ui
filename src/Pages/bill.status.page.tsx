import BillingStatusTable from "../components/UI/Table/BillingStatusTable";
import PageWrapper from "../components/UI/Page";
import { Label, Radio } from "flowbite-react";
import useAppContext from "../hooks/useAppContext";
import { useMemo, useState } from "react";
import useApiCall from "../hooks/useApiCall";
import { getBillingListByStatus } from "../backend/billing";
const BillStatusPage = () => {
  const { state, dispatch } = useAppContext();
  const [status, setStatus] = useState("Unpaid");
  const { refreshEffect } = state;
  const params = useMemo(() => {
    return { refreshEffect, status };
  }, [refreshEffect, status]);
  const { data } = useApiCall(getBillingListByStatus, params);

  return (
    <div>
      <fieldset className="flex max-w-md flex-col gap-4">
        <legend className="mb-4">Choose your favorite country</legend>
        <div className="flex items-center gap-2">
          <Radio id="Paid" name="paid" value="Paid" defaultChecked />
          <Label htmlFor="Paid">United States</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio id="Unpaid" name="unpaid" value="Unpaid" />
          <Label htmlFor="unpaid">Germany</Label>
        </div>
      </fieldset>
      <p>BillStatusPage Paid Unpaid records</p>
      {/* <BillingStatusTable /> */}
    </div>
  );
};

export default BillStatusPage;
