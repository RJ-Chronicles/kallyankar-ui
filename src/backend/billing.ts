import api from "./api";

import { Billing, BillingWithMessage } from "../store/type";

const postNewBilling = async (billing: Billing) => {
  const { data } = await api.post<Billing>("billing/add", {
    ...billing,
    customer: billing.customerId,
  });
  return data;
};
const updateBillingById = async (billing: Billing, id: string) => {
  const { data } = await api.patch<Billing>("billing/update/" + id, billing);
  return data;
};
const deleteBillingById = async (id: string) => {
  const { data } = await api.delete<Billing>("billing/delete/" + id);
  return data;
};
const getBillingById = async (id: string) => {
  const { data } = await api.delete<Billing>(
    "billing/customer-specific-list/" + id
  );
  return data;
};
const getBillingList = async () => {
  const { data } = await api.get<Billing[]>("billing/get-list");
  return data;
};
const getBillingListByStatus = async ({ status }: { status: string }) => {
  const { data } = await api.get<BillingWithMessage>(
    "billing/get-list-by-status/" + status
  );
  return data.billingList;
};

export {
  postNewBilling,
  updateBillingById,
  deleteBillingById,
  getBillingList,
  getBillingListByStatus,
  getBillingById,
};
