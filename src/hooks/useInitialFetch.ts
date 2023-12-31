import { amphereAllRequest } from "../api/amphere";
import { GSTAllRequest } from "../api/gst";
import { batteryAllRequest } from "../api/battery";
import useAxiosRequest from "./useAxiosRequest";
import {
  AmphareSize,
  BatteryNameValues,
  GSTValues,
  Operation,
  RequestConfig,
} from "../store/type";
import AppContext from "../store/AppContext";
import { useContext } from "react";
import { Dispatch } from "../store";
import { snackBarSuccessMessage } from "../api";
const useInitalFetch = () => {
  const { axiosRequest } = useAxiosRequest();
  const { dispatch } = useContext(AppContext);

  const fetchOnetimeItems = (operation: Operation) => {
    switch (operation) {
      case "ALL":
        {
          amphereFetch(amphereAllRequest, axiosRequest, dispatch);
          batteryListeFetch(batteryAllRequest, axiosRequest, dispatch);
          gstListFetch(GSTAllRequest, axiosRequest, dispatch);
        }
        break;
      case "AMPHERE":
        {
          amphereFetch(amphereAllRequest, axiosRequest, dispatch);
        }
        break;
      case "BATTERY_LIST":
        {
          batteryListeFetch(batteryAllRequest, axiosRequest, dispatch);
        }
        break;
      case "GST": {
        gstListFetch(GSTAllRequest, axiosRequest, dispatch);
      }
    }
  };
  return {
    fetchOnetimeItems,
  };
};
export default useInitalFetch;

const amphereFetch = async (
  amphereAllRequest: RequestConfig,
  axiosRequest: any,
  dispatch: Dispatch
) => {
  const response: AmphareSize[] = await axiosRequest({
    request: amphereAllRequest.method,
    url: amphereAllRequest.url,
    headers: amphereAllRequest.headers,
  });
  if (response) {
    dispatch({
      type: "TOGGLE_SNACKBAR",
      payload: {
        isOpen: true,
        message: snackBarSuccessMessage.Fetch,
        severity: "success",
      },
    });
    dispatch({
      type: "ADD_AMPHERE_VALUES",
      payload: response,
    });
  }
  return response;
};

const batteryListeFetch = async (
  batteryAllRequest: RequestConfig,
  axiosRequest: any,
  dispatch: Dispatch
) => {
  const response: BatteryNameValues[] = await axiosRequest({
    request: batteryAllRequest.method,
    url: batteryAllRequest.url,
    headers: batteryAllRequest.headers,
  });
  if (response) {
    dispatch({
      type: "TOGGLE_SNACKBAR",
      payload: {
        isOpen: true,
        message: snackBarSuccessMessage.Fetch,
        severity: "success",
      },
    });
    dispatch({
      type: "ADD_BATTERY_NAMES",
      payload: response,
    });
  }
  return response;
};

const gstListFetch = async (
  GSTAllRequest: RequestConfig,
  axiosRequest: any,
  dispatch: Dispatch
) => {
  const response: GSTValues[] = await axiosRequest({
    request: GSTAllRequest.method,
    url: GSTAllRequest.url,
    headers: GSTAllRequest.headers,
  });
  if (response) {
    dispatch({
      type: "TOGGLE_SNACKBAR",
      payload: {
        isOpen: true,
        message: snackBarSuccessMessage.Fetch,
        severity: "success",
      },
    });
    dispatch({
      type: "ADD_GST_VALUES",
      payload: response,
    });
  }
  return response;
};
