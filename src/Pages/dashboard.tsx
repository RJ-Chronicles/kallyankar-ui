import AppContext from "../store/AppContext";
import { useContext, useEffect } from "react";
import { getAmphereList } from "../backend/amphere";
import { getBatteryList } from "../backend/battery";
import { getGSTList } from "../backend/gst";
const Dashboard = () => {
  const { state, dispatch } = useContext(AppContext);
  const { hasFetched } = state;
  useEffect(() => {
    (async () => {
      if (!hasFetched) {
        const amphere = await getAmphereList();
        const gst = await getGSTList();
        const battery = await getBatteryList();

        dispatch({ type: "ADD_AMPHERE_VALUES", payload: amphere });
        dispatch({ type: "ADD_BATTERY_NAMES", payload: battery });
        dispatch({ type: "ADD_GST_VALUES", payload: gst });
        dispatch({ type: "HAS_INITIAL_FETCHED", payload: true });
      }
    })();
  }, [hasFetched]);

  return (
    <div className="w-full flex items-center justify-center">
      This is the DashboardThis is the DashboardThis is the DashboardThis is the
      Dashboard;
    </div>
  );
};

export default Dashboard;
