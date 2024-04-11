import AppContext from "../store/AppContext";
import { useContext, useEffect } from "react";
const Dashboard = () => {
  const { state, dispatch } = useContext(AppContext);

  return <div className="w-full flex items-center justify-center">haello</div>;
};

export default Dashboard;
