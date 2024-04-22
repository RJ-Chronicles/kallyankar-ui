import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByCustomerId } from "../../backend/product";
import CartItems from "../../components/UI/Cart/CartItems";
import HeaderCartButton from "../../components/UI/Cart/HeaderCartButton";

import CustomerBatteryTable from "../../components/UI/Table/CustomerBatteryTable";
import useApiCall from "../../hooks/useApiCall";
import useAppContext from "../../hooks/useAppContext";
import { product } from "../../store/type";
import { HiShoppingCart } from "react-icons/hi";
import { Button } from "flowbite-react";
import ButtonHeader from "../../components/UI/Button/ButtonHeader";
import useInitialFetch from "../../hooks/useInitialFetch";
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
  useInitialFetch();
  const hideShowCartItems = () => {
    setShowCart((prev) => !prev);
  };
  const handleOpenForm = () => {
    dispatch({
      type: "SET_FORM_PROPS",
      payload: {
        data: product,
        mode: "ADD_RECORD",
        type: "PRODUCT",
      },
    });
    dispatch({ type: "HIDE_SHOW_FORM", payload: true });
  };
  return (
    <div className="w-full">
      <div className="flex justify-end w-full items-center">
        <ButtonHeader buttonClick={() => handleOpenForm()} />
        {storedCartItems.length > 0 && (
          <Button onClick={hideShowCartItems} className="w-40 mr-10">
            <HiShoppingCart className="mr-2 h-5 w-5" />
            {storedCartItems.length}
          </Button>
        )}
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
  );
};

export default CustomerBatteryPage;
