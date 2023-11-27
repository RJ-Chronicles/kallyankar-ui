import { api } from ".";
import { RequestConfig } from "../store/type";

export const customerAllRequest: RequestConfig = {
  method: "GET",
  url: api.customer_GET,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "All records has been successfully FETCHED!",
  error: "Error while fetching all records!",
};

export const customerSaveRequest: RequestConfig = {
  method: "POST",
  url: api.customer_POST,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "New Record has been successfuly ADDED!",
  error: "Error while saving record!",
};

export const customerDeleteRequest: RequestConfig = {
  method: "DELETE",
  url: api.customer_DELETE,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "Record has been successfuly DELETED!",
  error: "Error while deleting record!",
};

export const customerUpdateRequest: RequestConfig = {
  method: "PATCH",
  url: api.customer_PATCH,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "Records has been successfuly UPDATED!",
  error: "Error while updating record!",
};
