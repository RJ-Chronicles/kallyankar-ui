import { api } from ".";
import { RequestConfig } from "../store/type";

export const productAllRequest: RequestConfig = {
  method: "GET",
  url: api.product_GET,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "All records has been successfully FETCHED!",
  error: "Error while fetching all records!",
};

export const productSaveRequest: RequestConfig = {
  method: "POST",
  url: api.product_POST,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "New Record has been successfuly ADDED!",
  error: "Error while saving record!",
};

export const productDeleteRequest: RequestConfig = {
  method: "DELETE",
  url: api.product_DELETE,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "Record has been successfuly DELETED!",
  error: "Error while deleting record!",
};

export const productUpdateRequest: RequestConfig = {
  method: "PATCH",
  url: api.product_PATCH,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "Records has been successfuly UPDATED!",
  error: "Error while updating record!",
};
