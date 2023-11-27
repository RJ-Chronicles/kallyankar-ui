import { api } from ".";
import { RequestConfig } from "../store/type";

export const stockAllRequest: RequestConfig = {
  method: "GET",
  url: api.stock_GET,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "All records has been successfully FETCHED!",
  error: "Error while fetching all records!",
};

export const stockSaveRequest: RequestConfig = {
  method: "POST",
  url: api.stock_POST,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "New Record has been successfuly ADDED!",
  error: "Error while saving record!",
};

export const stockDeleteRequest: RequestConfig = {
  method: "DELETE",
  url: api.stock_DELETE,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "Record has been successfuly DELETED!",
  error: "Error while deleting record!",
};

export const stockUpdateRequest: RequestConfig = {
  method: "PATCH",
  url: api.stock_PATCH,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "Records has been successfuly UPDATED!",
  error: "Error while updating record!",
};
