import { batteryRequest, amphereRequest, GSTRequest } from "../api";
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
const useInitalFetch = () => {
  const { axiosRequest } = useAxiosRequest();
  const { dispatch } = useContext(AppContext);

  const fetchOnetimeItems = (token: string, operation: Operation) => {
    batteryRequest.headers.headers.Authorization = token;
    amphereRequest.headers.headers.Authorization = token;
    GSTRequest.headers.headers.Authorization = token;
    switch (operation) {
      case "ALL":
        {
          amphereFetch(amphereRequest, axiosRequest, dispatch);
          batteryListeFetch(batteryRequest, axiosRequest, dispatch);
          gstListFetch(GSTRequest, axiosRequest, dispatch);
        }
        break;
      case "AMPHERE":
        {
          amphereFetch(amphereRequest, axiosRequest, dispatch);
        }
        break;
      case "BATTERY_LIST":
        {
          batteryListeFetch(batteryRequest, axiosRequest, dispatch);
        }
        break;
      case "GST": {
        gstListFetch(GSTRequest, axiosRequest, dispatch);
      }
    }
  };
  return {
    fetchOnetimeItems,
  };
};
export default useInitalFetch;

const amphereFetch = async (
  amphereRequest: RequestConfig,
  axiosRequest: any,
  dispatch: any
) => {
  const response: AmphareSize[] = await axiosRequest({
    request: amphereRequest.method,
    url: amphereRequest.url,
    headers: amphereRequest.headers,
  });
  if (response) {
    dispatch({
      type: "TOGGLE_SNACKBAR",
      payload: {
        isOpen: true,
        message: amphereRequest.success,
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
  batteryRequest: RequestConfig,
  axiosRequest: any,
  dispatch: any
) => {
  const response: BatteryNameValues[] = await axiosRequest({
    request: batteryRequest.method,
    url: batteryRequest.url,
    headers: batteryRequest.headers,
  });
  if (response) {
    dispatch({
      type: "TOGGLE_SNACKBAR",
      payload: {
        isOpen: true,
        message: batteryRequest.success,
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
  GSTRequest: RequestConfig,
  axiosRequest: any,
  dispatch: any
) => {
  const response: GSTValues[] = await axiosRequest({
    request: GSTRequest.method,
    url: GSTRequest.url,
    headers: GSTRequest.headers,
  });
  if (response) {
    dispatch({
      type: "TOGGLE_SNACKBAR",
      payload: {
        isOpen: true,
        message: GSTRequest.success,
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
