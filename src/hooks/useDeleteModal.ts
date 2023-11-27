import { useContext } from "react";
import { amphereDeleteRequest } from "../api/amphere";
import AppContext from "../store/AppContext";
import { DELETE_MODE } from "../store/type";
import useAxiosRequest from "./useAxiosRequest";
import useInitalFetch from "./useInitialFetch";

const useDeleteModal = () => {
  const { state, dispatch } = useContext(AppContext);
  const { fetchOnetimeItems } = useInitalFetch();
  const { axiosRequest } = useAxiosRequest();
  const deleteModalHandler = (mode: DELETE_MODE, id: string, token: string) => {
    switch (mode) {
      case "AMPHERE":
        fetchOnetimeItems(token, "AMPHERE");
        break;
      case "GST":
        fetchOnetimeItems(token, "GST");
        break;

      case "BATTERY_NAME":
        fetchOnetimeItems(token, "BATTERY_LIST");
        break;

      default:
        throw new Error("Invlid operation!");
    }
  };
  return {
    deleteModalHandler,
  };
};

export default useDeleteModal;
