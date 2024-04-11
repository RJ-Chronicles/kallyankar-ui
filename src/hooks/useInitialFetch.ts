import { useEffect } from "react";
import { getAmphereList } from "../backend/amphere";
import { getBatteryList } from "../backend/battery";
import { getGSTList } from "../backend/gst";
import { useAuthContext } from "../context/AuthContext";
import useAppContext from "./useAppContext";

const useInitialFetch = () => {
  const auth = useAuthContext();
  const isLoggedIn = auth?.isLoggedIn ?? false;

  const { dispatch, state } = useAppContext();
  const { hasFetched } = state;

  useEffect(() => {
    (async () => {
      if (!hasFetched && isLoggedIn) {
        try {
          dispatch({ type: "SET_LOADING", payload: true });
          const amphere = await getAmphereList();
          const gst = await getGSTList();
          const battery = await getBatteryList();
          dispatch({ type: "ADD_AMPHERE_VALUES", payload: amphere });
          dispatch({ type: "ADD_BATTERY_NAMES", payload: battery });
          dispatch({ type: "ADD_GST_VALUES", payload: gst });
          dispatch({ type: "HAS_INITIAL_FETCHED", payload: true });
          dispatch({ type: "SET_LOADING", payload: false });
        } catch (error) {
          dispatch({ type: "SET_LOADING", payload: false });
          let message = "ERROR OCCURED!";
          if (error instanceof Error) {
            message = error.message;
          }
          dispatch({ type: "SET_ERROR", payload: { hasError: true, message } });
        }
      }
    })();
  }, [hasFetched, isLoggedIn]);
};

export default useInitialFetch;
