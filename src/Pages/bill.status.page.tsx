import BillingStatusTable from "../components/UI/Table/BillingStatusTable";
import PageWrapper from "../components/UI/Page";
const BillStatusPage = () => {
  return (
    <PageWrapper>
      <p>BillStatusPage Paid Unpaid records</p>
      <BillingStatusTable />
    </PageWrapper>
  );
};

export default BillStatusPage;
