import AppContext from "../store/AppContext";
import { useContext, useEffect } from "react";
import useApiSubmit from "../hooks/useSubmitApi";
import { getCustomerList } from "../backend/customer";
const Dashboard = () => {
  const { state, dispatch } = useContext(AppContext);

  // const { submitApi } = useApiSubmit();
  // submitApi(async () => {
  //   const data = await getCustomerList();
  //   console.log(data);
  // });

  return <div className="w-full flex items-center justify-center">haello</div>;
};

export default Dashboard;
