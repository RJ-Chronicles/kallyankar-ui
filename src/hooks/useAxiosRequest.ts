import axios, { AxiosResponse, AxiosError } from "axios";
import { useContext } from "react";
import AppContext from "../store/AppContext";
import { Headers, Request } from "../store/type";

interface requestConfig {
  url: string;
  LOADING_TYPE: string;
  body?: any;
  headers?: Headers;
  request: Request;
}
const useAxiosRequest = () => {
  const { dispatch } = useContext(AppContext);
  const axiosRequest = async ({
    url,
    body,
    headers,
    request,
  }: requestConfig) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      let response: AxiosResponse<any, any>;
      switch (request) {
        case "POST" || "PATCH":
          response = await axios.post(url, body, headers);
          break;
        case "GET" || "DELETE":
          response = await axios.get(url, headers);
          break;
        default:
          throw new Error("Invalid request type");
      }

      return response.data;
    } catch (err: any) {
      console.log(err);
      const errorMsg = err.response?.data?.message
        ? err?.response?.data?.message
        : err.code === "ERR_NETWORK"
        ? "Check you Network connection and try again"
        : "Something went wrong! Please try again later";
      dispatch({
        type: "TOGGLE_SNACKBAR",
        payload: {
          isOpen: true,
          message: errorMsg,
          severity: "error",
        },
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return {
    axiosRequest,
  };
};

export default useAxiosRequest;
