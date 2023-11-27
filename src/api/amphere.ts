import { api } from ".";
import { RequestConfig } from "../store/type";

const amphereAllRequest: RequestConfig = {
  method: "GET",
  url: api.amphere_GET,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "All records has been successfully FETCHED!",
  error: "Error while fetching all records!",
};

const amphereSaveRequest: RequestConfig = {
  method: "POST",
  url: api.amphere_POST,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "New Record has been successfuly ADDED!",
  error: "Error while saving record!",
};

const amphereDeleteRequest: RequestConfig = {
  method: "DELETE",
  url: api.amphere_DELETE,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "Record has been successfuly DELETED!",
  error: "Error while deleting record!",
};

const amphereUpdateRequest: RequestConfig = {
  method: "PATCH",
  url: api.amphere_PATCH,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "Records has been successfuly UPDATED!",
  error: "Error while updating record!",
};

export {
  amphereAllRequest,
  amphereSaveRequest,
  amphereDeleteRequest,
  amphereUpdateRequest,
};
