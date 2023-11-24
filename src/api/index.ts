import { RequestConfig } from "../store/type";

let baseURL = "http://localhost:3001";

process.env.NODE_ENV === "development"
  ? (baseURL = "http://localhost:3001")
  : "";

export const api = {
  customer_GET: baseURL + "/customer",
  product_GET: baseURL + "/product",
  amphere_GET: baseURL + "/amphere",
  battery_GET: baseURL + "/battery-type",
  user_Login: baseURL + "/admin/login",
  size_GET: baseURL + "/size",
  GST_GET: baseURL + "/gst",
};

export const loginRequest: RequestConfig = {
  method: "POST",
  url: api.user_Login,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "Login successful",
  error: "Error while logging",
};

export const amphereRequest: RequestConfig = {
  method: "GET",
  url: api.amphere_GET,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "Amphere list was successfully retrieved",
  error: "Error while logging",
};

export const batteryRequest: RequestConfig = {
  method: "GET",
  url: api.battery_GET,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "Size list was successfully retrieved",
  error: "Error while logging",
};

export const GSTRequest: RequestConfig = {
  method: "GET",
  url: api.GST_GET,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "GST list was successfully retrieved",
  error: "Error while logging",
};
