import AppContext from "../../store/AppContext";
import { useContext } from "react";
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
