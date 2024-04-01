import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AppProvider } from "./store/AppContext";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
