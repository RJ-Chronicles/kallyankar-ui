let baseURL = "http://localhost:3001";

process.env.NODE_ENV === "development"
  ? (baseURL = "http://localhost:3001")
  : "";

export const api = {
  customer_GET: baseURL + "/customer",
  product_GET: baseURL + "/product",
  amphere_GET: baseURL + "/amphere",
  battery_GET: baseURL + "/battery-type",
};
