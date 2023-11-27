import { api } from ".";
import { RequestConfig } from "../store/type";

export const billingAllRequest: RequestConfig = {
  method: "GET",
  url: api.billing_GET,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "All records has been successfully FETCHED!",
  error: "Error while fetching all records!",
};

export const billingSaveRequest: RequestConfig = {
  method: "POST",
  url: api.billing_POST,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "New Record has been successfuly ADDED!",
  error: "Error while saving record!",
};

export const billingDeleteRequest: RequestConfig = {
  method: "DELETE",
  url: api.billing_DELETE,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "Record has been successfuly DELETED!",
  error: "Error while deleting record!",
};

export const billingUpdateRequest: RequestConfig = {
  method: "PATCH",
  url: api.billing_PATCH,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "Records has been successfuly UPDATED!",
  error: "Error while updating record!",
};
