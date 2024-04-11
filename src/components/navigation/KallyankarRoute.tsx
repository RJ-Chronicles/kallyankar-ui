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
import Dashboard from "../../Pages/dashboard";
import LoginPage from "../../Pages/login-page";
import LandingPage from "../../Pages/landing-page";
import Batterypage from "../../Pages/battery.page";
import BillStatusPage from "../../Pages/bill.status.page";
import PaymentPage from "../../Pages/payment.page";
import SettingsPage from "../../Pages/setting";
import StockItemPage from "../../Pages/stock.items";
import StockPage from "../../Pages/stock-page";

import CustomerPage from "../../Pages/customer-page";
import CustomerBatteryPage from "../../Pages/customer-battery-page";
import { useAuthContext } from "../../context/AuthContext";
import useInitialFetch from "../../hooks/useInitialFetch";
const KallyankarRoute: React.FC = () => {
  const auth = useAuthContext();
  const isLoggedIn = auth?.isLoggedIn ?? false;
  useInitialFetch();

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

      <Route path="/*" element={<LoginPage />} />
    </Routes>
  );
};

export default KallyankarRoute;
