import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getStockItemBystockId,
  postNewStockItem,
  updateStockItemById,
} from "../../backend/stockItem";
import ButtonHeader from "../../components/UI/Button/ButtonHeader";
import StockItemTable from "../../components/UI/Table/StockItemTable";
import { useAnimation, useApiCall, useAppContext } from "../../hooks";
import { ERRORS } from "../../zod/zod_error";

const StockItemPage = () => {
  const { stock_id } = useParams();
  const { state, dispatch } = useAppContext();
  const { refreshEffect } = state;
  const [quantity, setQuantity] = useState<string>();
  const [showForm, setShowForm] = useState(false);
  const [operationMode, setOperaitonMode] = useState("ADD");
  const [udpateId, setQuanityUpdateId] = useState<string>();
  const [prevQuantify, setPrevQuantity] = useState<string>();
  const { snackbarAnimation, spinnerAnimationStart, spinnerAnimationStop } =
    useAnimation();

  const params = useMemo(() => {
    return { refreshEffect, id: stock_id ?? "" };
  }, [refreshEffect]);

  const { data } = useApiCall(getStockItemBystockId, params);

  const addNewItemHandler = () => {
    setOperaitonMode("ADD");
    if (!showForm) setShowForm(true);
  };

  const stockItemSubmitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const quantityToNum = +(quantity ? quantity : 0);
    if (quantityToNum <= 0) {
      snackbarAnimation("Please enter valid stock value", "error");
      return;
    }

    try {
      spinnerAnimationStart();
      if (operationMode === "ADD") {
        await postNewStockItem({
          quantity: quantityToNum,
          stock: stock_id ?? "",
        });
      } else {
        await updateStockItemById(
          quantity ?? "",
          udpateId ?? "",
          prevQuantify ?? "",
          stock_id ?? ""
        );
      }
      spinnerAnimationStop();
      dispatch({ type: "REFRESH_EFFECT", payload: !refreshEffect });
    } catch (err) {
      spinnerAnimationStop();
      snackbarAnimation(ERRORS.FAILURE, "error");
    }
  };

  const updateStockItem = (id: string) => {
    setOperaitonMode("UPDATE");
    const record = data?.find((item) => item._id === id);
    const qnt = record?.quantity ? String(record.quantity) : "0";
    setQuantity(qnt);
    setPrevQuantity(qnt);
    setQuanityUpdateId(id);
    if (!showForm) setShowForm(true);
  };
  return (
    <div className="w-full mx-5">
      <div className="flex justify-between items-center">
        <div className="flex justify-start w-full md:w-1/4">
          <ButtonHeader buttonClick={addNewItemHandler} />
        </div>
        <div className="flex justify-between w-full">
          {showForm && (
            <form
              className=" flex justify-end space-x-10 w-full"
              onSubmit={stockItemSubmitHandler}
            >
              <div className="flex justify-center items-center">
                <input
                  className=" px-3 py-2 w-80 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="number"
                  required
                  id="name"
                  placeholder="Stock Quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                />
              </div>

              <button
                type="submit"
                className="w-[170px] py-2 px-10 group relative text-white flex items-stretch justify-center p-0.5 text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none border border-transparent bg-cyan-700 focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-cyan-800 dark:bg-cyan-600 dark:focus:ring-cyan-800 dark:enabled:hover:bg-cyan-700 rounded-lg "
              >
                {operationMode === "ADD" ? "ADD" : "UPDATE"}
              </button>
            </form>
          )}
        </div>
      </div>
      {data && <StockItemTable data={data} udpateStockItem={updateStockItem} />}
    </div>
  );
};

export default StockItemPage;
