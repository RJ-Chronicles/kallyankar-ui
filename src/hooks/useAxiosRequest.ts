import axios, { AxiosResponse } from "axios";
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
    LOADING_TYPE,
    body,
    headers,
    request,
  }: requestConfig) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      let response: AxiosResponse<any, any>;
      switch (request) {
        case "POST" || "PATCH":
          console.log("POST request");
          response = await axios.post(url, body);
          break;
        case "GET" || "DELETE":
          response = await axios.get(url, headers);
          break;
        default:
          throw new Error("Invalid request type");
      }
      const data = await response.data;
      // dispatch({ type: "SET_LOADING", payload: false });
      return data;
    } catch (err) {
      // dispatch({ type: "SET_LOADING", payload: false });
      console.log(err);
      dispatch({
        type: "SET_ERROR",
        payload: {
          hasError: true,
          message: `Error occured while loading ${LOADING_TYPE}`,
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
