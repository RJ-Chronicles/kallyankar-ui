import { useState } from "react";
import { UserFormData } from "../store/type";

const useResponseValidator = () => {
  const [error, setError] = useState(false);

  const validator = (data: UserFormData) => {
    const values = Object.values(data);
    const hasError = values.some((element) => element.trim().length === 0);
    setError((prevError) => {
      return hasError;
    });
    return hasError;
  };

  return { error, validator, setError };
};

export default useResponseValidator;
