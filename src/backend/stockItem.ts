import { StockItems } from "../store/type";
import api from "./api";

type Stock_Item_With_msg = {
  message: string;
  stockItemList: StockItems[];
};
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

const getStockItemBystockId = async ({ id }: { id: string }) => {
  const { data } = await api.get<Stock_Item_With_msg>(
    "stock-item/stock-items-by/" + id
  );
  return data.stockItemList;
};

export {
  postNewStockItem,
  updateStockItemById,
  deleteStockItemById,
  getStockItemList,
  getStockItemBystockId,
};
