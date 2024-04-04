import { useState } from "react";
import useAppContext from "../../../hooks/useAppContext";
import { UserFormData } from "../../../store/type";
interface AmpProps {
  setValue: React.Dispatch<React.SetStateAction<UserFormData>>;
  value: string | number | null;
}
const GstSelect: React.FC<AmpProps> = ({ setValue, value }) => {
  const [] = useState();

  const { state } = useAppContext();
  const { GST } = state;
  return (
    <select
      className="w-full px-9 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      id="role"
      onChange={() => setValue}
      value={value ?? ""}
    >
      <option value="DEFAULT">Choose gst value.</option>
      {GST?.map((data, index) => {
        return (
          <option key={index} value={data.gst}>
            {data.gst}
          </option>
        );
      })}
    </select>
  );
};

export default GstSelect;
