import TablePagination from "@mui/material/TablePagination";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import useAppContext from "../hooks/useAppContext";
import { useMemo, useState } from "react";
import useApiCall from "../hooks/useApiCall";
import { getBillingListByStatus } from "../backend/billing";
import BillingStatusTable from "../components/UI/Table/BillingStatusTable";
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
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      >
        <FormControlLabel value="Paid" control={<Radio />} label="Paid" />
        <FormControlLabel value="Unpaid" control={<Radio />} label="Unpaid" />
      </RadioGroup>
      {data && <BillingStatusTable data={data} status={status} />}
    </div>
  );
};

export default BillStatusPage;
