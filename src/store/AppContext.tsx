import AppReducer, { Dispatch } from "./index";
import {
  initialAmphere,
  initialBatteryNames,
  initialDeleteModalProps,
  initialFormProps,
  initialGST,
  initialStoredCartItems,
  State,
} from "./type";
import React, { createContext, useReducer } from "react";

const initialState: State = {
  GST: initialGST,
  batteryNames: initialBatteryNames,
  amphere: initialAmphere,
  storedCartItems: initialStoredCartItems,
  deleteModalProps: initialDeleteModalProps,
  formProps: initialFormProps,
  refreshEffect: false,
  isModalVisible: false,
  isDeleteModalVisible: false,
  error: { hasError: false, message: "" },
  isLoading: false,
  customer: [],
  snackbar: {
    isOpen: false,
    message: "",
    severity: "error",
  },
};

const AppContext = createContext<{
  state: State;
  dispatch: Dispatch;
}>({
  state: initialState,
  dispatch: () => null,
});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
