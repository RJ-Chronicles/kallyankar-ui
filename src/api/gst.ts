import { api } from ".";
import { RequestConfig } from "../store/type";

export const GSTAllRequest: RequestConfig = {
  method: "GET",
  url: api.GST_GET,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "All records has been successfully FETCHED!",
  error: "Error while fetching all records!",
};

export const GSTSaveRequest: RequestConfig = {
  method: "POST",
  url: api.GST_POST,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "New Record has been successfuly ADDED!",
  error: "Error while saving record!",
};

export const GSTDeleteRequest: RequestConfig = {
  method: "DELETE",
  url: api.GST_DELETE,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "Record has been successfuly DELETED!",
  error: "Error while deleting record!",
};

export const GSTUpdateRequest: RequestConfig = {
  method: "PATCH",
  url: api.GST_PATCH,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "Records has been successfuly UPDATED!",
  error: "Error while updating record!",
};
