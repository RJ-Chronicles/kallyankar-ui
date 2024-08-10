import { Navigate, Route, Routes } from "react-router-dom";

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

import PageNotFound from "../../Pages/NotFoundPage";
import useAuthContext from "../../auth-store/useAuthContext";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const {
    state: { isAuthenticated },
  } = useAuthContext();

  return isAuthenticated ? element : <Navigate to="/admin-login" replace />;
};

const KallyankarRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin-login" element={<LoginPage />} />

      <Route
        path={DASHBOARD}
        element={<ProtectedRoute element={<Dashboard />} />}
      />
      <Route
        path={`${CUSTOMERS}/:customerId`}
        element={<ProtectedRoute element={<CustomerBatteryPage />} />}
      />
      <Route
        path={CUSTOMERS}
        element={<ProtectedRoute element={<CustomerPage />} />}
      />
      <Route
        path={BATTERIES}
        element={<ProtectedRoute element={<Batterypage />} />}
      />
      <Route
        path={BILLINGS}
        element={<ProtectedRoute element={<BillStatusPage />} />}
      />
      <Route
        path={PAYMENTS}
        element={<ProtectedRoute element={<PaymentPage />} />}
      />
      <Route
        path={SETTINGS}
        element={<ProtectedRoute element={<SettingsPage />} />}
      />
      <Route
        path={STOCK}
        element={<ProtectedRoute element={<StockPage />} />}
      />
      <Route
        path={`${STOCK}/:stock_id`}
        element={<ProtectedRoute element={<StockItemPage />} />}
      />

      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default KallyankarRoute;
