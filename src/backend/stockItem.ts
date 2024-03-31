import { StockItems } from "../store/type";
import api from "./api";

const postNewStockItem = async (stockItem: StockItems) => {
  const { data } = await api.post<StockItems>("stock-item/add", stockItem);
  return data;
};
const updateStockItemById = async (stockItem: StockItems, id: string) => {
  const { data } = await api.patch<StockItems>(
    "stock-item/update/" + id,
    stockItem
  );
  return data;
};
const deleteStockItemById = async (id: string) => {
  const { data } = await api.delete<StockItems>("stock-item/delete/" + id);
  return data;
};
const getStockItemList = async () => {
  const { data } = await api.get<StockItems[]>("stock-item/list");
  return data;
};

const getStockItemBystockId = async (id: string) => {
  const { data } = await api.get<StockItems>("stock-item/stock-items-by/" + id);
  return data;
};

export {
  postNewStockItem,
  updateStockItemById,
  deleteStockItemById,
  getStockItemList,
  getStockItemBystockId,
};
