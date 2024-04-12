import { useCallback } from "react";
import useAppContext from "./useAppContext";
import useAnimation from "./useAnimation";

interface ApiCallResult<T> {
  data: T | null;
}

const useApiSubmit = () => {
  const { snackbarAnimation, spinnerAnimationStart, spinnerAnimationStop } =
    useAnimation();
  const { dispatch, state } = useAppContext();
  useAnimation;
  const submitApi = useCallback(
    async <T>(apiFunction: () => Promise<T>): ApiCallResult<T> => {
      try {
        spinnerAnimationStart();
        const response = await apiFunction();
        snackbarAnimation("Response Saved", "success");
        spinnerAnimationStop();
        return response;
      } catch (error) {
        spinnerAnimationStop();
        let error_message = "something went wrong";
        if (error instanceof Error) {
          error_message = error.message;
        }
        dispatch({
          type: "SET_ERROR",
          payload: { hasError: true, message: error_message },
        });
      }
    },
    []
  );
  return { submitApi };
};
export default useApiSubmit;
