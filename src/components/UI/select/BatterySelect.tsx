import { useMemo, useState } from "react";
import useAppContext from "../../../hooks/useAppContext";
import { UserFormData } from "../../../store/type";
interface AmpProps {
  setValue: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  value: string | number | null;
}
const BatterySelect: React.FC<AmpProps> = ({ setValue, value }) => {
  const [] = useState();

  const { state } = useAppContext();
  const { batteryNames } = state;

  return useMemo(
    () => (
      <div className="mb-4 md:mr-2 md:mb-0">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="role"
        >
          Battery name
        </label>
        <select
          className="w-full px-9 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="role"
          onChange={setValue}
          name="type"
          value={value ?? ""}
        >
          <option value="DEFAULT">Choose battery name.</option>
          {batteryNames?.map((data, index) => (
            <option key={index} value={data.name}>
              {data.name}
            </option>
          ))}
        </select>
      </div>
    ),
    [value]
  );
};

export default BatterySelect;
