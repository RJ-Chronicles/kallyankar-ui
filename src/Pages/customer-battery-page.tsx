import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByCustomerId } from "../backend/product";
import CartItems from "../components/UI/Cart/CartItems";
import HeaderCartButton from "../components/UI/Cart/HeaderCartButton";
import PageWrapper from "../components/UI/Page";
import CustomerBatteryTable from "../components/UI/Table/CustomerBatteryTable";
import useApiCall from "../hooks/useApiCall";
import useAppContext from "../hooks/useAppContext";
import { product } from "../store/type";

const CustomerBatteryPage = () => {
  const [showCart, setShowCart] = useState(false);
  const { customerId } = useParams();
  const { state } = useAppContext();
  const { refreshEffect, storedCartItems } = state;
  const params = useMemo(() => {
    return { refreshEffect, id: customerId ?? "" };
  }, []);

  const { data } = useApiCall(getProductByCustomerId, params);
  const { dispatch } = useAppContext();

  const hideShowCartItems = () => {
    setShowCart((prev) => !prev);
  };
  return (
    <PageWrapper>
      <div>
        {storedCartItems.length > 0 && (
          <HeaderCartButton
            itemCount={storedCartItems.length}
            onClick={hideShowCartItems}
          />
        )}
        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              dispatch({
                type: "SET_FORM_PROPS",
                payload: {
                  data: product,
                  mode: "ADD_RECORD",
                  type: "PRODUCT",
                },
              });
              dispatch({ type: "HIDE_SHOW_FORM", payload: true });
            }}
            className="flex space-x-2 bg-[#600080] hover:bg-[#8031a7] text-sm text-white font-medium py-2 px-10 border-b-4 border-[#8031a7] rounded-full my-10 "
          >
            <span>Add</span>
            <span>NEW</span>
          </button>
        </div>
        {data && <CustomerBatteryTable data={data} />}
        {showCart && (
          <CartItems
            open={showCart}
            customerId={customerId ?? ""}
            closeCartHandler={hideShowCartItems}
          />
        )}
      </div>
    </PageWrapper>
  );
};

export default CustomerBatteryPage;
