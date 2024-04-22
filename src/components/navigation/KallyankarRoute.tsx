import { Route, Routes } from "react-router-dom";

import {
  DASHBOARD,
  BILLINGS,
  STOCK,
  CUSTOMERS,
  SETTINGS,
  BATTERIES,
  PAYMENTS,
} from "./path";
import Dashboard from "../../Pages/Dashboard";
import LoginPage from "../../Pages/login-page";
import LandingPage from "../../Pages/LandingPage";
import Batterypage from "../../Pages/BatteryPage";
import BillStatusPage from "../../Pages/PaymentPage";
import PaymentPage from "../../Pages/payment.page";
import SettingsPage from "../../Pages/setting";
import StockItemPage from "../../Pages/StockItemPage";
import StockPage from "../../Pages/StockPage";

import CustomerPage from "../../Pages/CustomerPage";
import CustomerBatteryPage from "../../Pages/CustomerBatteryPage";
import { useAuthContext } from "../../context/AuthContext";
import PageNotFound from "../../Pages/NotFoundPage";
const KallyankarRoute: React.FC = () => {
  const auth = useAuthContext();
  const isLoggedIn = auth?.isLoggedIn ?? false;

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path={DASHBOARD}
        element={isLoggedIn ? <Dashboard /> : <LoginPage />}
      />
      <Route
        path={CUSTOMERS + "/:customerId"}
        element={isLoggedIn ? <CustomerBatteryPage /> : <LoginPage />}
      />
      <Route
        path={CUSTOMERS}
        element={isLoggedIn ? <CustomerPage /> : <LoginPage />}
      />
      <Route
        path={BATTERIES}
        element={isLoggedIn ? <Batterypage /> : <LoginPage />}
      />
      <Route
        path={BILLINGS}
        element={isLoggedIn ? <BillStatusPage /> : <LoginPage />}
      />
      <Route
        path={PAYMENTS}
        element={isLoggedIn ? <PaymentPage /> : <LoginPage />}
      />
      <Route
        path={SETTINGS}
        element={isLoggedIn ? <SettingsPage /> : <LoginPage />}
      />
      <Route
        path={STOCK}
        element={isLoggedIn ? <StockPage /> : <LoginPage />}
      />
      <Route
        path={STOCK + "/:stock_id"}
        element={isLoggedIn ? <StockItemPage /> : <LoginPage />}
      />

      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default KallyankarRoute;
