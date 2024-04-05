import { useState } from "react";
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
  return (
    <select
      className="w-full px-9 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      id="role"
      onChange={() => setValue}
      value={value ?? ""}
      name="type"
    >
      <option value="DEFAULT">Choose battery name.</option>
      {batteryNames?.map((data, index) => {
        return (
          <option key={index} value={data.name}>
            {data.name}
          </option>
        );
      })}
    </select>
  );
};

export default BatterySelect;
