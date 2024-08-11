import api from "./api";

import { Product } from "../store/type";

interface ProductMsg {
  soldList: Product[];
  message: string;
}

const postNewProduct = async (product: Product) => {
  delete product._id;
  const { data } = await api.post<Product>("product/post", product);
  return data;
};
const updateProductById = async (product: Product, id: string) => {
  const { data } = await api.patch<Product>("product/update/" + id, product);
  return data;
};
const deleteProductById = async (id: string) => {
  const { data } = await api.delete<Product>("product/delete/" + id);
  return data;
};
const getProductList = async () => {
  const { data } = await api.get<ProductMsg>("product/get-list");
  return data.soldList;
};
const getProductListToExport = async () => {
  const { data } = await api.get<Product[]>("product/list-to-export");
  return data;
};
const getProductByCustomerId = async ({ id }: { id: string }) => {
  const { data } = await api.get<Product[]>(
    "product/customer-specific-list/" + id
  );
  return data;
};

export {
  postNewProduct,
  updateProductById,
  deleteProductById,
  getProductList,
  getProductByCustomerId,
  getProductListToExport,
};
