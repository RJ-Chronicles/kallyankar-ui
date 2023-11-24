import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AppProvider } from "./store/AppContext";
import { BrowserRouter } from "react-router-dom";
import { SessionProvider } from "./session";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </SessionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
