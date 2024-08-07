import { STOCK } from "../../store/type";
import Heading from "../UI/Heading";
import useHandlevalueChange from "../../hooks/useHandleValueChange";

import useAppContext from "../../hooks/useAppContext";
import ButtonSave from "../UI/Button/ButtonSave";
import AmphereSelect from "../UI/select/AmphereSelect";
import BatterySelect from "../UI/select/BatterySelect";
import { useAnimation } from "../../hooks";
import { StockSchema } from "../../zod";
import { ERRORS } from "../../zod/zod_error";
import {
  postCheckStockAvailability,
  postNewStock,
  updateStockById,
} from "../../backend/stock";
import { useEffect, useState } from "react";

const StockForms: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [isStockNotPresent, setStockNotPresent] = useState(false);
  const { refreshEffect, formProps } = state;
  const { data: _stock, title, mode } = formProps;
  const { setValue, data } = useHandlevalueChange(_stock as STOCK);
  const { snackbarAnimation, spinnerAnimationStart, spinnerAnimationStop } =
    useAnimation();
  console.log("formProps ", formProps);
  const { product_code, battery_name, available, amphere_size, _id } =
    data as STOCK;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isStockNotPresent) {
      snackbarAnimation(
        `Record already exist for ${battery_name + " and " + amphere_size}`,
        "error"
      );
      return;
    }

    const validate = StockSchema.safeParse(data as STOCK);
    if (!validate.success) {
      const errors = validate.error.flatten();
      const { battery_name, amphere_size, product_code } = errors.fieldErrors;

      battery_name && snackbarAnimation(ERRORS.BATTERY, "error");
      amphere_size && snackbarAnimation(ERRORS.AMPHERE, "error");
      product_code && snackbarAnimation(ERRORS.P_CODE, "error");
      return;
    }
    spinnerAnimationStart();
    try {
      if (mode === "ADD_RECORD") {
        await postNewStock(data as STOCK);
      } else {
        await updateStockById(data as STOCK, _id ?? "");
      }
      snackbarAnimation(ERRORS.SUCCESS, "success");
    } catch (err) {
      snackbarAnimation(ERRORS.FAILURE, "error");
    }
    spinnerAnimationStop();
    dispatch({ type: "REFRESH_EFFECT", payload: !refreshEffect });
    dispatch({ type: "HIDE_SHOW_FORM", payload: false });
  };

  useEffect(() => {
    (async () => {
      try {
        if (mode === "ADD_RECORD") {
          if (amphere_size.length > 1 && battery_name.length > 1) {
            const response = await postCheckStockAvailability(
              battery_name,
              amphere_size
            );
            if (response) {
              snackbarAnimation(
                `Record already exist for ${
                  battery_name + " and " + amphere_size
                }`,
                "error"
              );
            }
            setStockNotPresent(true);
          }
        }
      } catch (err) {
        console.log(err);
        setStockNotPresent(false);
      }
    })();
  }, [battery_name, amphere_size]);

  return (
    <>
      <Heading heading={title ?? "Stock Item Entry Form"} />
      <form className="px-8 pt-6 pb-4 bg-white rounded" onSubmit={handleSubmit}>
        <div className="mb-4 md:mr-2">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="product_code"
          >
            Serial Number
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            onChange={setValue}
            id="product_code"
            placeholder="Product code"
            name="product_code"
            value={product_code}
          />
        </div>

        <div className="mb-4 md:flex md:justify-between">
          <BatterySelect
            setValue={setValue}
            value={battery_name}
            name={"battery_name"}
          />
          <AmphereSelect
            setValue={setValue}
            value={amphere_size}
            name={"amphere_size"}
          />
        </div>
        <ButtonSave />
      </form>
    </>
  );
};

export default StockForms;
