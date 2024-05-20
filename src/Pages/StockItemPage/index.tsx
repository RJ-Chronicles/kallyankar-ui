import { ArrowDownWideNarrowIcon } from "lucide-react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { getStockItemBystockId } from "../../backend/stockItem";
import PageWrapper from "../../components/UI/Page";
import StockItemTable from "../../components/UI/Table/StockItemTable";
import { useApiCall, useAppContext } from "../../hooks";

const StockItemPage = () => {
  const { stock_id } = useParams();
  const { state } = useAppContext();
  const { refreshEffect } = state;
  const params = useMemo(() => {
    return { refreshEffect, id: stock_id ?? "" };
  }, []);

  const { data } = useApiCall(getStockItemBystockId, params);
  console.log(data);
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div className="flex justify-start w-full md:w-1/4">
          <button
            onClick={addNewItem}
            className="flex space-x-2 bg-[#600080] hover:bg-[#8031a7] text-sm text-white font-medium py-2 px-10 border-b-4 border-[#8031a7] rounded-full my-10 "
          >
            <span>
              <ArrowDownWideNarrowIcon />
            </span>
            <span>NEW1</span>
          </button>
        </div>
        <div className="flex justify-start w-full">
          {showForm && (
            <form
              className="px-8 md:px-16 flex space-x-10"
              onSubmit={stockItemSubmitHandler}
            >
              <div className="flex justify-center items-center">
                <input
                  className=" px-3 py-2 w-80 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="number"
                  required
                  id="name"
                  placeholder="Stock Item"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                />
              </div>

              <button
                type="submit"
                className="w-full flex space-x-2 bg-[#600080] hover:bg-[#8031a7] text-sm text-white font-medium py-2 px-10 border-b-4 border-[#8031a7] rounded-full my-10"
              >
                {operationMode === "ADD" ? "ADD" : "UPDATE"}
              </button>
            </form>
          )}
        </div>
      </div>
      {data && <StockItemTable data={data} />}
    </div>
  );
};

export default StockItemPage;
