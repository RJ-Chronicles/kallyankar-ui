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
  billing_GET: baseURL + "/billing",
  stock_GET: baseURL + "/stock",

  customer_GET_SINGLE: baseURL + "/customer/:id",
  product_GET_SINGLE: baseURL + "/product/:id",
  amphere_GET_SINGLE: baseURL + "/amphere/:id",
  battery_GET_SINGLE: baseURL + "/battery-type/:id",
  user_GET_SINGLE: baseURL + "/admin/:id",
  size_GET_SINGLE: baseURL + "/size/:id",
  GST_GET_SINGLE: baseURL + "/gst/:id",
  billing_GET_SINGLE: baseURL + "/billing",
  stock_GET_SINGLE: baseURL + "/stock",

  customer_POST: baseURL + "/customer",
  product_POST: baseURL + "/product",
  amphere_POST: baseURL + "/amphere",
  battery_POST: baseURL + "/battery-type",
  user_POST: baseURL + "/admin/login",
  size_POST: baseURL + "/size",
  GST_POST: baseURL + "/gst",
  billing_POST: baseURL + "/billing",
  stock_POST: baseURL + "/stock",

  customer_PATCH: baseURL + "/customer/:id",
  product_PATCH: baseURL + "/product/:id",
  amphere_PATCH: baseURL + "/amphere/:id",
  battery_PATCH: baseURL + "/battery-type/:id",
  user_PATCH: baseURL + "/admin/:id",
  size_PATCH: baseURL + "/size/:id",
  GST_PATCH: baseURL + "/gst/:id",
  billing_PATCH: baseURL + "/billing/:id",
  stock_PATCH: baseURL + "/stock/:id",

  customer_DELETE: baseURL + "/customer/:id",
  product_DELETE: baseURL + "/product/:id",
  amphere_DELETE: baseURL + "/amphere/:id",
  battery_DELETE: baseURL + "/battery-type/:id",
  user_DELETE: baseURL + "/admin/:id",
  size_DELETE: baseURL + "/size/:id",
  GST_DELETE: baseURL + "/gst/:id",
  billing_DELETE: baseURL + "/billing/:id",
  stock_DELETE: baseURL + "/stock/:id",
};

// export const loginRequest: RequestConfig = {
//   method: "POST",
//   url: api.user_Login,
//   headers: {
//     headers: {
//       Authorization: "",
//     },
//   },
//   success: "Login successful",
//   error: "Error while logging",
// };

// export const amphereRequest: RequestConfig = {
//   method: "GET",
//   url: api.amphere_GET,
//   headers: {
//     headers: {
//       Authorization: "",
//     },
//   },
//   success: "Amphere list was successfully retrieved",
//   error: "Error while logging",
// };

// export const batteryRequest: RequestConfig = {
//   method: "GET",
//   url: api.battery_GET,
//   headers: {
//     headers: {
//       Authorization: "",
//     },
//   },
//   success: "Size list was successfully retrieved",
//   error: "Error while logging",
// };

// export const GSTRequest: RequestConfig = {
//   method: "GET",
//   url: api.GST_GET,
//   headers: {
//     headers: {
//       Authorization: "",
//     },
//   },
//   success: "GST list was successfully retrieved",
//   error: "Error while logging",
// };
