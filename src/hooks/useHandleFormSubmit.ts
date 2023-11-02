import { UserFormData, RequestConfig } from "../store/type";
import useResponseValidator from "./useResponseValidator";
import useAxiosRequest from "./useAxiosRequest";
import AppContext from "../store/AppContext";
import { useContext, useEffect } from "react";

const useHandleFormSubmit = (
  data: UserFormData,
  requestMeta: RequestConfig
) => {
  const { error, validator, setError } = useResponseValidator();
  const { axiosRequest } = useAxiosRequest();
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    if (error) {
      dispatch({
        type: "TOGGLE_SNACKBAR",
        payload: {
          isOpen: true,
          message: requestMeta.error,
          severity: "error",
        },
      });
      setError(false);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasError = validator(data);

    if (hasError) {
      console.log("you can not submit");
      return;
    }
    console.log("You can submit");
    const res = await axiosRequest({
      url: requestMeta.url,
      request: requestMeta.method,
      LOADING_TYPE: "Login",
      body: data,
    });

    dispatch({
      type: "TOGGLE_SNACKBAR",
      payload: {
        isOpen: true,
        message: requestMeta.success,
        severity: "success",
      },
    });
    console.log(res);
  };

  return { handleSubmit };
};

export default useHandleFormSubmit;
