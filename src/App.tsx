import React from "react";

import AppContext from "./store/AppContext";
import { useContext } from "react";
import useAxiosRequest from "./hooks/useAxiosRequest";
import { Customer } from "./store/type";
import { api } from "./api";

import LoginPage from "./Pages/login-page";
import LandingPage from "./Pages/landing-page";
import { Route, Routes } from "react-router-dom";

import ErrorModal from "./components/UI/ErrorModal";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import DeleteModal from "./components/UI/DeleteModal";

function App() {
  const { axiosFetchRequest } = useAxiosRequest();
  const { state, dispatch } = useContext(AppContext);
  const { isDeleteModalVisible, deleteModalFormProps, isLoading, error } =
    state;
  React.useEffect(() => {
    const initialState = async () => {
      const data: Customer[] = await axiosFetchRequest({
        url: api.customer_GET,
        request: "GET",
        LOADING_TYPE: "Customer",
      });
      dispatch({ type: "ADD_CUSTOMER_DATA", payload: data });
      console.log(data);
    };
    initialState();
  }, []);

  console.log(state);
  return (
    <div className="p-4 text-center flex justify-center flex-col items-center">
      <LoadingSpinner open={isLoading} color="#FFFFFF">
        <ErrorModal open={error.hasError} errorMessage={error.message}>
          <DeleteModal open={isDeleteModalVisible} data={deleteModalFormProps}>
            <Routes>
              <Route path="/" element={<LandingPage />}></Route>
              <Route path="/admin-login" element={<LoginPage />} />
              <Route path="/*" element={<LoginPage />} />
            </Routes>
          </DeleteModal>
        </ErrorModal>
      </LoadingSpinner>
    </div>
  );
}

export default App;
