import { BatteryNameValues } from "../../store/type";
import Overlay from "../UI/Overlay";
import ButtonLarge from "../UI/Button/ButtonLarge";
import Heading from "../UI/Heading";
import useHandlevalueChange from "../../hooks/useHandleValueChange";
import useResponseValidator from "../../hooks/useResponseValidator";
import { postNewAmphere } from "../../backend/amphere";
import { postNewBattery, updateBatteryById } from "../../backend/battery";
import useAppContext from "../../hooks/useAppContext";
import ButtonSave from "../UI/Button/ButtonSave";

const BatteryForm: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { refreshEffect, formProps } = state;
  const { data: _battery, title, mode } = formProps;
  const { setValue, data } = useHandlevalueChange(
    _battery as BatteryNameValues
  );

  const { error, setError, validator } = useResponseValidator();

  const { name, _id } = _battery as BatteryNameValues;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validator(data as BatteryNameValues);
    if (!error) {
      dispatch({ type: "SET_LOADING", payload: true });
      if (mode === "ADD_RECORD") {
        const response = await postNewBattery(data as BatteryNameValues);
      } else {
        await updateBatteryById(data as BatteryNameValues, _id ?? "");
      }

      dispatch({ type: "SET_LOADING", payload: false });
      dispatch({ type: "REFRESH_EFFECT", payload: !refreshEffect });
    }
  };

  return (
    <>
      <Heading heading="User Registration Form" />

      <form
        className="px-8 md:px-16 pt-6 pb-4 bg-white rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 md:mr-2">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="name"
          >
            Battery Name
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            required
            onChange={setValue}
            id="name"
            placeholder="Battery Name"
            value={name}
          />
        </div>
        <ButtonSave />
      </form>
    </>
  );
};

export default BatteryForm;
