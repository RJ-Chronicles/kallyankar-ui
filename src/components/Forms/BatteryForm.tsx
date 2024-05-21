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
import { useAnimation } from "../../hooks";

const BatteryForm: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { refreshEffect, formProps } = state;
  const { data: _battery, title, mode } = formProps;
  const { setValue, data } = useHandlevalueChange(
    _battery as BatteryNameValues
  );

  console.log("formprops : ", formProps, data);
  const { snackbarAnimation, spinnerAnimationStart, spinnerAnimationStop } =
    useAnimation();
  const { name, _id } = data as BatteryNameValues;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length <= 2) {
      snackbarAnimation("Please enter valid battery name", "error");
      return;
    }

    try {
      spinnerAnimationStart();
      if (mode === "ADD_RECORD") {
        const response = await postNewBattery(data as BatteryNameValues);
      } else {
        await updateBatteryById(data as BatteryNameValues, _id ?? "");
      }
      snackbarAnimation("Record saved successfully!", "success");
      dispatch({ type: "HAS_INITIAL_FETCHED", payload: false });
      dispatch({ type: "HIDE_SHOW_FORM", payload: false });
    } catch (err) {
      console.log("error");
      snackbarAnimation("Error occured while saving/ updating record", "error");
    }
    spinnerAnimationStop();
  };

  return (
    <>
      <Heading heading="Battery record Form" />

      <form
        className="px-8 md:px-16 pt-6 pb-4 bg-white rounded shadow-md w-[400px]"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 md:mr-2">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="nameId"
          >
            Battery Name
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            required
            onChange={setValue}
            id="nameId"
            placeholder="Battery Name"
            value={name}
            name="name"
          />
        </div>
        <ButtonSave />
      </form>
    </>
  );
};

export default BatteryForm;
