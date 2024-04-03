import React from "react";

import AppContext from "./store/AppContext";
import { useContext } from "react";
import KallyankarRoute from "./components/navigation/KallyankarRoute";
import Layout from "./components/navigation/Layout";
import ErrorModal from "./components/UI/ErrorModal";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import DeleteModal from "./components/UI/DeleteModal";
import CustomizedSnackbar from "./components/UI/Snackbar";
import useToken from "./hooks/useAuthentication";
import useAppContext from "./hooks/useAppContext";

function App() {
  // const { auth } = useToken();
  const { state, dispatch } = useAppContext();
  // if (auth && auth.user) {
  //   const { user } = auth;
  //   dispatch({ type: "USER_LOG_IN", payload: { isLoggedIn: true, user } });
  // }
  const { isDeleteModalVisible, isLoading, error } = state;

  return (
    <Layout>
      <LoadingSpinner open={isLoading} color="#FFFFFF">
        <ErrorModal open={error.hasError} errorMessage={error.message}>
          <CustomizedSnackbar
            open={state.snackbar.isOpen}
            message={state.snackbar.message}
            severty={state.snackbar.severity}
          >
            <DeleteModal open={isDeleteModalVisible}>
              <KallyankarRoute />
            </DeleteModal>
          </CustomizedSnackbar>
        </ErrorModal>
      </LoadingSpinner>
    </Layout>
  );
}

export default App;
