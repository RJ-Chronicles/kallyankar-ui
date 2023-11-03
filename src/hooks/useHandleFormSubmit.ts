import { UserFormData, RequestConfig } from "../store/type";
import useResponseValidator from "./useResponseValidator";
import useAxiosRequest from "./useAxiosRequest";
import AppContext from "../store/AppContext";
import { useContext, useEffect } from "react";

const useHandleFormSubmit = () => {
  const { error, validator, setError } = useResponseValidator();
  const { axiosRequest } = useAxiosRequest();
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    if (error) {
      dispatch({
        type: "TOGGLE_SNACKBAR",
        payload: {
          isOpen: true,
          message: "Enter all required fields",
          severity: "error",
        },
      });
      setError(false);
    }
  }, [error]);

  const handleSubmit = async (
    data: UserFormData,
    requestMeta: RequestConfig
  ) => {
    const hasError = validator(data);

    if (hasError) {
      return;
    }

    const res = await axiosRequest({
      url: requestMeta.url,
      request: requestMeta.method,
      LOADING_TYPE: "Login",
      body: data,
    });
    if (res === undefined) {
      throw new Error("Could not complete the request");
    }
    dispatch({
      type: "TOGGLE_SNACKBAR",
      payload: {
        isOpen: true,
        message: requestMeta.success,
        severity: "success",
      },
    });
    return res;
  };

  return { handleSubmit };
};

export default useHandleFormSubmit;
