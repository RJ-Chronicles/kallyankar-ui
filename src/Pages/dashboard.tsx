import AppContext from "../store/AppContext";
import { useContext } from "react";
const Dashboard = () => {
  const { state } = useContext(AppContext);
  console.log(state);
  return (
    <div className="w-full flex items-center justify-center">
      This is the DashboardThis is the DashboardThis is the DashboardThis is the
      Dashboard;
    </div>
  );
};

export default Dashboard;
