import { api } from ".";
import { RequestConfig } from "../store/type";

export const sizeAllRequest: RequestConfig = {
  method: "GET",
  url: api.size_GET,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "All records has been successfully FETCHED!",
  error: "Error while fetching all records!",
};

export const sizeSaveRequest: RequestConfig = {
  method: "POST",
  url: api.size_POST,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "New Record has been successfuly ADDED!",
  error: "Error while saving record!",
};

export const sizeDeleteRequest: RequestConfig = {
  method: "DELETE",
  url: api.size_DELETE,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "Record has been successfuly DELETED!",
  error: "Error while deleting record!",
};

export const sizeUpdateRequest: RequestConfig = {
  method: "PATCH",
  url: api.size_PATCH,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "Records has been successfuly UPDATED!",
  error: "Error while updating record!",
};
