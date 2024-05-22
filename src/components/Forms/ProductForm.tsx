import { Product, Severity } from "../../store/type";
import Heading from "../UI/Heading";
import useHandlevalueChange from "../../hooks/useHandleValueChange";

import useAppContext from "../../hooks/useAppContext";

import AmphereSelect from "../UI/select/AmphereSelect";
import BatterySelect from "../UI/select/BatterySelect";
import GstSelect from "../UI/select/GstSelect";
import React, { useEffect, useState } from "react";
import ButtonSave from "../UI/Button/ButtonSave";
import { ProductSchema } from "../../zod";
import useAnimation from "../../hooks/useAnimation";
import { ERRORS } from "../../zod/zod_error";
import { updateProductById } from "../../backend/product";
import { postCheckStockAvailability } from "../../backend/stock";
const ProductForm: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [isStockNotPresent, setStockNotPresent] = useState(false);
  const { storedCartItems } = state;
  const { formProps } = state;
  const { data: _product, title, mode } = formProps;
  const { setValue, data } = useHandlevalueChange(_product as Product);
  const { snackbarAnimation, spinnerAnimationStart, spinnerAnimationStop } =
    useAnimation();

  const {
    _id,
    name,
    type,
    serial_number,
    GST,
    price,
    vehicle_name,
    vehicle_number,
  } = data as Product;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isStockNotPresent) {
      snackbarAnimation(
        "No stock item present for " + name + " & " + type,
        "error"
      );
      return;
    }
    const validate = ProductSchema.safeParse(data as Product);
    if (!validate.success) {
      const errors = validate.error.flatten();
      const { name, price, type, serial_number, GST } = errors.fieldErrors;
      name && snackbarAnimation(ERRORS.NAME, "error");
      price && snackbarAnimation(ERRORS.PRICE, "error");
      type && snackbarAnimation(ERRORS.TYPE, "error");
      serial_number && snackbarAnimation(ERRORS.SERIAL_NO, "error");
      GST && snackbarAnimation(ERRORS.GST, "error");
      return;
    }
    if (mode === "ADD_RECORD") {
      dispatch({
        type: "ADD_STORED_CART_ITEMS",
        payload: [...storedCartItems, data as Product],
      });
      dispatch({ type: "HIDE_SHOW_FORM", payload: false });
    } else {
      try {
        spinnerAnimationStart();
        updateProductById(data as Product, _id ?? "");
        spinnerAnimationStop();
        snackbarAnimation(ERRORS.SUCCESS, "success");
      } catch (err) {
        spinnerAnimationStop();
        snackbarAnimation(ERRORS.FAILURE, "error");
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (name.length > 1 && type.length > 1) {
          const response = await postCheckStockAvailability(name, type);
          const { available } = response;
          let severtyType: Severity = "success";
          setStockNotPresent(false);
          if (+available === 0) {
            severtyType = "error";
            setStockNotPresent(true);
          } else if (+available < 10) {
            severtyType = "warning";
          }
          snackbarAnimation(`${available} Items are in stock`, severtyType);
        }
      } catch (err) {
        console.log(err);
        snackbarAnimation(
          "No stock item present for " + name + " & " + type,
          "error"
        );
        setStockNotPresent(true);
      }
    })();
  }, [name, type]);

  return (
    <>
      <Heading heading={title ?? "Add Item to cart"} />
      <div className="w-full  bg-white p-5 rounded-lg lg:rounded-l-none">
        <form
          className="px-8 pt-6 pb-4 bg-white rounded"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 md:flex md:justify-between">
            <AmphereSelect setValue={setValue} value={type} />
            <BatterySelect value={name} setValue={setValue} />
          </div>
          <div className="mb-4 md:mr-2">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="serial_number"
            >
              Serial Number
            </label>
            <input
              className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="serial_number"
              type="text"
              placeholder="Serial Number"
              onChange={setValue}
              value={serial_number}
              name="serial_number"
            />
          </div>

          <div className="mb-4 md:flex md:justify-between">
            <GstSelect setValue={setValue} value={GST} />
            <div className="mb-4 md:mr-2 md:mb-0 md:flex-grow">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="v_number"
              >
                Price
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="v_number"
                type="number"
                placeholder="Price"
                name="price"
                onChange={setValue}
                value={price}
              />
            </div>
          </div>

          <div className="mb-4 md:flex md:justify-between">
            <div className="mb-4 md:mr-2 md:mb-0 md:flex-grow">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="vehicle_name"
              >
                Vehicle Name
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="vehicle_name"
                type="text"
                name="vehicle_name"
                placeholder="Vehicle Name"
                onChange={setValue}
                value={vehicle_name}
              />
            </div>
            <div className="mb-4 md:mr-2 md:mb-0 md:flex-grow">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="v_number"
              >
                Vehicle Number
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="v_number"
                type="text"
                name="vehicle_number"
                placeholder="Vehicle Number"
                onChange={setValue}
                value={vehicle_number}
              />
            </div>
          </div>

          <ButtonSave />
          <hr className="mb-6 border-t" />
        </form>
      </div>
    </>
  );
};

export default ProductForm;
