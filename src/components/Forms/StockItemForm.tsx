import { StockItems } from "../../store/type";
import Overlay from "../UI/Overlay";
import Heading from "../UI/Heading";
import useHandlevalueChange from "../../hooks/useHandleValueChange";
import useResponseValidator from "../../hooks/useResponseValidator";
import useApiCall from "../../hooks/useApiCall";
import { postNewStockItem } from "../../backend/stockItem";
import { getAmphereList } from "../../backend/amphere";
import { getBatteryList } from "../../backend/battery";
import ButtonLarge from "../UI/Button/ButtonLarge";
interface Props {
  stockItems: StockItems;
}
const AmphereForm: React.FC<Props> = ({ stockItems }) => {
  const { setValue, data } = useHandlevalueChange(stockItems);

  const { data: amphere } = useApiCall(getAmphereList, {});
  const { data: battery } = useApiCall(getBatteryList, {});
  const { error, setError, validator } = useResponseValidator();
  const { product_code, battery_name, available, amphere_size } =
    stockItems as StockItems;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validator(data as StockItems);
    if (!error) {
      const response = await postNewStockItem(data as StockItems);
    }
  };
  return (
    <Overlay open={true} handleClose={() => {}}>
      <Heading heading="User Registration Form" />
      <form className="px-8 pt-6 pb-4 bg-white rounded" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="product_code"
          >
            Serial Number
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            required
            onChange={setValue}
            id="product_code"
            placeholder="Product code"
            value={product_code}
          />
        </div>

        <div className="mb-4 md:flex md:justify-between">
          <div className="mb-4 md:mr-2 md:mb-0">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="role"
            >
              Battery Name
            </label>
            <select
              className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              onChange={setValue}
              value={battery_name}
              id="role"
            >
              <option value="DEFAULT">Choose battery name</option>
              {battery?.map((data, index) => {
                return (
                  <option key={index} value={data.name}>
                    {data.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="md:ml-2">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="role"
            >
              Amphere Size
            </label>
            <select
              className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="size"
              value={amphere_size}
              onChange={setValue}
            >
              <option value="">Choose battery size</option>
              {amphere?.map((data, index) => {
                return (
                  <option key={index} value={data.size}>
                    {data.size}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <ButtonLarge title="register now" type="submit" />
      </form>
    </Overlay>
  );
};

export default AmphereForm;
