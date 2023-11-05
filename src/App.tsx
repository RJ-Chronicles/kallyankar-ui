import React from "react";

import AppContext from "./store/AppContext";
import { useContext } from "react";
import KallyankarRoute from "./components/navigation/KallyankarRoute";
import Layout from "./components/navigation/Layout";
import ErrorModal from "./components/UI/ErrorModal";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import DeleteModal from "./components/UI/DeleteModal";
import CustomizedSnackbar from "./components/UI/Snackbar";

function App() {
  const { state, dispatch } = useContext(AppContext);
  const { isDeleteModalVisible, deleteModalFormProps, isLoading, error } =
    state;
  const { isLoggedIn } = state.loggedIn;
  return (
    <Layout>
      <LoadingSpinner open={isLoading} color="#FFFFFF">
        <ErrorModal open={false} errorMessage={error.message}>
          <CustomizedSnackbar
            open={state.snackbar.isOpen}
            message={state.snackbar.message}
            severty={state.snackbar.severity}
          >
            <DeleteModal
              open={isDeleteModalVisible}
              data={deleteModalFormProps}
            >
              <KallyankarRoute isLoggedIn={true} />
            </DeleteModal>
          </CustomizedSnackbar>
        </ErrorModal>
      </LoadingSpinner>
    </Layout>
  );
}

export default App;
