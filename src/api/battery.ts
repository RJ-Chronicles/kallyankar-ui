import { api } from ".";
import { RequestConfig } from "../store/type";

export const batteryAllRequest: RequestConfig = {
  method: "GET",
  url: api.battery_GET,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "All records has been successfully FETCHED!",
  error: "Error while fetching all records!",
};

export const batterySaveRequest: RequestConfig = {
  method: "POST",
  url: api.battery_POST,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "New Record has been successfuly ADDED!",
  error: "Error while saving record!",
};

export const batteryDeleteRequest: RequestConfig = {
  method: "DELETE",
  url: api.battery_DELETE,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "Record has been successfuly DELETED!",
  error: "Error while deleting record!",
};

export const batteryUpdateRequest: RequestConfig = {
  method: "PATCH",
  url: api.battery_PATCH,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "Records has been successfuly UPDATED!",
  error: "Error while updating record!",
};
