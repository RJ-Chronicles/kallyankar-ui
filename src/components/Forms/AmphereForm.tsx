import { AmphareSize } from "../../store/type";
import Heading from "../UI/Heading";
import useHandlevalueChange from "../../hooks/useHandleValueChange";
import { postNewAmphere, updateAmphereById } from "../../backend/amphere";
import useAppContext from "../../hooks/useAppContext";
import ButtonSave from "../UI/Button/ButtonSave";
import { useAnimation } from "../../hooks";

const AmphereForm: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { formProps } = state;
  const { data: _amphere, title, mode } = formProps;
  const { setValue, data } = useHandlevalueChange(_amphere as AmphareSize);
  const { snackbarAnimation, spinnerAnimationStart, spinnerAnimationStop } =
    useAnimation();
  const { size, _id } = data as AmphareSize;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (size <= 0) {
      snackbarAnimation("Please enter value greater than zero", "error");
      return;
    }

    try {
      spinnerAnimationStart();
      if (mode === "ADD_RECORD") {
        const response = await postNewAmphere(data as AmphareSize);
      } else {
        await updateAmphereById(data as AmphareSize, _id ?? "");
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
      <Heading heading="Amphere entry Form" />
      <form
        className="px-8 md:px-16 pt-6 pb-4 bg-white rounded shadow-md w-[400px]"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 md:mr-2">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="name"
          >
            Size in Amphere
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            required
            onChange={setValue}
            id="name"
            name="size"
            placeholder="Size in Amphere"
            value={size}
          />
        </div>
        <ButtonSave />
      </form>
    </>
  );
};

export default AmphereForm;
