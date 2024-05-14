import { STOCK } from "../store/type";
import api from "./api";
type STOCK_WITH_MSG = {
  message: string;
  list: STOCK[];
};
const postNewStock = async (stock: STOCK) => {
  const { data } = await api.post<STOCK>("stock/add", stock);
  return data;
};

const postCheckStockAvailability = async (name: string, type: string) => {
  const { data } = await api.post<STOCK>("stock/", { name, type });
  return data;
};
const updateStockById = async (stock: STOCK, id: string) => {
  const { data } = await api.patch<STOCK>("stock/update/" + id, stock);
  return data;
};
const deleteStockById = async (id: string) => {
  const { data } = await api.delete<STOCK>("stock/delete/" + id);
  return data;
};
const getStockList = async () => {
  const { data } = await api.get<STOCK_WITH_MSG>("stock/list");
  return data.list;
};

const getStockById = async (id: string) => {
  const { data } = await api.get<STOCK>("stock/seleted/" + id);
  return data;
};

export {
  postNewStock,
  updateStockById,
  deleteStockById,
  getStockList,
  getStockById,
  postCheckStockAvailability,
};
