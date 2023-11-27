import { api } from ".";
import { RequestConfig } from "../store/type";

const userLoginRequest: RequestConfig = {
  method: "POST",
  url: api.user_Login,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "All records has been successfully FETCHED!",
  error: "Error while fetching all records!",
};

const userSaveRequest: RequestConfig = {
  method: "POST",
  url: api.user_POST,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "New Record has been successfuly ADDED!",
  error: "Error while saving record!",
};

const userDeleteRequest: RequestConfig = {
  method: "DELETE",
  url: api.user_DELETE,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "Record has been successfuly DELETED!",
  error: "Error while deleting record!",
};

const userUpdateRequest: RequestConfig = {
  method: "PATCH",
  url: api.user_PATCH,
  headers: {
    headers: {
      Authorization: "",
    },
  },
  success: "Records has been successfuly UPDATED!",
  error: "Error while updating record!",
};

export {
  userLoginRequest,
  userSaveRequest,
  userDeleteRequest,
  userUpdateRequest,
};
