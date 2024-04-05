import { useState } from "react";
import useAppContext from "../../../hooks/useAppContext";
import { UserFormData } from "../../../store/type";
interface AmpProps {
  setValue: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  value: string | number | null;
}
const AmphereSelect: React.FC<AmpProps> = ({ setValue, value }) => {
  const [] = useState();

  const { state } = useAppContext();
  const { amphere } = state;
  return (
    <div className="mb-4 md:mr-2 md:mb-0">
      <label
        className="block mb-2 text-sm font-bold text-gray-700"
        htmlFor="role"
      >
        Amphere size
      </label>
      <select
        className="w-full px-9 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        id="role"
        onChange={setValue}
        value={value ?? ""}
        name="name"
      >
        <option value="DEFAULT">Choose Amphere value</option>
        {amphere?.map((data, index) => {
          return (
            <option key={index} value={data.size}>
              {data.size}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default AmphereSelect;
