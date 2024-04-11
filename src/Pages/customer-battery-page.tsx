import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByCustomerId } from "../backend/product";
import CartItems from "../components/UI/Cart/CartItems";
import HeaderCartButton from "../components/UI/Cart/HeaderCartButton";

import CustomerBatteryTable from "../components/UI/Table/CustomerBatteryTable";
import useApiCall from "../hooks/useApiCall";
import useAppContext from "../hooks/useAppContext";
import { product } from "../store/type";
import { HiOutlineArrowRight, HiShoppingCart } from "react-icons/hi";
import { Button } from "flowbite-react";
import ButtonHeader from "../components/UI/Button/ButtonHeader";
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
      {storedCartItems.length > 0 && (
        <HeaderCartButton
          itemCount={storedCartItems.length}
          onClick={hideShowCartItems}
        />
      )}
      <ButtonHeader buttonClick={() => handleOpenForm()} />
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
