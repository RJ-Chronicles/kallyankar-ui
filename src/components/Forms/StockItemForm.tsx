import { STOCK, StockItems } from "../../store/type";
import Heading from "../UI/Heading";
import useHandlevalueChange from "../../hooks/useHandleValueChange";
import useResponseValidator from "../../hooks/useResponseValidator";
import useApiCall from "../../hooks/useApiCall";
import { postNewStockItem, updateStockItemById } from "../../backend/stockItem";
import { getAmphereList } from "../../backend/amphere";
import { getBatteryList } from "../../backend/battery";
import useAppContext from "../../hooks/useAppContext";
import ButtonSave from "../UI/Button/ButtonSave";
import AmphereSelect from "../UI/select/AmphereSelect";
import BatterySelect from "../UI/select/BatterySelect";
import { useAnimation } from "../../hooks";
import { StockSchema } from "../../zod";
import { ERRORS } from "../../zod/zod_error";

const StockItemsForms: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { refreshEffect, formProps } = state;
  const { data: _stock, title, mode } = formProps;
  const { setValue, data } = useHandlevalueChange(_stock as STOCK);
  const { snackbarAnimation, spinnerAnimationStart, spinnerAnimationStop } =
    useAnimation();

  const { product_code, battery_name, available, amphere_size, _id } =
    data as STOCK;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validate = StockSchema.safeParse(data as STOCK);
    if (!validate.success) {
      const errors = validate.error.flatten();
      const { battery_name, amphere_size, product_code } = errors.fieldErrors;

      battery_name && snackbarAnimation(ERRORS.BATTERY, "error");
      amphere_size && snackbarAnimation(ERRORS.AMPHERE, "error");
      product_code && snackbarAnimation(ERRORS.P_CODE, "error");
      return;
    }

    dispatch({ type: "SET_LOADING", payload: true });
    if (mode === "ADD_RECORD") {
      const response = await postNewStockItem(data as StockItems);
    } else {
      await updateStockItemById(data as StockItems, _id ?? "");
    }

    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "REFRESH_EFFECT", payload: !refreshEffect });
  };

  return (
    <>
      <Heading heading="User Registration Form" />
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
          <AmphereSelect
            setValue={setValue}
            value={battery_name}
            name={"battery_name"}
          />
          <BatterySelect
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

export default StockItemsForms;
