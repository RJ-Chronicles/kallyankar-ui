import useAppContext from "../../../hooks/useAppContext";
import React from "react";
import { Product } from "../../../store/type";
import { CART_ITEMS_COLUMN } from "../Table/columns";
import { Trash2 } from "lucide-react";

type CartListPs = {
  hideDeleteColumn: boolean;
};
const CartItemsList: React.FC<CartListPs> = ({ hideDeleteColumn }) => {
  const { state, dispatch } = useAppContext();
  const { storedCartItems } = state;
  console.log(storedCartItems);
  const netAmount = (price: string, GST: string) => {
    const { itemPrice } = calculateNetAmountAndGST(price, GST);
    return itemPrice;
  };

  const calculateNetAmountAndGST = (price: string, GST: string) => {
    const itemGST =
      Math.round(
        ((parseInt(price) / (1 + (parseInt(GST) * 2) / 100)) * parseInt(GST)) /
          100
      ) * 2;
    const itemPrice = parseInt(price) - itemGST;
    return { itemGST, itemPrice };
  };

  const handleCartRemoveItem = (serial_number: string) => {
    const cartItems = storedCartItems.filter(
      (item) => item.serial_number !== serial_number
    );
    dispatch({
      type: "ADD_STORED_CART_ITEMS",
      payload: [...cartItems],
    });
    console.log("cartItems ", cartItems);
    if (cartItems.length === 0) {
      console.log("inside the if block");
      dispatch({ type: "HIDE_SHOW_FORM", payload: false });
    }
    console.log("end game");
  };
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {CART_ITEMS_COLUMN.map((col, index) => {
            const shouldDisplayDelete = !hideDeleteColumn ? (
              <th key={index} className="px-6 py-3 border border-slate-900">
                {col}
              </th>
            ) : null;

            return col !== "Action" ? (
              <th key={index} className="px-6 py-3 border border-slate-900">
                {col}
              </th>
            ) : (
              shouldDisplayDelete
            );
          })}
        </tr>
      </thead>
      <tbody>
        {storedCartItems.length > 0 &&
          storedCartItems.map((item: Product, index: number) => (
            <tr
              key={index}
              className="bg-white border-b text-sm dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-2 border border-slate-900">{item.name}</td>
              <td className="px-6 py-2 border border-slate-900">
                {item.serial_number}
              </td>
              <td className="px-6 py-2 border border-slate-900">
                {netAmount(item.price, item.GST)}
              </td>
              <td className="px-6 py-2 border border-slate-900">
                {item.GST + "%"}
              </td>
              <td className="px-6 py-2 border border-slate-900">
                {item.price}
              </td>
              <td className="px-6 py-2 border border-slate-900">{item.type}</td>

              {!hideDeleteColumn && (
                <td className="px-6 py-2 border border-slate-900">
                  <button
                    onClick={() => handleCartRemoveItem(item.serial_number)}
                    className="w-full "
                  >
                    <Trash2 className="text-red-500" />
                  </button>
                </td>
              )}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default CartItemsList;
